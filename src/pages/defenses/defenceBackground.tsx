import { useEffect } from "react";

export default function DefenseBackground() {
  useEffect(() => {
    const scriptId = "unicorn-studio-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.3/dist/unicornStudio.umd.js";
      script.onload = () => {
        if ((window as any).UnicornStudio) {
          (window as any).UnicornStudio.init();
        }
      };
      document.head.appendChild(script);
    } else {
      if ((window as any).UnicornStudio) {
        // timeout ensures the DOM node is rendered before studio tries to hook into it
        setTimeout(() => {
          (window as any).UnicornStudio.init();
        }, 100);
      }
    }

    return () => {
        if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.destroy === "function") {
            // Optional: call destroy if Unicorn Studio supports it to clean up webgl contexts when unmounting
            // (window as any).UnicornStudio.destroy();
        }
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-90">
      <div 
        data-us-dpi="2" 
        data-us-fps="30" 
        data-us-lazyload="true" 
        data-us-production="true" 
        data-us-project="WL20Cho3hr5Ge8Pk2QUl" 
        data-us-scale="0.45" 
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
      ></div>
    </div>
  );
}
