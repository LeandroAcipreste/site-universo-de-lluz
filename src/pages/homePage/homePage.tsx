import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef } from "react";
import Hero from "./hero";
import "./homePage.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
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
      ScrollTrigger.removeEventListener("refresh", handleRefresh);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as any);
      ScrollTrigger.clearScrollMemory();
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      gsap.ticker.lagSmoothing(0);
    };
  }, []);

  return (
    <main className="homepage-root">
      <Hero />
    </main>
  );
}