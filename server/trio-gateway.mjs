import {randomUUID,timingSafeEqual,createHash} from 'node:crypto';
const MAX_BODY=12000;
export function normalize(body,kind) {
 if(!body || typeof body!=='object' || Array.isArray(body))throw Error('Invalid form');
 const name=(body.name || [body.firstName,body.lastName].filter(Boolean).join(' ')).trim();
 const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
 const phone=typeof body.phone==='string'?body.phone.trim():'';
 if(!name || name.length>200 || (!email&&!phone))throw Error('Name and email or phone are required');
 if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw Error('Invalid email');
 if(phone&&(phone.replace(/\D/g,'').length<7 ||phone.length>40))throw Error('Invalid phone');
 const fields=['projectType','company','budget','message','serviceType','propertySize','customSqFt','frequency','addOns','estimatedPrice','zipCode','city','state','address','requestedDate','specialRequests','answers','recommendedTier'];
 const details=Object.fromEntries(fields.filter(k=>body[k]!==undefined).map(k=>[k,body[k]]));
 const service={type:typeof body.serviceType==='string'?body.serviceType:'unclassified',area:{city:body.city,state:body.state,zipCode:body.zipCode},notes:body.message||body.specialRequests||''};
 // An inquiry does not establish marketing/SMS consent. Preserve only an explicit choice.
 return {contact:{name,...(email?{email}:{}),...(phone?{phone}:{})},service,consent:{contactAllowed:body.contactAllowed===true},details:{...details,kind}};
}
async function callHub(action,payload,key=process.env.TRIO_HUB_KEY,method='POST',includeTests=false) {
 const url=process.env.TRIO_HUB_URL;
 if(!url || !key) return {status:503,data:{error:'Shared pipeline is not configured'}};
 const target=new URL(url);target.searchParams.set('action',action);if(includeTests)target.searchParams.set('includeTests','true');
 try {
  const response=await fetch(target,{method,headers:{'Content-Type':'application/json','x-trio-key':key},...(method==='POST'?{body:JSON.stringify(payload)}:{}),signal:AbortSignal.timeout(15000)});
  return {status:response.status,data:await response.json()};
 }catch{return {status:503,data:{error:'Shared pipeline unavailable. Please try again.'}};}
}
export function intake(kind) {
 return async (req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  try {
   const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
   if(JSON.stringify(body).length>MAX_BODY)return res.status(413).json({error:'Form too large'});
   const payload=normalize(body,kind);
   const incoming=req.headers['idempotency-key'];
   const id=typeof incoming==='string' && /^[a-zA-Z0-9_-]{8,120}$/.test(incoming)?incoming:randomUUID();
   payload.eventId=id;payload.sourceLeadId=id;
   const response=await callHub('ingest',payload);
   if(response.status>=400)return res.status(response.status).json(response.data);
   const idValue=response.data.lead.id;
   return res.status(kind==='playhard_contact'?201:200).json({success:true,id:idValue,quoteId:kind==='quote'?String(idValue):undefined,leadId:String(idValue),message:'Request received. Michelle will review it.',recommendation:body.recommendedTier});
  }catch{return res.status(400).json({error:'Please check the form details',message:'Please check the form details'});}
 };
}
export async function ownerGateway(req,res) {
 res.setHeader('Cache-Control','no-store');
 const expected=process.env.TRIO_OWNER_KEY;
 const auth=req.headers.authorization;
 const value=typeof auth==='string'&&auth.startsWith('Bearer ')?auth.slice(7):'';
 const hash=x=>createHash('sha256').update(x).digest();
 if(!expected||!value||!timingSafeEqual(hash(value),hash(expected)))return res.status(401).json({error:'Owner access required'});
 const action=req.query.action||'leads';
 if(!['leads','cleaners','drafts','qualify','handoff','status','draft','approve'].includes(action))return res.status(400).json({error:'Unknown action'});
 if((['leads','cleaners','drafts'].includes(action)&&req.method!=='GET')||(!['leads','cleaners','drafts'].includes(action)&&req.method!=='POST'))return res.status(405).json({error:'Method not allowed'});
 const payload=typeof req.body==='string'?JSON.parse(req.body||'{}'):req.body||{};
 if(JSON.stringify(payload).length>MAX_BODY)return res.status(413).json({error:'Request too large'});
 const response=await callHub(action,payload,expected,req.method);
 return res.status(response.status).json(response.data);
}
