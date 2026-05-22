import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, FileEdit, TrendingUp } from "lucide-react";
import ParticlesBackground from "../../components/particlesBackground";
import "./meetUs.css";

export default function MeetUs() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <ParticlesBackground />

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
