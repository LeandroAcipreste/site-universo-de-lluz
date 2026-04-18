import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import Hero from "./hero";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useEffect(() => {
    // 1. Inicializa o Lenis
    const lenis = new Lenis({ autoRaf: true });

    // 2. Sincroniza o Lenis com o ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Sequestra o scroll global para o GSAP ler através do Lenis
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const handleRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", handleRefresh);

    ScrollTrigger.refresh();

    // ─── CLEANUP (Sem matar as timelines da próxima página!) ───
    return () => {
      // a) Mata o Lenis
      lenis.destroy();

      // b) Remove o ouvinte
      ScrollTrigger.removeEventListener("refresh", handleRefresh);

      // c) Remove o proxy corretamente (sem aspas vazias "")
      ScrollTrigger.scrollerProxy(document.documentElement);

      // d) Limpa a memória de scroll
      ScrollTrigger.clearScrollMemory();

      // e) Remove qualquer trava de overflow deixada pelo Lenis
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <main className="bg-[#05070f]">
      <Hero />
    </main>
  );
}