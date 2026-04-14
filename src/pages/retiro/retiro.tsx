import SiteNav from "../../components/siteNav";
import { useEffect } from "react";
import RetiroHero from "./retiroHero";
import backgroundSection from "./imagens/BACKGROUND.svg";

export default function Retiro() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-violet-500/30 overflow-x-hidden">
      <SiteNav />
      
      {/* Chamada do componente Hero */}
      <RetiroHero />
      
      {/* Segunda dobra com background SVG */}
      <section className="relative -mt-[15vh] md:-mt-[25vh] lg:-mt-[35vh] z-0 overflow-hidden">
        <img 
          src={backgroundSection} 
          alt="Background Flores" 
          className="w-full h-auto min-h-[50vh] object-cover"
        />
      </section>
      
      {/* Footer minimalista */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          © 2026 Universo de Luz · Todos os direitos reservados
        </p>
      </footer>
    </main>
  );
}
