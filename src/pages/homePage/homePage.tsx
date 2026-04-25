import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import Hero from "./hero";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  // Guarda a instância do Lenis em ref para o cleanup acessar
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);
    ScrollTrigger.refresh();

    return () => {
      // 1. Remove o listener antes de qualquer coisa
      ScrollTrigger.removeEventListener("refresh", handleRefresh);

      // 2. Mata APENAS os ScrollTriggers desta página (não os da próxima)
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // 3. Remove o proxy — sem proxy, a próxima página usa window normalmente
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);

      // 4. Limpa memória de scroll
      ScrollTrigger.clearScrollMemory();

      // 5. Destrói o Lenis por último
      lenis.destroy();
      lenisRef.current = null;

      // 6. Remove travas de overflow deixadas pelo Lenis
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");

      // 7. Garante que o GSAP ticker continua sem o Lenis
      gsap.ticker.lagSmoothing(0);
    };
  }, []);

  return (
    <main className="bg-[#05070f]">
      <Hero />
    </main>
  );
}