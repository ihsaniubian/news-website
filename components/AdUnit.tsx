import { useEffect } from 'react';

export default function AdUnit({ adKey, id, width, height }: { adKey: string, id: string, width: number, height: number }) {
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
          'height' : ${height},
          'width' : ${width},
          'params' : {}
        };
      `;
      container.appendChild(config);
      container.appendChild(script);
    }
  }, [adKey, id, width, height]);

  return <div id={id} className="z-10"></div>;
}