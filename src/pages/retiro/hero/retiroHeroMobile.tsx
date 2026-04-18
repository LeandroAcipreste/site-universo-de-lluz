import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import backgroundImage from "../imagens/background-hero-retiro.png";
import flowerLeft from "../imagens/flower-left.svg";
import flowerRight from "../imagens/flower-right.svg";
import flowerMiddle from "../imagens/flores do meio.svg";
import flowerBottomLeft from "../imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "../imagens/flor de baixo da direita.svg";
import flowerTopMiddle from "../imagens/flor-do-meio-para-baixo.svg";
import hummingbird from "../imagens/beija flor grande.svg";
import hummingbirdLeft from "../imagens/beija-flor-virado-para-esquerda.svg";

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
    textShadow: "0 0 5px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(14,165,233,0.5)",
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
};

export default function RetiroHeroMobile() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // TUDO controlado via gsap.context scoped ao sectionRef — cleanup automático
    const flowers = [
      "#m-fl-top-mid", "#m-fl-top-left", "#m-fl-top-right",
      "#m-fl-bot-left", "#m-fl-bot-right", "#m-fl-mid",
    ];
    const birds = ["#m-bird-right", "#m-bird-left"];
    const title = "#m-hero-title";
    const scroll = "#m-scroll-ind";

    // Estado inicial: tudo invisível
    gsap.set([...flowers, ...birds, title, scroll], {
      opacity: 0,
      visibility: "visible",
    });

    const tl = gsap.timeline({ defaults: { force3D: true } });

    // ─── 1. FLORES (todas juntas, rápido) ───
    tl.fromTo(
      ["#m-fl-top-left", "#m-fl-top-right", "#m-fl-top-mid", "#m-fl-bot-left", "#m-fl-bot-right", "#m-fl-mid"],
      {
        y: (i) => i < 3 ? -60 : 60, // Topo vem de cima, base vem de baixo
        x: (i) => i === 0 ? -40 : (i === 1 ? 40 : 0), // Lados vêm levemente das diagonais
        opacity: 0,
        scale: 0.9 // Um leve zoom in ajuda na percepção de fluidez
      },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "expo.out", // Ease mais sofisticado que o power2
        stagger: {
          amount: 0.4, // Distribui a entrada em 0.4s entre elas
          from: "center" // Começa pelo meio e expande para as pontas
        }
      },
      0.2 // Início do delay da timeline
    )
      // ─── 2. TÍTULO CENTRAL ───
      .fromTo(title, { scale: 0.85, y: 25 }, { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 1.1)

      // ─── 3. BEIJA-FLORES ───
      .fromTo("#m-bird-right", { x: -300, rotate: -15 }, { x: 0, rotate: 0, opacity: 1, duration: 1.8, ease: "power2.inOut" }, 2.0)
      .fromTo("#m-bird-left", { x: 300, rotate: 15 }, { x: 0, rotate: 0, opacity: 1, duration: 1.8, ease: "power2.inOut" }, 2.0)

      // ─── 4. SCROLL INDICATOR ───
      .to(scroll, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, 3.2);

    // Seta do scroll — loop infinito
    gsap.to("#m-scroll-arrow", {
      y: 10, repeat: -1, yoyo: true, duration: 1.5, ease: "power1.inOut",
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="retiro-hero-mobile" className="relative z-10 h-[85vh] w-full bg-[#050505] pt-20">
      <img src={backgroundImage} alt="Paisagem montanhosa" className="absolute inset-0 h-full w-full object-cover" />

      {/* TÍTULO */}
      <div id="m-hero-title" className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none invisible mt-[12vh] ml-4 -translate-x-1">
        <div className="flex flex-col items-start w-fit px-4">
          <h2 className="text-brand-blue text-[2rem] ml-4 leading-none z-10" style={heroStyles.subtitle}>
            Retiro Cura do
          </h2>
          <h1 className="text-brand-blue-light uppercase" style={heroStyles.mainTitle}>BEIJA-FLOR</h1>
          <h2 className="text-brand-blue text-[2rem] ml-4 leading-none z-10" style={heroStyles.subtitle}>
            2026
          </h2>
          <div className="flex flex-col items-center self-center mt-8">
            <h3 className="text-brand-blue text-[1.3rem] leading-none mb-4 text-center" style={heroStyles.subtitle}>
              O chamado da doçura chegou!
            </h3>
            <p className="text-brand-green uppercase tracking-[0.15em] leading-none mb-2" style={heroStyles.date}>
              03 a 07 de junho
            </p>
            <address className="text-brand-teal uppercase tracking-[0.12em] leading-[1.3] not-italic flex flex-col items-center" style={heroStyles.location}>
              <span>POUSADA LAGOA DA PEDRA</span>
              <span>IMBASSAÍ/BA</span>
            </address>
          </div>
        </div>
      </div>

      {/* FLORES — IDs curtos, scoped ao ref, sem classes CSS de animação */}
      <img id="m-fl-top-mid" src={flowerTopMiddle} alt="" aria-hidden="true" className="absolute top-10 left-1/2 -translate-x-1/2 w-[210px] select-none z-10 invisible" />
      <img id="m-fl-top-left" src={flowerLeft} alt="" aria-hidden="true" className="absolute top-7 -left-6 w-[180px] select-none z-10 invisible" />
      <img id="m-fl-bot-left" src={flowerBottomLeft} alt="" aria-hidden="true" className="absolute w-[260px] select-none z-20 -bottom-10 -left-28 invisible" />
      <img id="m-fl-bot-right" src={flowerBottomRight} alt="" aria-hidden="true" className="absolute w-[320px] select-none z-20 -bottom-32 -right-36 invisible" />
      <img id="m-fl-mid" src={flowerMiddle} alt="" aria-hidden="true" className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[280px] select-none z-20 invisible" />

      <div className="absolute top-16 -right-10 w-[180px] z-10 -rotate-12">
        <img id="m-fl-top-right" src={flowerRight} alt="" aria-hidden="true" className="w-full h-auto select-none invisible" />
        <img id="m-bird-right" src={hummingbird} alt="Beija-flor" className="absolute top-[50%] left-[5%] w-[45%] drop-shadow-2xl z-30 invisible" />
      </div>

      <img id="m-bird-left" src={hummingbirdLeft} alt="Beija-flor" className="absolute top-[30%] left-[16%] w-[15%] drop-shadow-2xl z-30 invisible" />

      {/* SCROLL INDICATOR */}
      <div id="m-scroll-ind" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 pointer-events-none invisible" style={{ transform: "translateX(-50%) translateY(20px)" }}>
        <span className="text-sky-300 uppercase mb-2" style={heroStyles.scrollLabel}>Role para sentir</span>
        <div id="m-scroll-arrow" className="w-px h-12 bg-gradient-to-b from-sky-400/80 to-transparent relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-r border-b border-sky-300/80 rotate-45" />
        </div>
      </div>
    </section>
  );
}
