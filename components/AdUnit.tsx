import { useEffect } from 'react';

// Global queue taake ek waqt mein sirf ek ad script process ho
// (Adsterra ka atOptions global variable hai, isliye dono ads ko
// ek ke baad ek load karna zaroori hai warna overwrite ho jata hai)
let adQueue: Promise<void> = Promise.resolve();

export default function AdUnit({
  adKey,
  id,
  width,
  height,
}: {
  adKey: string;
  id: string;
  width: number;
  height: number;
}) {
  useEffect(() => {
    const container = document.getElementById(id);
    if (!container || container.hasChildNodes()) return;

    adQueue = adQueue.then(() => {
      return new Promise<void>((resolve) => {
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

        const script = document.createElement('script');
        script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
        script.async = false; // order maintain karne ke liye
        script.onload = () => resolve();
        script.onerror = () => resolve(); // fail ho to bhi aage badho
        container.appendChild(script);
      });
    });
  }, [adKey, id, width, height]);

  return <div id={id} className="z-10"></div>;
}