import { useLayoutEffect, useRef, useEffect } from "react";
import RetiroHero from "./hero/retiroHero";
import backgroundSection from "./imagens/background_section.svg";
import backgroundFooter from "./imagens/background-footer.svg";
import FlowerGarland from "./floergarland/flowerGarland";
import RetiroVicencias from "./retiroVivencias/retiroVicencias";
import RetiroLocal from "./retiroLocal/retirolocal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BottomFlowers from "./components/BottomFlowers";

gsap.registerPlugin(ScrollTrigger);

export default function Retiro() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    ScrollTrigger.clearScrollMemory("manual");
  }, []);

  useEffect(() => {
    // Refresh imediato: captura layout inicial
    let rAF1: number;
    let rAF2: number;
    rAF1 = requestAnimationFrame(() => {
      rAF2 = requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    // Refresh após a timeline da hero mobile (~3.2s) para recalcular
    // posições dos ScrollTriggers que dependem do layout final
    const t = setTimeout(() => ScrollTrigger.refresh(), 3600);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      cancelAnimationFrame(rAF1);
      cancelAnimationFrame(rAF2);
      clearTimeout(t);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo("#retiro-footer",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#retiro-footer",
          start: "top 95%",
        }
      }
    );
  }, { scope: mainRef });

  return (
    // Alterado para overflow-x-clip para evitar que o navegador corte o eixo vertical por engano
    <main ref={mainRef} className="relative min-h-screen w-full bg-[#050505] selection:bg-violet-500/30 overflow-x-clip">

      <style>{`
        body {
        overflow-x: hidden;
        margin: 0;
        padding: 0;
  }
`}</style>

      {/* A GUILHOTINA FOI REMOVIDA AQUI! Removida a classe "overflow-hidden" */}
      <div className="relative z-40 w-full">
        <RetiroHero />
        <BottomFlowers />
      </div>

      <section className="relative -mt-[15vh] md:-mt-[25vh] lg:-mt-[35vh] z-30 bg-[#050505]" style={{ minHeight: "clamp(600px, 185vw, 1100px)" }}>
        <div className="hidden sm:block w-full max-w-[1300px] mx-auto pointer-events-none" style={{ paddingBottom: "78%" }} aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <img src={backgroundSection} alt="Background Flores" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex justify-center">
          <div className="relative w-full max-w-[1300px] h-full">
            <FlowerGarland />
          </div>
        </div>
        <BottomFlowers />
      </section>

      <RetiroVicencias>
        <BottomFlowers />
      </RetiroVicencias>

      <RetiroLocal>
        <BottomFlowers />
      </RetiroLocal>

      <footer id="retiro-footer" className="relative w-full z-10 overflow-hidden flex flex-col items-center justify-center opacity-0">
        <img src={backgroundFooter} alt="Footer Background" className="w-full h-auto block pointer-events-none z-0" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <a href="https://wa.me/5571996612421" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-4 rounded-full text-white text-[12px] md:text-[14px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 font-['Montserrat'] bg-gradient-to-r from-[#015b8b] to-[#1c642c] text-center leading-tight" style={{ boxShadow: "0 0 50px -10px rgba(28,100,44,0.6)", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            QUERO VIVER ESSA EXPERIÊNCIA
          </a>
        </div>
      </footer>
    </main>
  );
}