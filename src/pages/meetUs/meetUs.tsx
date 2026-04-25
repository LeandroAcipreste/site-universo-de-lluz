import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Heart, Star } from "lucide-react";
import "./meetUs.css";

export default function MeetUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // GSAP Entrance Animations
  useGSAP(() => {
    gsap.to(".meetus-anim", {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: containerRef });

  // Custom Interconnected Particles Background (Mimetizando particles.js do design system)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 12000); // Quantidade responsiva
    
    // Paleta de cores APENAS Neon Lilás / Roxo (Conforme solicitado)
    const galaxyPalette = [
      "168, 85, 247",   // Purple 500
      "139, 92, 246",   // Violet 500
      "192, 132, 252",  // Purple 400
      "216, 180, 254"   // Purple 300
    ];

    // Interação do mouse (Geração de linhas ao passar por perto)
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.8;
        this.color = galaxyPalette[Math.floor(Math.random() * galaxyPalette.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebater nas bordas suavemente
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Partículas Lilás super brilhantes
        ctx.fillStyle = `rgba(${this.color}, 0.9)`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgb(${this.color})`;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Conectar as partículas entre si
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            // A linha herda a cor da partícula primária
            const alpha = 0.25 - (dist / 120) * 0.25;
            ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Conectar ao mouse
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < 160) {
          ctx.beginPath();
          // Linhas interativas com o mouse ganham cor e mais evidência
          const alpha = 0.4 - (mDist / 160) * 0.4;
          ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          
          // Efeito de gravidade/repulsão bem suave (como poeira cósmica)
          particles[i].x -= mdx * 0.015;
          particles[i].y -= mdy * 0.015;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="meetus-root" ref={containerRef}>
      {/* Background Layer */}
      <img src="/logos/photo-1528722828814-77b9b83aafb2-e1574333496357.jpg" alt="Background Universo" className="meetus-bg" />
      
      {/* Dark Film Overlay */}
      <div className="meetus-overlay" />

      {/* Decorative Grids */}
      <div className="meetus-grid-lines">
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-v" />
        <div className="meetus-grid-line-h" />
        <div className="meetus-grid-line-h" />
        <div className="meetus-grid-line-h" />
        <div className="meetus-grid-line-h" />
      </div>

      {/* Floating Particles Canvas */}
      <canvas ref={canvasRef} className="meetus-particles" />

      {/* Content Layer */}
      <div className="meetus-content">
        <div className="meetus-container">
          
          <div className="meetus-hero-grid">
            {/* Esquerda: Textos */}
            <div>
              {/* Header */}
              <div className="meetus-badge meetus-anim">
                <Sparkles size={14} />
                <span>UNIVERSO DE LUZ • NOSSA ESSÊNCIA</span>
              </div>
              
              <h1 className="meetus-title meetus-anim">
                Despertando Consciências,
                <span className="meetus-title-gradient"> Elevando Vibrações</span>
              </h1>
              
              <p className="meetus-desc meetus-anim">
                Sobre o Universo de Luz somos um grupo universalista e ayahuasqueiro, fundado em 2014.
                <br /><br />
                <strong>NOSSA MISSÃO É</strong> Promover consciência e fé inteligente, acolhendo de forma integral todos os seres, a começar pela consciência do autocuidado. Comprometidos com amor e alegria, gentileza e zelo, multiplicando fraternidade em total prosperidade e harmonia por todos os mundos.
              </p>
            </div>

            {/* Direita: Imagem da Olyvia no Arco Neon */}
            <div className="meetus-hero-image-wrapper meetus-anim">
              <img 
                src="/images/olyvia-pagina-conhecamos.jpg" 
                alt="Olyvia - Universo de Luz" 
                className="meetus-hero-image"
              />
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="meetus-floating-cards">
            {/* Card 1 */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <Heart size={20} />
              </div>
              <h3 className="meetus-card-title">Cura Interior</h3>
              <p className="meetus-card-text">
                Processos terapêuticos e energéticos focados em transmutar bloqueios e 
                liberar o seu potencial adormecido, trazendo clareza e paz de espírito.
              </p>
            </div>

            {/* Card 2 */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <Star size={20} />
              </div>
              <h3 className="meetus-card-title">Jornadas Imersivas</h3>
              <p className="meetus-card-text">
                Retiros e vivências que conectam você com a natureza e o divino, 
                através de práticas profundas como a Cura do Beija-Flor.
              </p>
            </div>

            {/* Card 3 */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <Sparkles size={20} />
              </div>
              <h3 className="meetus-card-title">Expansão de Luz</h3>
              <p className="meetus-card-text">
                Comunidade e ensinamentos que sustentam a sua caminhada espiritual 
                no dia a dia, mantendo a sua frequência sempre elevada em ressonância.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
