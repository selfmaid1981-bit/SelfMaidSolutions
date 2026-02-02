import { getUncachableSendGridClient } from './server/sendgrid';

const leads = [
  { name: "Robin Davies", email: "AHomeWithRobin@yahoo.com", company: "Realty Connection", city: "Prattville" },
  { name: "Susanne Zimbelman", email: "susannezexit@gmail.com", company: "EXIT Realty Preferred", city: "Prattville" },
  { name: "Property Manager", email: "psharper@remax.net", company: "HWB Properties", city: "Prattville" },
  { name: "Sales Team", email: "sales@boevansrealty.com", company: "Bo Evans Realty", city: "Prattville" },
];

async function sendOutreach() {
  const { client, fromEmail } = await getUncachableSendGridClient();
  
  for (const lead of leads) {
    const firstName = lead.name.split(' ')[0];
    
    const msg = {
      to: lead.email,
      from: fromEmail,
      subject: "Reliable Turnover Cleaning for Your Properties",
      html: `
        <p>Hi ${firstName},</p>
        
        <p>I'm Michelle with Self-Maid Cleaning Solutions. We specialize in tenant turnover cleans for property managers in ${lead.city}.</p>
        
        <p>I know unreliable cleaning can delay move-ins - we guarantee same-week availability and photo documentation.</p>
        
        <p>Can I send you our property manager pricing?</p>
        
        <p>Best,<br>
        Michelle<br>
        Self-Maid Cleaning Solutions<br>
        <a href="https://self-maid-cleaning-solutions-michellegpt.replit.app">Visit Our Website</a></p>
      `,
      text: `Hi ${firstName},\n\nI'm Michelle with Self-Maid Cleaning Solutions. We specialize in tenant turnover cleans for property managers in ${lead.city}.\n\nI know unreliable cleaning can delay move-ins - we guarantee same-week availability and photo documentation.\n\nCan I send you our property manager pricing?\n\nBest,\nMichelle\nSelf-Maid Cleaning Solutions`
    };
    
    try {
      await client.send(msg);
      console.log('✓ Email sent to ' + lead.name + ' at ' + lead.email);
    } catch (error: any) {
      console.error('✗ Failed to send to ' + lead.email + ':', error.message);
    }
  }
}

sendOutreach().then(() => console.log('\nDone!')).catch(console.error);
