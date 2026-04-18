import React, { useState, useEffect } from "react";
import RetiroVicenciasMobile from "./retiroVicenciasMobile";
import backgroundSection from "../imagens/background_section.svg";

interface RetiroVicenciasProps {
  children?: React.ReactNode;
}

export default function RetiroVicencias({ children }: RetiroVicenciasProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => setIsMobile(window.innerWidth <= 768);
    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  if (isMobile) {
    return <RetiroVicenciasMobile>{children}</RetiroVicenciasMobile>;
  }

  // Versão puramente Desktop
  return (
    <section id="cardVivencias" className="relative w-full z-20 pt-32 pb-64 flex flex-col items-center justify-center">
      
      {/* Background Section SVG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img src={backgroundSection} alt="Background Vivências" className="w-full h-full object-cover object-top" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center z-30">
        <h2 className="text-brand-blue text-5xl lg:text-6xl font-['Playfair_Display'] mb-8">
          Nossas Vivências
        </h2>
        <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
          Espaço reservado para a construção dos cards. A partir daqui, a página flui suavemente até encontrar o rodapé.
        </p>
      </div>

      {children}
    </section>
  );
}
