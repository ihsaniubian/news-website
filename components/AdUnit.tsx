import { useEffect } from 'react';

export default function AdUnit({ adKey, id }: { adKey: string, id: string }) {
  useEffect(() => {
    const container = document.getElementById(id);
    if (container && !container.hasChildNodes()) {
      const script = document.createElement('script');
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      script.async = true;
      
      const config = document.createElement('script');
      config.innerHTML = `
        atOptions = {
          'key' : '${adKey}',
          'format' : 'iframe',
          'height' : ${id.includes('mid') ? 250 : 90},
          'width' : ${id.includes('mid') ? 300 : 728},
          'params' : {}
        };
      `;
      
      container.appendChild(config);
      container.appendChild(script);
    }
  }, [adKey, id]);

  return <div id={id} className="z-10"></div>;
}