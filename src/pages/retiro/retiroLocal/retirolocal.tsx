import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import backgroundSection from "../imagens/background_section.svg";
import pousada1 from "../imagens/pousada1.png";
import pousada2 from "../imagens/pousada2.png";
import beijaFlor4 from "../imagens/beija-flor4.png";
import florBaixoDireita from "../imagens/flor de baixo da direita.svg";
import beijaFlorGrande from "../imagens/beija flor grande.svg";

import "./RetiroLocal.css";

gsap.registerPlugin(ScrollTrigger);

interface RetiroLocalProps {
  children?: React.ReactNode;
}

export default function RetiroLocal({ children }: RetiroLocalProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".local-anim-item");

    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    gsap.to(".floating-bird", {
      y: -15,
      x: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="local-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src={backgroundSection} alt="" className="local-bg-img" />
      </div>

      <div className="local-floating-bird-top floating-bird">
        <img src={beijaFlor4} alt="Beija-flor Decorativo" />
      </div>

      <div className="local-header local-anim-item">
        <h2 className="local-title">Nosso Refúgio</h2>
        <p className="local-subtitle">Natureza e Conforto</p>
      </div>

      <div className="local-content-wrapper">

        <div className="local-image-box local-anim-item">
          <img src={pousada1} alt="Pousada Flor de Cór" className="local-image-main" />
          <div className="local-flower-decor">
            <img src={florBaixoDireita} alt="Flor decorativa" />
          </div>
        </div>

        <div className="local-list-container local-anim-item">
          <h5 className="local-list-title">Tudo incluso para o seu conforto!</h5>
          <ul className="local-list">
            <li className="local-list-item">
              <span className="local-list-icon">✅</span>
              <span className="local-list-text">
                Hospedagem na Pousada Lagoa da Pedra, Imbassaí/BA.
              </span>
            </li>
            <li className="local-list-item">
              <span className="local-list-icon">✅</span>
              <span className="local-list-text">
                Pensão completa (Alimentação ovolactovegetariana).
              </span>
            </li>
            <li className="local-list-item">
              <span className="local-list-icon">✅</span>
              <span className="local-list-text">
                Todas as atividades e todo material das atividades.
              </span>
            </li>
          </ul>
        </div>

        <div className="local-image-box last-box local-anim-item">
          <img src={pousada2} alt="Interior da Pousada Nosso Refúgio" className="local-image-main" />
          <div className="local-bird-bottom floating-bird">
            <img src={beijaFlorGrande} alt="Beija-flor Grande" />
          </div>
        </div>

      </div>

      {children}
    </section>
  );
}