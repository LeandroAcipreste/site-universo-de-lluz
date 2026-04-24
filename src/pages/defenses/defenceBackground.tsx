import { useEffect, useState } from "react";
import "./defenceBackground.css";

export default function DefenseBackground() {
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 768 ? 0.22 : 0.35);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

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
        setTimeout(() => {
          (window as any).UnicornStudio.init();
        }, 100);
      }
    }

    return () => {
        window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="defense-bg">
      <div 
        key={scale}
        data-us-dpi="2" 
        data-us-fps="30" 
        data-us-lazyload="true" 
        data-us-production="true" 
        data-us-project="WL20Cho3hr5Ge8Pk2QUl" 
        data-us-scale={scale}
        className="defense-bg__canvas"
      />
    </div>
  );
}
