/**
 * Partículas — porte de
 * `site-antigo/site-UL/src/components/particlesBackground.tsx`.
 *
 * Fica em `comum/` porque duas páginas o usam: Conheça-nos e Oráculo. Lá
 * também era um componente compartilhado, em `components/`.
 *
 * A lógica é a mesma linha por linha: a paleta prata da logo, a contagem
 * `(largura · altura) / 12000`, as distâncias de ligação (120 entre
 * partículas, 160 para o mouse) e o empurrão de 0,015 no encontro com o
 * cursor. O que mudou foi só a casca: o `useEffect` virou função e o
 * `useRef` virou parâmetro.
 */

export function particulas(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);

  // Paleta de cores Prata Metálica (Cores da Logo)
  const silverPalette = [
    '248, 249, 250',  // #F8F9FA — Branco Platina
    '221, 224, 227',  // #DDE0E3 — Prata Claro
    '155, 161, 166',  // #9BA1A6 — Prata Médio
    '91, 97, 102',    // #5B6166 — Prata Escuro
  ];

  const mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const particleCount = Math.floor((width * height) / 12000);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.8;
      this.color = silverPalette[Math.floor(Math.random() * silverPalette.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, 0.9)`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgb(${this.color})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const particles = [];
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Conectar entre si
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          const alpha = 0.25 - (dist / 120) * 0.25;
          ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }

      // Conectar ao mouse
      const mdx = particles[i].x - mouse.x;
      const mdy = particles[i].y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 160) {
        ctx.beginPath();
        const alpha = 0.4 - (mDist / 160) * 0.4;
        ctx.strokeStyle = `rgba(${particles[i].color}, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();

        particles[i].x -= mdx * 0.015;
        particles[i].y -= mdy * 0.015;
      }
    }

    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  });
}
