import { useEffect } from 'react';

const JOTFORM_AGENT_URL = 'https://www.jotform.com/agent/0199a5923d9c71be92933f0fa84b2f561989';

export function JotFormAgent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/agent.js';
    script.async = true;
    script.setAttribute('data-agent-url', JOTFORM_AGENT_URL);
    
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.jotfor.ms/agent/agent.js"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const agentWidget = document.querySelector('.jotform-agent-widget');
      if (agentWidget) {
        agentWidget.remove();
      }
    };
  }, []);

  return null;
}
