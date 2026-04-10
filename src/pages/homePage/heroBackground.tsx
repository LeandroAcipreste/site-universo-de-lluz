import { useEffect, useRef } from "react";

/*
  Animação de fundo do Hero — coluna de energia vertical + partículas.
  Recria o efeito "plasma stream" do design system com a paleta galáxia:
    indigo · violet · fuchsia · blue · white
*/

const PALETTE: [number, number, number][] = [
  [167, 139, 250], // violet-400
  [99,  102, 241], // indigo-500
  [232, 121, 249], // fuchsia-400
  [96,  165, 250], // blue-400
  [196, 181, 253], // violet-300
  [255, 255, 255], // white core
  [192, 132, 252], // purple-400
  [129, 140, 248], // indigo-400
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number;
  col: [number, number, number];
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0;
    let H = 0;
    const particles: Particle[] = [];

    // ── Resize ──────────────────────────────────────────────────────────
    const applySize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    const ro = new ResizeObserver(applySize);
    ro.observe(canvas);

    // ── Spawn partícula ──────────────────────────────────────────────────
    const spawn = () => {
      const cx = W * 0.5;
      // Origem: próxima ao feixe, ao longo de toda altura
      const sx = cx + (Math.random() - 0.5) * 14;
      const sy = Math.random() * H;

      // Velocidade: spray lateral, leve componente vertical
      const side  = Math.random() < 0.5 ? 1 : -1;
      const speed = 0.6 + Math.random() * 3.8;
      const angle = 0.05 + Math.random() * 0.9; // 0 → π/2 ish

      particles.push({
        x: sx, y: sy,
        vx: side * Math.sin(angle) * speed,
        vy: (Math.random() - 0.6) * speed * 0.35,
        life: 0,
        maxLife: 55 + Math.random() * 110,
        r: 0.35 + Math.random() * 2.2,
        col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      });
    };

    // ── Feixe vertical (beam) ────────────────────────────────────────────
    const drawBeam = (t: number) => {
      const cx = W * 0.5;

      // Oscilações independentes → flickering orgânico
      const f1 = 0.86 + 0.14 * Math.sin(t * 0.0022);
      const f2 = 0.91 + 0.09 * Math.sin(t * 0.0041 + 1.8);
      const f3 = 0.78 + 0.22 * Math.sin(t * 0.0068 + 3.6);
      // Pulsação de largura
      const wPulse = 1 + 0.18 * Math.sin(t * 0.0031 + 0.9);

      const strip = (hw: number, stops: [number, string][]) => {
        const w = hw * wPulse;
        const g = ctx.createLinearGradient(cx - w, 0, cx + w, 0);
        for (const [p, c] of stops) g.addColorStop(p, c);
        ctx.fillStyle = g;
        ctx.fillRect(cx - w, 0, w * 2, H);
      };

      // Camada 1 — névoa ampla (haze)
      strip(320, [
        [0,    "rgba(49,38,180,0)"],
        [0.32, `rgba(49,38,180,${0.05 * f1})`],
        [0.5,  `rgba(72,52,210,${0.10 * f2})`],
        [0.68, `rgba(49,38,180,${0.05 * f1})`],
        [1,    "rgba(49,38,180,0)"],
      ]);

      // Camada 2 — brilho médio violeta
      strip(95, [
        [0,    "rgba(109,40,217,0)"],
        [0.33, `rgba(109,40,217,${0.14 * f2})`],
        [0.5,  `rgba(139,92,246,${0.30 * f1})`],
        [0.67, `rgba(109,40,217,${0.14 * f2})`],
        [1,    "rgba(109,40,217,0)"],
      ]);

      // Camada 3 — brilho interno claro
      strip(30, [
        [0,    "rgba(196,181,253,0)"],
        [0.28, `rgba(196,181,253,${0.58 * f1})`],
        [0.5,  `rgba(220,210,255,${0.82 * f2})`],
        [0.72, `rgba(196,181,253,${0.58 * f1})`],
        [1,    "rgba(196,181,253,0)"],
      ]);

      // Camada 4 — núcleo branco quente
      strip(5, [
        [0,   "rgba(255,255,255,0)"],
        [0.5,  `rgba(255,255,255,${f1 * f3})`],
        [1,   "rgba(255,255,255,0)"],
      ]);

      // Brilho vertical — mais intenso no centro da altura
      const vg = ctx.createLinearGradient(0, 0, 0, H);
      vg.addColorStop(0,    "rgba(79,60,220,0.12)");
      vg.addColorStop(0.15, "rgba(79,60,220,0.04)");
      vg.addColorStop(0.5,  "rgba(99,80,240,0.18)");
      vg.addColorStop(0.85, "rgba(79,60,220,0.04)");
      vg.addColorStop(1,    "rgba(79,60,220,0.14)");
      ctx.fillStyle = vg;
      ctx.fillRect(cx - 95 * wPulse, 0, 190 * wPulse, H);
    };

    // ── Loop principal ───────────────────────────────────────────────────
    const frame = (now: number) => {
      if (W === 0 || H === 0) { raf = requestAnimationFrame(frame); return; }

      // Fade com rastro (motion blur orgânico)
      ctx.fillStyle = "rgba(5,7,15,0.20)";
      ctx.fillRect(0, 0, W, H);

      drawBeam(now);

      // Emite
      const deficit = 220 - particles.length;
      const toSpawn = Math.min(deficit, 4 + Math.floor(Math.random() * 5));
      for (let i = 0; i < toSpawn; i++) spawn();

      // Atualiza e desenha partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.042;   // gravidade
        p.vx *= 0.994;   // resistência do ar
        p.life++;

        if (p.life >= p.maxLife) { particles.splice(i, 1); continue; }

        const prog  = p.life / p.maxLife;
        // Fade-in rápido (8 %) → fade-out suave
        const alpha = prog < 0.08
          ? prog / 0.08
          : 1 - (prog - 0.08) / 0.92;

        const [r, g, b] = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.88})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
