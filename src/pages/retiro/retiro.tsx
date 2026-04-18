import { useLayoutEffect, useRef, useEffect } from "react";
import RetiroHero from "./hero/retiroHero";
import backgroundSection from "./imagens/background_section.svg";
import backgroundFooter from "./imagens/background-footer.svg";
import flowerBottomLeft from "./imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "./imagens/flor de baixo da direita.svg";
import flowerMiddle from "./imagens/flores do meio.svg";
import FlowerGarland from "./floergarland/flowerGarland";
import RetiroVicencias from "./retiroVivencias/retiroVicencias";
import RetiroLocal from "./retiroLocal/retirolocal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const BottomFlowers = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.set(
      [".flower-bottom-left", ".flower-bottom-right", ".flower-bottom-middle"],
      { opacity: 0, visibility: "visible" }
    );

    gsap.utils.toArray<HTMLElement>(".flower-bottom-left").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: -30 },
        { y: 0, opacity: 1, rotate: -15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-right").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: 30 },
        { y: 0, opacity: 1, rotate: 15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-middle").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 95%", once: true } }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-50">
      <img className="flower-bottom-left absolute w-[260px] md:w-[350px] lg:w-[650px] select-none -bottom-10 -left-28 md:-bottom-40 md:-left-20 lg:-bottom-60 lg:-left-28 invisible" src={flowerBottomLeft} alt="Flower Bottom Left" />
      <img className="flower-bottom-right absolute w-[320px] md:w-[350px] lg:w-[650px] select-none -bottom-32 -right-36 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible" src={flowerBottomRight} alt="Flower Bottom Right" />
      <img className="flower-bottom-middle absolute -bottom-20 left-1/2 w-[280px] -translate-x-1/2 md:w-[400px] lg:w-[750px] select-none md:-bottom-48 lg:-bottom-64 invisible" src={flowerMiddle} alt="Flowers Middle" />
    </div>
  );
};

export default function Retiro() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Reset limpo e instantâneo sem brigar com o usuário
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    ScrollTrigger.clearScrollMemory("manual");
  }, []);

  // O VIGIA DE IMAGENS: Se alguma foto baixar atrasada e aumentar a tela, ele atualiza o GSAP na hora!
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
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
    <main ref={mainRef} className="min-h-screen bg-[#050505] selection:bg-violet-500/30 overflow-x-hidden">
      <div className="relative z-40">
        <RetiroHero />
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