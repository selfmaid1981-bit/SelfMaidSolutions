import { randomUUID } from 'node:crypto';
const MAX_BODY = 12000;
const fields = ['projectType','company','budget','message','serviceType','propertySize','customSqFt','frequency','addOns','estimatedPrice','zipCode','city','state','address','requestedDate','preferredTime','specialRequests','answers','recommendedTier','quoteId','discountApplied'];
export async function intake(req,res,kind) {
  res.setHeader('Cache-Control','no-store');
  if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  const url=process.env.TRIO_HUB_URL, key=process.env.TRIO_HUB_KEY;
  if(!url || !key) return res.status(503).json({error:'Inquiry service is temporarily unavailable'});
  try {
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if(!body || typeof body!=='object' || Array.isArray(body) || JSON.stringify(body).length>MAX_BODY) return res.status(400).json({error:'Invalid request'});
    const name=String(body.name || [body.firstName,body.lastName].filter(Boolean).join(' ')).trim();
    const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';
    const phone=typeof body.phone==='string'?body.phone.trim():'';
    if(!name || name.length>200 || (!email && !phone) || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || (phone && (phone.replace(/\D/g,'').length<7 || phone.length>40))) return res.status(400).json({error:'Please enter a valid name and contact details'});
    const details=Object.fromEntries(fields.filter(k=>body[k]!==undefined).map(k=>[k,body[k]]));
    const eventId=randomUUID();
    const payload={eventId,sourceLeadId:eventId,contact:{name,...(email?{email}:{}),...(phone?{phone}:{})},service:{type:typeof body.serviceType==='string'?body.serviceType:'unclassified',area:{city:body.city,state:body.state,zipCode:body.zipCode},notes:body.message||body.specialRequests||body.specialInstructions||''},consent:{contactAllowed:body.contactAllowed===true},details:{...details,kind}};
    const target=new URL(url);target.searchParams.set('action','ingest');
    const response=await fetch(target,{method:'POST',headers:{'Content-Type':'application/json','x-trio-key':key},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
    const data=await response.json().catch(()=>({}));
    if(!response.ok) return res.status(response.status).json({error:data.error||'Inquiry could not be submitted'});
    const id=data?.lead?.id;
    if(!id) return res.status(502).json({error:'Inquiry was not confirmed by the receiving service'});
    return res.status(201).json({success:true,leadId:String(id),quoteId:kind==='quote'?String(id):undefined,bookingId:kind==='booking'?String(id):undefined,message:'Request received. We will contact you to confirm details.'});
  } catch {
    return res.status(503).json({error:'Inquiry service unavailable. Please try again or call us.'});
  }
}
