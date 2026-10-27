import { intake } from '../server/trio-intake.mjs';
export default (req,res) => {
 if(req.method==='POST') {
  const b=typeof req.body==='string'?JSON.parse(req.body):req.body;
  req.body={...b,requestedDate:b.preferredDate,estimatedPrice:b.amount,preferredTime:b.preferredTime,specialRequests:b.specialInstructions};
  if(!b.skipPayment) return res.status(409).json({error:'Online payment is not yet available. Select pay later to request a booking.'});
 }
 return intake(req,res,'booking');
};
