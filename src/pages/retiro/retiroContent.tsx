import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import backgroundSvg from "./imagens/BACKGROUND.svg";
import vectorRaw from "./imagens/Vector 35.svg?raw";
import flowerSvg from "./imagens/flor de baixo da direita.svg";

gsap.registerPlugin(ScrollTrigger);

export default function RetiroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const vectorWrapperRef = useRef<HTMLDivElement>(null);
  const [flowerPoints, setFlowerPoints] = useState<{x: number, y: number}[]>([]);

  useGSAP(() => {
    if (!vectorWrapperRef.current || !containerRef.current) return;

    const svgElement = vectorWrapperRef.current.querySelector("svg");
    const path = svgElement?.querySelector("path");
    if (!path || !svgElement) return;

    const totalLength = path.getTotalLength();
    
    // Core event data for the journey
    const eventItems = [
      { p: 0.25, label: "Palestra Arcanjos" },
      { p: 0.50, label: "Vivência Orixás" },
      { p: 0.75, label: "Xamanismo Sagrado" },
      { p: 0.98, label: "Retiro da Cura" }
    ];

    const points = eventItems.map(item => {
      const pt = path.getPointAtLength(item.p * totalLength);
      return { x: pt.x, y: pt.y, label: item.label };
    });
    setFlowerPoints(points);

    // Initial setup for the path with GLOW
    gsap.set(path, {
      strokeDasharray: totalLength,
      strokeDashoffset: totalLength,
      stroke: "#FFFFFF",
      strokeWidth: 3,
      fill: "transparent",
      opacity: 0.9,
      filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9))"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500", 
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      }
    });

    // 1. Draw the radiant path
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 10, 
      ease: "none"
    });

    // 2. Animate flowers and texts sprouting at specific milestones
    points.forEach((pt, index) => {
      const startTime = eventItems[index].p * 10; 
      
      // Sprout Flower
      tl.fromTo(`#flower-group-${index}`, 
        { scale: 0.5, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }, 
        startTime
      );

      // Bloom Text with Blur and Slide
      tl.fromTo(`#text-item-${index}`,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          duration: 1, 
          ease: "power2.out" 
        },
        startTime + 0.3
      );
    });

    // Floating Idle Animation for all flowers
    gsap.to(".flower-float", {
        y: "-=15",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.3,
            from: "random"
        }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#050100]"
    >
      {/* Mystical Background Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundSvg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main Vector Path Layer */}
        <div 
          ref={vectorWrapperRef}
          className="relative z-10 w-full max-w-[1100px] h-[85vh] flex items-center justify-center pointer-events-none"
          dangerouslySetInnerHTML={{ __html: vectorRaw }}
        />

        {/* Journey Elements Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="relative w-full max-w-[1100px] h-[85vh]">
                <svg 
                    viewBox="0 0 1269 1808" 
                    className="absolute inset-0 w-full h-full fill-none overflow-visible"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {flowerPoints.map((pt, i) => (
                        <g key={i} id={`flower-group-${i}`} className="flower-float">
                            {/* Flower Bouquet */}
                            <image 
                                href={flowerSvg} 
                                x={pt.x - 160} y={pt.y - 180} 
                                width="320" height="320"
                                className="pointer-events-none"
                            />
                            {/* Event Text Labels */}
                            <g id={`text-item-${i}`}>
                                <text
                                    x={pt.x + 150} // Position to the right of the flower
                                    y={pt.y}
                                    fill="white"
                                    fontSize="38"
                                    fontFamily="'Outfit', sans-serif"
                                    fontWeight="300"
                                    letterSpacing="0.05em"
                                    style={{ 
                                        textShadow: "0 0 15px rgba(255,255,255,0.6)",
                                        fontStyle: "italic"
                                    }}
                                >
                                    {pt.label}
                                </text>
                                <line 
                                    x1={pt.x + 40} y1={pt.y} 
                                    x2={pt.x + 130} y2={pt.y} 
                                    stroke="white" 
                                    strokeWidth="1" 
                                    opacity="0.4"
                                />
                            </g>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
      </div>
    </section>
  );
}
