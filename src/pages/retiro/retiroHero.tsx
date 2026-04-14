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

export default function RetiroHero() {
  useGSAP(() => {
    // Initial states set via GSAP
    gsap.set([
      "#flower-top-left", 
      "#flower-top-right", 
      "#flower-middle", 
      "#flower-bottom-left", 
      "#flower-bottom-right", 
      "#hummingbird", 
      "#hummingbird-left",
      "#flower-top-middle",
      "#hero-title-container"
    ], { 
      opacity: 0,
      visibility: "visible"
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2, force3D: true } });

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
    );
  });

  return (
    <section className="relative z-10 h-[60vh] md:h-[75vh] lg:h-screen w-full bg-[#050505] pt-20 md:pt-0">
      {/* Background Hero */}
      <img
        id="hero-bg"
        src={backgroundImage}
        alt="Background Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Title Centered as Pure HTML */}
      <div id="hero-title-container" className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none invisible mt-[12vh] md:-mt-[10vh] -translate-x-1 md:translate-x-0">
        <div className="flex flex-col items-start w-fit px-4">
          <h2 
            className="text-[#015b8b] text-[1.5rem] md:text-[3rem] lg:text-[6rem] leading-none mb-2 z-10 self-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              WebkitTextStroke: "1px #032e4d",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)"
            }}
          >
            Retiro Cura do
          </h2>
          <h1 
            className="text-[#38bdf8] uppercase self-center"
            style={{ 
              fontFamily: "'Xarrovv', sans-serif",
              fontSize: 'clamp(2.5rem, 12vw, 16rem)',
              lineHeight: 0.85,
              textShadow: '0 0 5px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(14,165,233,0.5)'
            }}
          >
            Beija-Flor
          </h1>
          <h2 
            className="text-[#015b8b] text-[1.1rem] md:text-[2.2rem] lg:text-[4.5rem] leading-none mt-2 z-10 self-start"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              WebkitTextStroke: "1px #032e4d",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)"
            }}
          >
            2026
          </h2>

          <div className="flex flex-col items-center self-center mt-2">
            <h3 
              className="text-[#1c642c] uppercase tracking-[0.35em] leading-none mb-1"
              style={{ 
                fontFamily: "'Garet', 'Montserrat', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
                fontWeight: 300,
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              03 a 07 de junho
            </h3>
            <div 
              className="flex flex-col items-center text-[#1c92d2] uppercase tracking-[0.12em] leading-[1.3]"
              style={{ 
                fontFamily: "'Garet', 'Montserrat', sans-serif",
                fontSize: 'clamp(0.7rem, 1.5vw, 1.2rem)',
                fontWeight: 300,
                WebkitTextStroke: '0.6px rgba(0,0,0,0.4)'
              }}
            >
              <span>POUSADA LAGOA DA PEDRA</span>
              <span>IMBASSAÍ/BA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flower Top Middle */}
      <img
        id="flower-top-middle"
        src={flowerTopMiddle}
        alt="Flower Top Middle"
        className="absolute top-10 lg:top-0 left-1/2 -translate-x-1/2 w-[210px] select-none z-10 invisible md:hidden will-change-transform"
      />
      
      {/* Flower Top Left */}
      <img
        id="flower-top-left"
        src={flowerLeft}
        alt="Flower Left"
        className="absolute top-7 -left-6 w-[180px] md:w-[250px] lg:w-[500px] select-none z-10 md:-top-38 md:-left-20 lg:-top-52 lg:-left-28 invisible will-change-transform"
      />

      {/* Hummingbird Left */}
      <img
        id="hummingbird-left"
        src={hummingbirdLeft}
        alt="Beija-Flor Left"
        className="absolute top-[30%] md:top-[15%] left-[16%] w-[15%] md:w-[12%] lg:w-[10%] drop-shadow-2xl z-30 invisible will-change-transform"
      />

      {/* Flower Bottom Left */}
      <img
        id="flower-bottom-left"
        src={flowerBottomLeft}
        alt="Flower Bottom Left"
        className="absolute w-[260px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-20 -left-28 md:-bottom-52 md:-left-20 lg:-bottom-72 lg:-left-28 invisible will-change-transform"
      />

      {/* Flower Bottom Right */}
      <img
        id="flower-bottom-right"
        src={flowerBottomRight}
        alt="Flower Bottom Right"
        className="absolute w-[320px] md:w-[350px] lg:w-[650px] select-none z-20 -bottom-32 -right-36 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible"
      />

      {/* Flower Middle Bottom */}
      <img
        id="flower-middle"
        src={flowerMiddle}
        alt="Flowers Middle"
        className="absolute -bottom-20 left-1/2 w-[280px] -translate-x-1/2 md:w-[400px] lg:w-[750px] select-none z-20 md:-bottom-48 lg:-bottom-64 invisible"
      />

      {/* Flower Top Right Container */}
      <div id="flower-top-right-container" className="absolute top-16 -right-10 w-[180px] md:w-[250px] lg:w-[500px] z-10 md:-top-24 md:-right-26 lg:-top-32 lg:-right-36 -rotate-12 md:-rotate-6">
        <img
          id="flower-top-right"
          src={flowerRight}
          alt="Flower Right"
          className="w-full h-auto select-none invisible"
        />
        
        {/* Hummingbird */}
        <img
          id="hummingbird"
          src={hummingbird}
          alt="Beija-Flor"
          className="absolute top-[50%] left-[5%] w-[45%] md:w-[40%] lg:w-[35%] drop-shadow-2xl z-30 invisible"
        />
      </div>
    </section>
  );
}
