import SiteNav from "../../components/siteNav";
import { useEffect } from "react";
import RetiroHero from "./retiroHero";

export default function Retiro() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-violet-500/30">
      <SiteNav />
      
      {/* Chamada do componente Hero */}
      <RetiroHero />
      
      {/* Footer minimalista */}
      <footer className="border-t border-white/5 bg-[#050505] py-12 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          © 2026 Universo de Luz · Todos os direitos reservados
        </p>
      </footer>
    </main>
  );
}
