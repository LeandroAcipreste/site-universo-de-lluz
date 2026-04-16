import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import backgroundImage from "./imagens/background-hero-retiro.png";
import flowerLeft from "./imagens/flower-left.svg";
import flowerRight from "./imagens/flower-right.svg";
import flowerMiddle from "./imagens/flores do meio.svg";
import flowerBottomLeft from "./imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "./imagens/flor de baixo da direita.svg";
import flowerTopMiddle from "./imagens/flor-do-meio-para-baixo.svg";
import hummingbird from "./imagens/beija flor grande.svg";
import hummingbirdLeft from "./imagens/beija-flor-virado-para-esquerda.svg";

// ─── Estilos locais do componente RetiroHero ─────────────────────────────────
// Declarados fora da função para evitar recriação a cada render (padrão React)

const heroStyles = {
  subtitle: {
    fontFamily: "'Playfair Display', serif",
    fontVariantNumeric: "lining-nums",
    fontWeight: 500,
    WebkitTextStroke: "1px #032e4d",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
  } as React.CSSProperties,

  mainTitle: {
    fontFamily: "'Xarrovv', sans-serif",
    fontSize: "clamp(4rem, 18vw, 18rem)",
    lineHeight: 0.8,
    textShadow:
      "0 0 5px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(14,165,233,0.5)",
  } as React.CSSProperties,

  date: {
    fontFamily: "'Garet', 'Montserrat', sans-serif",
    fontSize: "clamp(0.8rem, 2vw, 1.3rem)",
    fontWeight: 300,
    WebkitTextStroke: "0.5px rgba(0,0,0,0.3)",
  } as React.CSSProperties,

  location: {
    fontFamily: "'Garet', 'Montserrat', sans-serif",
    fontSize: "clamp(0.7rem, 1.5vw, 1.2rem)",
    fontWeight: 300,
    WebkitTextStroke: "0.6px rgba(0,0,0,0.4)",
  } as React.CSSProperties,

  scrollLabel: {
    fontSize: "clamp(0.55rem, 1.5vw, 0.8rem)",
    letterSpacing: "0.3em",
    fontWeight: 300,
    opacity: 0.7,
  } as React.CSSProperties,

  scrollIndicatorInit: { y: 20 } as React.CSSProperties,
};

// ─── IDs dos alvos GSAP ──────────────────────────────────────────────────────
const GSAP_TARGETS = [
  "#flower-top-left",
  "#flower-top-right",
  "#flower-middle",
  "#flower-bottom-left",
  "#flower-bottom-right",
  "#hummingbird",
  "#hummingbird-left",
  "#flower-top-middle",
  "#hero-title-container",
  "#retiro-footer",
  "#scroll-indicator",
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────
export default function RetiroHero() {
  useGSAP(() => {
    gsap.set(GSAP_TARGETS, { opacity: 0, visibility: "visible" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.2, force3D: true },
    });

    tl.fromTo("#flower-top-left",
        { y: -100, x: -100, opacity: 0 },
        { y: 0, x: 0, opacity: 1, delay: 0.5 }
      )
      .fromTo("#flower-top-right",
        { y: -100, x: 100, opacity: 0 },
        { y: 0, x: 0, opacity: 1 },
        "<"
      )
      .fromTo("#flower-top-middle",
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1 },
        "<"
      )
      .fromTo("#flower-bottom-left",
        { y: 100, opacity: 0, rotate: -30 },
        { y: 0, opacity: 1, rotate: -15 },
        "-=1.5"
      )
      .fromTo("#flower-bottom-right",
        { y: 100, opacity: 0, rotate: 30 },
        { y: 0, opacity: 1, rotate: 15 },
        "<"
      )
      .fromTo("#flower-middle",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.5"
      )
      .fromTo("#hero-title-container",
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5 },
        "-=0.8"
      )
      .fromTo("#hummingbird",
        { x: "-120vw", opacity: 0, rotate: -20 },
        { x: 0, opacity: 1, rotate: 0, duration: 2.5, ease: "power2.inOut" },
        "<"
      )
      .fromTo("#hummingbird-left",
        { x: "120vw", y: -100, opacity: 0, rotate: 20 },
        { x: 0, y: 0, opacity: 1, rotate: 0, duration: 2.5, ease: "power2.inOut" },
        "<"
      )
      .to("#retiro-footer", { opacity: 1, duration: 1.5, ease: "power2.inOut" }, "-=1")
      .to("#scroll-indicator", { opacity: 1, y: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.5");

    gsap.to("#scroll-indicator-arrow", {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut",
    });
  });

  return (
    <section
      id="retiro-hero"
      className="relative z-10 h-[85vh] md:h-[75vh] lg:h-screen w-full bg-[#050505] pt-20 md:pt-0"
    >
      <img
        id="hero-bg"
        src={backgroundImage}
        alt="Paisagem montanhosa ao pôr do sol — background do Retiro Beija-Flor"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Bloco central de títulos */}
      <div
        id="hero-title-container"
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none invisible mt-[12vh] ml-4 md:-mt-[10vh] -translate-x-1 md:translate-x-0"
      >
        <div className="flex flex-col items-start w-fit px-4">

          <h2
            className="text-brand-blue text-[2rem] ml-4 md:text-[3.5rem] lg:text-[6.5rem] leading-none z-10"
            style={heroStyles.subtitle}
          >
            Retiro Cura do
          </h2>

          <h1
            className="text-brand-blue-light uppercase"
            style={heroStyles.mainTitle}
          >
            BEIJA-FLOR
          </h1>

          <h2
            className="text-brand-blue text-[2rem] ml-4 md:text-[3rem] lg:text-[6rem] leading-none z-10"
            style={heroStyles.subtitle}
          >
            2026
          </h2>

          {/* Bloco de data e localização */}
          <div
            id="hero-event-details"
            className="flex flex-col items-center self-center mt-8"
          >
            <h3
              className="text-brand-blue text-[1.3rem] md:text-[2rem] lg:text-[2.8rem] leading-none mb-4 text-center"
              style={heroStyles.subtitle}
            >
              O chamado da doçura chegou!
            </h3>

            <p
              className="text-brand-green uppercase tracking-[0.15em] leading-none mb-2"
              style={heroStyles.date}
            >
              03 a 07 de junho
            </p>

            <address
              className="text-brand-teal uppercase tracking-[0.12em] leading-[1.3] not-italic flex flex-col items-center"
              style={heroStyles.location}
            >
              <span>POUSADA LAGOA DA PEDRA</span>
              <span>IMBASSAÍ/BA</span>
            </address>
          </div>

        </div>
      </div>

      <img
        id="flower-top-middle"
        src={flowerTopMiddle}
        alt=""
        aria-hidden="true"
        className="absolute top-10 lg:top-0 left-1/2 -translate-x-1/2 w-[210px] select-none z-10 invisible md:hidden will-change-transform"
      />

      <img
        id="flower-top-left"
        src={flowerLeft}
        alt=""
        aria-hidden="true"
        className="absolute top-7 -left-6 w-[180px] md:w-[250px] lg:w-[500px] select-none z-10 md:-top-38 md:-left-20 lg:-top-52 lg:-left-28 invisible will-change-transform"
      />

      <img
        id="hummingbird-left"
        src={hummingbirdLeft}
        alt="Beija-flor voando para a esquerda"
        className="absolute top-[30%] md:top-[15%] left-[16%] w-[15%] md:w-[12%] lg:w-[10%] drop-shadow-2xl z-30 invisible will-change-transform"
      />

      <img
        id="flower-bottom-left"
        src={flowerBottomLeft}
        alt=""
        aria-hidden="true"
        className="absolute w-[260px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-10 -left-28 md:-bottom-40 md:-left-20 lg:-bottom-60 lg:-left-28 invisible will-change-transform"
      />

      <img
        id="flower-bottom-right"
        src={flowerBottomRight}
        alt=""
        aria-hidden="true"
        className="absolute w-[320px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-32 -right-36 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible"
      />

      <img
        id="flower-middle"
        src={flowerMiddle}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-20 left-1/2 w-[280px] -translate-x-1/2 md:w-[400px] lg:w-[750px] select-none z-20 md:-bottom-48 lg:-bottom-64 invisible"
      />

      <div
        id="flower-top-right-container"
        className="absolute top-16 -right-10 w-[180px] md:w-[250px] lg:w-[500px] z-10 md:-top-24 md:-right-26 lg:-top-32 lg:-right-36 -rotate-12 md:-rotate-6"
      >
        <img
          id="flower-top-right"
          src={flowerRight}
          alt=""
          aria-hidden="true"
          className="w-full h-auto select-none invisible"
        />
        <img
          id="hummingbird"
          src={hummingbird}
          alt="Beija-flor voando"
          className="absolute top-[50%] left-[5%] w-[45%] md:w-[40%] lg:w-[35%] drop-shadow-2xl z-30 invisible"
        />
      </div>

      {/* Indicador de scroll */}
      <div
        id="scroll-indicator"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-none invisible"
        style={heroStyles.scrollIndicatorInit}
      >
        <span
          className="text-sky-300 uppercase mb-2"
          style={heroStyles.scrollLabel}
        >
          Role para sentir
        </span>
        <div
          id="scroll-indicator-arrow"
          className="w-px h-12 bg-gradient-to-b from-sky-400/80 to-transparent relative"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-r border-b border-sky-300/80 rotate-45" />
        </div>
      </div>
    </section>
  );
}