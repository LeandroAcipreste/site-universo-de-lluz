import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, FileEdit, TrendingUp } from "lucide-react";
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

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    const particles: Particle[] = [];
    const particleCount = Math.floor((width * height) / 12000); // Quantidade responsiva

    // Paleta de cores Prata Metálica (Cores da Logo)
    const galaxyPalette = [
      "248, 249, 250",   // #F8F9FA — Branco Platina
      "221, 224, 227",   // #DDE0E3 — Prata Claro
      "155, 161, 166",   // #9BA1A6 — Prata Médio
      "91, 97, 102"      // #5B6166 — Prata Escuro
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

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scale
      ctx.scale(dpr, dpr);
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
                <img src="/logos/logo.svg" alt="Logo" className="meetus-badge-logo" />
                <span>UNIVERSO DE LUZ • NOSSA ESSÊNCIA</span>
              </div>

              <h1 className="meetus-title meetus-anim">
                Despertando Consciências,
                <span className="meetus-title-gradient"> Elevando Vibrações</span>
              </h1>

              <p className="meetus-desc meetus-anim">
                Somos um grupo universalista e ayahuasqueiro, fundado em 2014.
                <br /><br />
                <strong>NOSSA MISSÃO É</strong> Promover consciência e fé inteligente, acolhendo de forma integral todos os seres, a começar pela consciência do autocuidado. Comprometidos com amor e alegria, gentileza e zelo, multiplicando fraternidade em total prosperidade e harmonia por todos os mundos.
              </p>

              <div className="meetus-dirigente meetus-anim">
                <h2 className="meetus-dirigente-title">
                  Conheça nossa dirigente Olyvia Libório
                </h2>
                <p className="meetus-dirigente-desc">
                  <strong>Olyvia Libório </strong>
                  <a href="https://www.instagram.com/olyvialiborio/" target="_blank" rel="noopener noreferrer" className="meetus-ig-link">
                    @olyvialiborio
                  </a>
                  <br />
                  fundadora do Universo de Luz e responsável pela sustentação energética do grupo.
                  <br /><br />
                  Com olhar firme e condução zelosa, ela garante a segurança espiritual e a integridade de cada processo, ancorando a luz e a ordem nas cerimônias.
                </p>
              </div>
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
            {/* Card 1: MISSÃO */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <FileEdit size={20} />
              </div>
              <h3 className="meetus-card-title">MISSÃO</h3>
              <p className="meetus-card-text">
                Auxiliar no despertar espiritual coletivo para vivenciarmos o AMOR de Deus e a transição planetária de maneira consciente, plena e saudável.
              </p>
            </div>

            {/* Card 2: VISÃO */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <TrendingUp size={20} />
              </div>
              <h3 className="meetus-card-title">VISÃO</h3>
              <p className="meetus-card-text">
                Tornar-se uma comunidade holística auto-sustentável capaz de acolher àqueles que buscam o despertar espiritual e comungam dos propósitos divinos.
              </p>
            </div>

            {/* Card 3: VALORES */}
            <div className="meetus-card meetus-anim">
              <div className="meetus-card-glow" />
              <div className="meetus-card-icon">
                <Star size={20} />
              </div>
              <h3 className="meetus-card-title">VALORES</h3>
              <ul className="meetus-card-text" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.25rem 1rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li>• Fé em Deus</li>
                <li>• Firmeza</li>
                <li>• Harmonia</li>
                <li>• Amor</li>
                <li>• Respeito</li>
                <li>• Verdade</li>
                <li>• Fraternidade</li>
                <li>• Humildade</li>
                <li>• Alegria</li>
                <li>• União</li>
              </ul>
            </div>
          </div>

          {/* ── SEÇÃO AYAHUASCA ── */}
          <div className="meetus-ayahuasca meetus-anim">
            <h2 className="meetus-ayahuasca-title">
              Sobre a Sagrada Medicina{" "}
              <span className="meetus-title-gradient">Ayahuasca</span>
            </h2>

            <div className="meetus-ayahuasca-card">
              <div className="meetus-card-glow" />
              <div className="meetus-ayahuasca-body">
                <p>
                  A ayahuasca atua como uma chave para o subconsciente, permitindo o acesso a traumas e bloqueios emocionais para que sejam amorosamente ressignificados.
                </p>
                <p>
                  Espiritualmente, a bebida é considerada uma sagrada <em>"medicina da alma"</em> que expande a consciência e facilita o reencontro do indivíduo com sua essência divina.
                </p>
                <p>
                  A purgação, muito comum durante os rituais, transcende o físico e atua como uma limpeza profunda, liberando e dissipando energias e pensamentos densos.
                </p>
                <p>
                  A experiência sob a força do chá promove a dissolução do ego, ajudando a cultivar o perdão, a empatia e um sentimento de unidade com o todo.
                </p>
                <p>
                  Terapeuticamente, essa vivência oferece novas perspectivas e clareza mental, impulsionando um processo poderoso de autocura e profundo despertar pessoal.
                </p>
                <p className="meetus-ayahuasca-cta">
                  Para viver essa experiência transformadora em nossa casa, é necessário passar por uma consulta com a dirigente{" "}
                  <a href="https://www.instagram.com/olyvialiborio/" target="_blank" rel="noopener noreferrer" className="meetus-ig-link">Olyvia Libório</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
