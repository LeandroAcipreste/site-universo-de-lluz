import { useRef, useState } from "react";
import { ArrowRight, Instagram } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroBackground from "./heroBackground";
import "./hero.css";

/*
  Hero Section — Universo de Luz
  ──────────────────────────────
  Arquitetura CSS-first com Orquestração GSAP:
  - Movimentos, delays e interpolações fluídas são 100% controladas pelo CSS.
  - GSAP é usado APENAS como gatilho disparando a classe `.is-visible` no container principal.
  - Isso garante zero travamentos, permitindo o WebGL rodar assincronamente solto.
*/

const ORACAO = {
  titulo: "Divino Criador,",
  estrofes: [
    "Dai-me o deslumbre da Tua presença,",
    "Dai-me o silêncio para escutar a música das estrelas,",
    "Dai-me a força da fé para atravessar as tempestades,",
    "Dai-me a sabedoria de aceitar a tudo e a todos como são,",
    "Dai-me luz para manter-me num bom caminho,",
    "Dai-me amor para testemunhar a Tua criação.",
  ],
  fecho: "Que assim seja hoje, sempre e eternamente",
  amens: ["Amém!", "Axé!", "Saravá!", "A-ho!"] as const,
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [bgReady, setBgReady] = useState(false);

  // Orquestração: O gatilho único dispara toda a cascata CSS
  useGSAP(() => {
    // Só inicia a animação da interface quando o WebGL avisar que já compilou e renderizou
    if (!bgReady) return;

    // Um pequeno respiro de 0.1s para o navegador (evita micro-travamentos na main thread)
    // Após isso, ele aplica a classe e o CSS assume todo o movimento fluído.
    gsap.to(containerRef.current, {
      duration: 0.1,
      onComplete: () => containerRef.current?.classList.add("is-visible")
    });
  }, { scope: containerRef, dependencies: [bgReady] });

  // Helper para renderizar o efeito letra-por-letra com CSS transition-delays
  let globalLetterIndex = 0;
  const renderLetters = (text: string, baseClassName: string = "") => {
    return text.split("").map((char) => {
      if (char === " ") return <span key={`space-${globalLetterIndex++}`}> </span>;
      const currentIndex = globalLetterIndex++;
      return (
        <span
          key={currentIndex}
          className={`hero-letter ${baseClassName}`}
          // Cada letra ganha um pequeno atraso sequencial (35ms)
          style={{ transitionDelay: `${currentIndex * 0.035}s` }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <section className="hero-section" ref={containerRef}>
        <HeroBackground onReady={() => setBgReady(true)} />

        {/* ── Conteúdo (independente do fundo) ── */}
        <div className="hero-content">
          <div className="hero-grid">

            {/* ── COLUNA ESQUERDA ── */}
            <div className="hero-col-left">

              {/* Badge */}
              <div className="hero-badge">
                <img
                  src="/logos/logo.svg"
                  aria-hidden="true"
                  className="hero-badge__logo"
                  alt=""
                />
                Consciência · Expansão · Cura
              </div>

              {/* Título: Efeito letra por letra controlado por CSS */}
              <h1 className="hero-title">
                {renderLetters("DESPERTE")}
                <br />
                {renderLetters("SUA LU", "hero-title__gradient")}
                {renderLetters("Z", "hero-title__cyan")}
                <br />
                {renderLetters("INTERIOR")}
              </h1>

              {/* Descrição */}
              <p className="hero-desc">
                Vivências transformadoras que expandem a consciência,
                reconectam com o sagrado e promovem cura profunda do ser.
              </p>

              {/* Espaçador (desktop) */}
              <div className="hero-spacer" aria-hidden />

              {/* Botões */}
              <div className="hero-btns">
                <button
                  className="hero-btn"
                  onClick={() => { window.location.href = "/retiro"; }}
                  aria-label="Ir para Retiro Cura do Beija-Flor"
                >
                  <span className="hero-btn__label">Retiro Cura do Beija-Flor</span>
                  <ArrowRight className="hero-btn__icon" aria-hidden="true" />
                </button>

                <button
                  className="hero-btn"
                  onClick={() => { window.location.href = "/meet-us"; }}
                  aria-label="Conhecer o Universo de Luz"
                >
                  <span className="hero-btn__label">Conheça o Universo</span>
                  <ArrowRight className="hero-btn__icon" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* ── COLUNA DIREITA — Card da Oração ── */}
            <aside className="hero-col-right">
              <div className="oracao-card-outer">
                {/* Borda luminosa */}
                <div className="oracao-card-border-glow" aria-hidden="true" />

                {/* Card interno */}
                <div className="oracao-card-inner">
                  {/* Glow no topo */}
                  <div className="oracao-card-top-glow" aria-hidden="true" />

                  <div className="oracao-card-content">
                    {/* Badge interno */}
                    <div className="oracao-badge">
                      <img src="/logos/logo.svg" alt="" aria-hidden className="oracao-badge__logo" />
                      <span className="oracao-badge__text">Oração do Universo de Luz</span>
                      <img src="/logos/logo.svg" alt="" aria-hidden className="oracao-badge__logo" />
                    </div>

                    {/* Título da oração */}
                    <h2 className="oracao-title">{ORACAO.titulo}</h2>

                    {/* Corpo */}
                    <div className="oracao-body">
                      {ORACAO.estrofes.map((linha) => (
                        <p key={linha} className="oracao-line">{linha}</p>
                      ))}
                    </div>

                    {/* Fecho */}
                    <p className="oracao-fecho">{ORACAO.fecho}</p>

                    {/* Amens */}
                    <div className="oracao-amens">
                      {ORACAO.amens.map((a) => (
                        <span key={a} className="oracao-amen">{a}</span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="oracao-footer">
                      <span className="oracao-footer__label">Universo de Luz</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Link do Instagram abaixo da oração */}
              <a
                href="https://www.instagram.com/grupouniversodeluz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-instagram-link"
                aria-label="Acessar Instagram do Grupo Universo de Luz"
              >
                <Instagram className="hero-instagram-link__icon" aria-hidden="true" />
                <span className="hero-instagram-link__text">@grupouniversodeluz</span>
              </a>
            </aside>

          </div>
        </div>
      </section>
    </>
  );
}
