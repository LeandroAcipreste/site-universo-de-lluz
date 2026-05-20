import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SiteNav from "../../components/siteNav";
import OracleBackground from "./oracleBackground";
import { BTN_PRIMARY } from "../../constants/btnPrimary";
import "./oracle.css";

// Linha 1 — branco
const LINE1 = "Conheça o";
// Linha 2 — gradiente neon
const LINE2 = "Oráculo";
// Linha 3A — gradiente
const LINE3A = "com ";
// Linha 3B — branco com y ciano
const LINE3B_PREFIX = "Ol";
const LINE3B_CYAN   = "y";
const LINE3B_SUFFIX = "via";

export default function Oracle() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef  = useRef<HTMLHeadingElement>(null);
  const cardRef   = useRef<HTMLDivElement>(null);
  const [bgReady, setBgReady] = useState(false);

  useGSAP(() => {
    if (!bgReady || !titleRef.current || !cardRef.current) return;

    const letters = titleRef.current.querySelectorAll<HTMLElement>(".oracle-letter, .oracle-space");

    // autoAlpha = opacity + visibility juntos.
    // Isso evita o bug clássico: background-clip:text some quando opacity:0
    // porque o navegador usa layers de compositing diferentes.
    gsap.set(letters, { autoAlpha: 0, y: 28, force3D: true });
    gsap.set(cardRef.current, { autoAlpha: 0, y: 40, force3D: true });

    gsap.timeline({ delay: 0.15 })
      .to(letters, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.035,
        force3D: true,
      })
      .to(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
      }, "-=0.4");
  }, { dependencies: [bgReady] });

  // Helper — cada char vira um span. Espaços viram oracle-space com largura garantida.
  const renderLetters = (text: string, extraClass = "") =>
    text.split("").map((char, i) =>
      char === " "
        ? <span key={i} className="oracle-space"> </span>
        : <span key={i} className={`oracle-letter${extraClass ? ` ${extraClass}` : ""}`}>{char}</span>
    );

  return (
    <section className="oracle-section" ref={sectionRef}>
      <OracleBackground onReady={() => setBgReady(true)} />
      <SiteNav />

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="oracle-content">

        {/* ── COLUNA ESQUERDA: Título ── */}
        <div className="oracle-title-col">
          <h1 className="oracle-title" ref={titleRef}>
            {/* Linha 1 — prata gradiente */}
            {renderLetters(LINE1, "oracle-letter--gradient")}
            <br />
            {/* Linha 2 — prata gradiente */}
            {renderLetters(LINE2, "oracle-letter--gradient")}
            <br />
            {/* Linha 3 — prata gradiente */}
            {renderLetters(LINE3A + LINE3B_PREFIX + LINE3B_CYAN + LINE3B_SUFFIX, "oracle-letter--gradient")}
          </h1>
        </div>

        {/* ── COLUNA DIREITA: Card Informativo ── */}
        <div className="oracle-card-col">
          <div className="oracle-card" ref={cardRef}>
            {/* Brilho interno */}
            <div className="oracle-card-glow" />

            <h2 className="oracle-card-subtitle">
              Como é o Oráculo?
            </h2>

            <div className="oracle-card-body">
              <p>
                O encontro dura 40 minutos onde Olyvia se conecta com seus
                guias pessoais, servindo de ponte para mensagens e orientações
                profundas.
              </p>
              <p>
                Atendimentos às terças-feiras (presencial ou online) e um
                sábado por mês (apenas online), mediante agendamento prévio.
              </p>
              <p>
                Inclui receita via e-mail e limpeza energética obrigatória
                para atendimentos presenciais na Livraria 3º Milênio, Salvador.
              </p>
              <p className="oracle-card-note">
                *Serviço de descarrego com Ramaiana disponível nos dias de
                atendimento presencial.
              </p>
            </div>

            {/* Botão compacto centralizado */}
            <div className="oracle-btn-container">
              <a
                href="https://wa.me/5571996612421"
                target="_blank"
                rel="noopener noreferrer"
                className="oracle-btn btn-silver-snake"
                style={BTN_PRIMARY}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 4px 20px -5px rgba(155, 161, 166, 0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    BTN_PRIMARY.boxShadow as string;
                }}
              >
                Agendar Consulta
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
