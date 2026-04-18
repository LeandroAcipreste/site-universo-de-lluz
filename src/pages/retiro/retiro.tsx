import { useLayoutEffect, useRef } from "react";
import RetiroHero from "./hero/retiroHero";
import backgroundSection from "./imagens/background_section.svg";
import backgroundFooter from "./imagens/background-footer.svg";
import flowerBottomLeft from "./imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "./imagens/flor de baixo da direita.svg";
import flowerMiddle from "./imagens/flores do meio.svg";
import FlowerGarland from "./floergarland/flowerGarland";
import RetiroVicencias from "./retiroVivencias/retiroVicencias";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// ─── COMPONENTE REUTILIZÁVEL: Flores de Transição ──────────────────────────
// z-50 garantido para que as flores sobreponham qualquer conteúdo interno
const BottomFlowers = () => (
  <>
    <img className="flower-bottom-left absolute w-[260px] md:w-[350px] lg:w-[650px] select-none z-50 -bottom-10 -left-28 md:-bottom-40 md:-left-20 lg:-bottom-60 lg:-left-28 invisible" src={flowerBottomLeft} alt="Flower Bottom Left" />
    <img className="flower-bottom-right absolute w-[320px] md:w-[350px] lg:w-[650px] select-none z-50 -bottom-32 -right-36 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible" src={flowerBottomRight} alt="Flower Bottom Right" />
    <img className="flower-bottom-middle absolute -bottom-20 left-1/2 w-[280px] -translate-x-1/2 md:w-[400px] lg:w-[750px] select-none z-50 md:-bottom-48 lg:-bottom-64 invisible" src={flowerMiddle} alt="Flowers Middle" />
  </>
);

export default function Retiro() {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useGSAP(() => {
    // BottomFlowers — entrada por scroll, sem flutuação
    gsap.set(
      [".flower-bottom-left", ".flower-bottom-right", ".flower-bottom-middle"],
      { opacity: 0, visibility: "visible" }
    );

    gsap.utils.toArray<HTMLElement>(".flower-bottom-left").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: -30 },
        { y: 0, opacity: 1, rotate: -15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 90%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-right").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 120, opacity: 0, rotate: 30 },
        { y: 0, opacity: 1, rotate: 15, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 90%", once: true } }
      );
    });

    gsap.utils.toArray<HTMLElement>(".flower-bottom-middle").forEach((el) => {
      const parent = el.closest("section") || el.parentElement;
      gsap.fromTo(el,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: parent, start: "bottom 90%", once: true } }
      );
    });

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

    setTimeout(() => ScrollTrigger.refresh(), 200);

  }, { scope: mainRef });

  return (
    <main ref={mainRef} className="min-h-screen bg-[#050505] selection:bg-violet-500/30 overflow-x-hidden">

      {/* HERO: Maior nível da página (z-40) */}
      <div className="relative z-40">
        <RetiroHero />
      </div>

      {/* SEÇÃO 1: GUIRLANDA (z-30) - Fica acima da seção 2 para as flores vazarem por cima dela */}
      <section
        className="relative -mt-[15vh] md:-mt-[25vh] lg:-mt-[35vh] z-30 bg-[#050505]"
        style={{ minHeight: "clamp(600px, 185vw, 1100px)" }}
      >
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

      {/* SEÇÃO 2: VIVÊNCIAS (z-20) - Fica abaixo da Seção 1, mas acima do Footer */}
      <RetiroVicencias>
        <BottomFlowers />
      </RetiroVicencias>

      {/* SEÇÃO 3: FOOTER (z-10) - Nível mais baixo */}
      <footer id="retiro-footer" className="relative w-full z-10 overflow-hidden flex flex-col items-center justify-center opacity-0">
        <img src={backgroundFooter} alt="Footer Background" className="w-full h-auto block pointer-events-none z-0" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-[#050505] md:text-zinc-600">
            © 2026 Universo de Luz · Todos os direitos reservados
          </p>
        </div>
      </footer>

    </main>
  );
}