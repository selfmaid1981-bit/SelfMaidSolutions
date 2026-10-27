export default (req,res) => {
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET') return res.status(405).json({error:'Method not allowed'});
 const configured=Boolean(process.env.TRIO_HUB_URL && process.env.TRIO_HUB_KEY);
 return res.status(configured?200:503).json({status:configured?'configured':'unavailable',service:'selfmaid-intake'});
};
