import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import backgroundImage from "./imagens/background-hero-retiro.png";
import flowerLeft from "./imagens/flower-left.svg";
import flowerRight from "./imagens/flower-right.svg";
import flowerMiddle from "./imagens/flores do meio.svg";
import flowerBottomLeft from "./imagens/flor de baixo da esquerda.svg";
import flowerBottomRight from "./imagens/flor de baixo da direita.svg";
import hummingbird from "./imagens/beija flor grande.svg";

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
      "#hero-title-container"
    ], { 
      opacity: 0,
      visibility: "visible"
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 2 } });

    tl.fromTo("#flower-top-left", 
      { y: -100, x: -100, opacity: 0 }, 
      { y: 0, x: 0, opacity: 1, delay: 0.5 }
    )
    .fromTo("#flower-top-right", 
      { y: -100, x: 100, opacity: 0 }, 
      { y: 0, x: 0, opacity: 1 }, 
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
      { scale: 1, opacity: 1, y: 0, duration: 2.5, ease: "power3.out" }, 
      "-=1"
    )
    .fromTo("#hummingbird", 
      { x: "-120vw", opacity: 0, rotate: -20 }, 
      { x: 0, opacity: 1, rotate: 0, duration: 4.5, ease: "power3.inOut" }, 
      "-=1.5"
    );
  });

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Background Hero */}
      <img
        id="hero-bg"
        src={backgroundImage}
        alt="Background Hero"
        className="h-full w-full object-cover"
      />

      {/* Title Centered as Pure HTML */}
      <div id="hero-title-container" className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none invisible -mt-[10vh]">
        <div className="flex flex-col items-start w-fit px-4">
          <h2 
            className="text-[#015b8b] text-[2.5rem] md:text-[4.5rem] lg:text-[6rem] leading-none mb-2 z-10 self-center"
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
              fontSize: 'clamp(4rem, 14vw, 13rem)',
              lineHeight: 0.85,
              textShadow: '0 0 5px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.8), 0 0 30px rgba(14,165,233,0.5)'
            }}
          >
            Beija-Flor
          </h1>
          <h2 
            className="text-[#015b8b] text-[1.8rem] md:text-[3rem] lg:text-[4.5rem] leading-none mt-2 z-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              WebkitTextStroke: "1px #032e4d",
              textShadow: "2px 2px 4px rgba(0,0,0,0.4)"
            }}
          >
            2026
          </h2>
        </div>
      </div>
      
      {/* Flower Top Left */}
      <img
        id="flower-top-left"
        src={flowerLeft}
        alt="Flower Left"
        className="absolute -top-24 -left-12 w-[200px] md:w-[350px] lg:w-[500px] select-none z-10 md:-top-38 md:-left-20 lg:-top-52 lg:-left-28 invisible"
      />

      {/* Flower Bottom Left */}
      <img
        id="flower-bottom-left"
        src={flowerBottomLeft}
        alt="Flower Bottom Left"
        className="absolute left-0 w-[250px] md:w-[450px] lg:w-[650px] select-none z-10 -bottom-36 -left-10 md:-bottom-52 md:-left-20 lg:-bottom-72 lg:-left-28 invisible"
      />

      {/* Flower Bottom Right */}
      <img
        id="flower-bottom-right"
        src={flowerBottomRight}
        alt="Flower Bottom Right"
        className="absolute right-0 w-[250px] md:w-[450px] lg:w-[650px] select-none z-10 -bottom-36 -right-10 md:-bottom-52 md:-right-20 lg:-bottom-72 lg:-right-28 invisible"
      />

      {/* Flower Middle Bottom */}
      <img
        id="flower-middle"
        src={flowerMiddle}
        alt="Flowers Middle"
        className="absolute -bottom-32 left-1/2 w-[300px] -translate-x-1/2 md:w-[500px] lg:w-[750px] select-none z-10 md:-bottom-48 lg:-bottom-64 invisible"
      />

      {/* Flower Top Right Container */}
      <div id="flower-top-right-container" className="absolute -top-14 -right-16 w-[200px] md:w-[350px] lg:w-[500px] z-10 md:-top-24 md:-right-26 lg:-top-32 lg:-right-36">
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
          className="absolute top-[55%] left-[15%] w-[45%] md:w-[40%] lg:w-[35%] drop-shadow-2xl z-30 invisible"
        />
      </div>
    </section>
  );
}
