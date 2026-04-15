import SiteNav from "../../components/siteNav";
import { useEffect, useRef } from "react";
import RetiroHero from "./retiroHero";
import backgroundSection from "./imagens/background_section.svg";
import backgroundFooter from "./imagens/background-footer.svg";
import flowerBottomLeft from "./imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "./imagens/flor de baixo da direita.svg";
import flowerMiddle from "./imagens/flores do meio.svg";
import FlowerGarland from "./flowerGarland";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Retiro() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    window.scrollTo(0, 0);

    // Animação das flores ao rolar a página
    gsap.set([
      "#content-flower-left",
      "#content-flower-right",
      "#content-flower-middle"
    ], {
      opacity: 0,
      visibility: "visible"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom 95%", // Dispara quando o final da seção está quase visível
      },
      defaults: { ease: "power3.out", duration: 1.2, force3D: true }
    });

    tl.fromTo("#content-flower-left",
      { y: 100, opacity: 0, rotate: -30 },
      { y: 0, opacity: 1, rotate: -15 }
    )
      .fromTo("#content-flower-right",
        { y: 100, opacity: 0, rotate: 30 },
        { y: 0, opacity: 1, rotate: 15 },
        "<"
      )
      .fromTo("#content-flower-middle",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.0"
      );

  }, []);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-violet-500/30 overflow-x-hidden">
      <SiteNav />

      {/* Chamada do componente Hero - Agora envolvido para garantir o Z-index sobre a próxima seção */}
      <div className="relative z-30">
        <RetiroHero />
      </div>

      {/* Segunda dobra com background SVG - Z-index 20 */}
      <section
        ref={sectionRef}
        className="relative -mt-[15vh] md:-mt-[25vh] lg:-mt-[35vh] z-20 flex flex-col items-center min-h-[70vh] lg:min-h-[85vh] bg-[#050505]"
      >

        {/* Camada de Fundo */}
        <img
          src={backgroundSection}
          alt="Background Flores"
          className="w-full max-w-[1300px] h-auto block pointer-events-none"
        />

        {/* Guirlanda de Flores */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex justify-center">
          <div className="relative w-full max-w-[1300px] h-full overflow-hidden">
            <FlowerGarland />
          </div>
        </div>

        {/* Flores de Fechamento da Seção (Exatamente como na Hero) */}
        {/* Flower Bottom Left */}
        <img
          id="content-flower-left"
          src={flowerBottomLeft}
          alt="Flower Bottom Left"
          className="absolute w-[260px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-10 -left-28 md:-bottom-40 md:-left-20 lg:-bottom-60 lg:-left-28 invisible will-change-transform"
        />

        {/* Flower Bottom Right */}
        <img
          id="content-flower-right"
          src={flowerBottomRight}
          alt="Flower Bottom Right"
          className="absolute w-[320px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-32 -right-36 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible will-change-transform"
        />

        {/* Flower Middle Bottom */}
        <img
          id="content-flower-middle"
          src={flowerMiddle}
          alt="Flowers Middle"
          className="absolute -bottom-20 left-1/2 w-[280px] -translate-x-1/2 md:w-[400px] lg:w-[750px] select-none z-20 md:-bottom-48 lg:-bottom-64 invisible will-change-transform"
        />
      </section>

      {/* Footer com altura ditada pela foto */}
      <footer className="relative w-full z-10 overflow-hidden flex flex-col items-center justify-center">
        <img
          src={backgroundFooter}
          alt="Footer Background"
          className="w-full h-auto block pointer-events-none z-0"
        />

        {/* Texto centralizado sobre a foto */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="font-mono text-[10px] md:text-[12px] uppercase tracking-widest text-[#050505] md:text-zinc-600">
            © 2026 Universo de Luz · Todos os direitos reservados
          </p>
        </div>
      </footer>
    </main>
  );
}