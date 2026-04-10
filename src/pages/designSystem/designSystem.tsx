import { motion } from "motion/react";
import {
  ArrowUp,
  Asterisk,
  ChevronDown,
  Eye,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import HeroBackground from "../homePage/heroBackground";

/*
  Design System — Universo de Luz
  Estrutura idêntica ao template ai-social-automation.aura.build
  Paleta substituída: orange/amber/yellow → violet/indigo/fuchsia (galáxia)
*/

// ── Utilitários de animação ──────────────────────────────────────────────────
type FadeProps = { children: React.ReactNode; delay?: number; className?: string };
const FadeIn = ({ children, delay = 0, className = "" }: FadeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 1, delay, ease: [0.2, 0.8, 0.2, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScrollFade = ({ children, className = "" }: Omit<FadeProps, "delay">) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Logo duplo (dois asteriscos sobrepostos) ─────────────────────────────────
const Logo = () => (
  <div className="relative flex h-8 w-8 items-center justify-center">
    <Asterisk className="absolute h-8 w-8 rotate-45 text-white" strokeWidth={2} />
    <Asterisk className="absolute h-8 w-8 text-violet-500" strokeWidth={2} />
  </div>
);

// ── Seção wrapper ────────────────────────────────────────────────────────────
const Sec = ({
  id, title, subtitle, children,
}: { id: string; title: string; subtitle: string; children: React.ReactNode }) => (
  <section id={id} className="relative z-10 mx-auto max-w-7xl px-6 py-24">
    <div className="mb-16">
      <h2 className="mb-4 text-4xl font-light tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="text-lg leading-relaxed text-neutral-400">{subtitle}</p>
    </div>
    {children}
  </section>
);

// ── Cabeçalho de sub-seção ───────────────────────────────────────────────────
const SubH = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-2xl font-light tracking-tight text-white">{children}</h3>
);

// ── Electric Card ────────────────────────────────────────────────────────────
const ElectricCard = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative w-full overflow-hidden rounded-[32px] bg-neutral-900 p-[2px]"
    style={{ boxShadow: "0 0 30px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.1)" }}
  >
    <div className="absolute inset-0 z-0 bg-linear-to-b from-indigo-300 via-violet-500 to-transparent opacity-80" />
    <div className="relative z-10 h-full overflow-hidden rounded-[30px] bg-[#090b18] p-6">
      {children}
    </div>
  </div>
);

// ── Swatch de cor ────────────────────────────────────────────────────────────
const Swatch = ({ bg, label, sublabel, border = "border-white/10" }: {
  bg: string; label: string; sublabel: string; border?: string;
}) => (
  <div className="flex items-center gap-4">
    <div className={`h-16 w-16 rounded-lg border ${border} ${bg}`} />
    <div>
      <div className="text-sm text-white">{label}</div>
      <div className="text-xs text-neutral-500">{sublabel}</div>
    </div>
  </div>
);

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║                         DESIGN SYSTEM PAGE                              ║
// ╚══════════════════════════════════════════════════════════════════════════╝
export default function DesignSystem() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-white selection:bg-violet-500/30"
      style={{ backgroundColor: "#05070f" }}
    >
      {/* ── Background fixo — canvas animado (feixe + partículas) ─── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <HeroBackground />
      </div>
      {/* Glows de atmosfera — nebulosas coloridas sobre o canvas */}
      <div className="pointer-events-none fixed inset-0 z-1">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-900/15 blur-[140px]" />
        <div className="absolute right-0 top-1/4 h-[700px] w-[600px] rounded-full bg-violet-950/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-fuchsia-950/15 blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 h-[400px] w-[400px] rounded-full bg-blue-950/15 blur-[90px]" />
      </div>

      {/* ── Nav sticky do design system ──────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#05070f]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl text-white">Sistema de Design</span>
            </div>
            <div className="hidden items-center gap-6 text-xs text-neutral-400 md:flex">
              {["hero","tipografia","cores","componentes","layout","motion","ícones"].map((s) => (
                <a key={s} href={`#${s}`} className="capitalize transition-colors hover:text-white">{s}</a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── 0) HERO ──────────────────────────────────────────────────── */}
      <section id="hero" className="relative z-10">
        {/* Sub-nav do hero */}
        <FadeIn delay={0.075}>
          <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between border-b border-white/5 px-6 py-6">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl text-white">Universo de Luz</span>
            </div>
            <div className="hidden items-center rounded-full border border-white/10 bg-white/5 px-1 py-1 backdrop-blur-md md:flex">
              <a href="#" className="flex items-center gap-2 rounded-full border border-white/5 bg-neutral-800/80 px-4 py-1.5 text-xs text-white shadow-inner">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                Início
              </a>
              {["Sobre","Preços"].map((l) => (
                <a key={l} href="#" className="px-4 py-1.5 text-xs text-neutral-400 transition-colors hover:text-white">{l}</a>
              ))}
              <button className="flex items-center gap-1 px-4 py-1.5 text-xs text-neutral-400 transition-colors hover:text-white">
                Serviços <ChevronDown className="h-3 w-3" />
              </button>
              <a href="#" className="px-4 py-1.5 text-xs text-neutral-400 transition-colors hover:text-white">Contato</a>
            </div>
            <a
              href="#"
              className="hidden rounded-full border border-t border-white/20 bg-linear-to-b from-violet-400 to-indigo-600 px-5 py-2 text-sm text-white transition-all hover:brightness-110 md:block"
              style={{ boxShadow: "0 0 15px -3px rgba(139,92,246,0.4)" }}
            >
              Começar
            </a>
          </nav>
        </FadeIn>

        {/* Hero content */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 pb-20 pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-24">
          {/* Left */}
          <div className="relative z-10 flex flex-col items-start lg:col-span-7">
            <FadeIn delay={0.1}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-violet-400" />
                Showcase do Sistema de Design
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="mb-6 text-5xl font-light leading-[1.05] tracking-tight text-white lg:text-[76px]">
                SISTEMA<br />
                COMPONENTES<br />
                <span
                  className="text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#fff 0%,#c4b5fd 50%,#e879f9 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
                >
                  DOCUMENTAÇÃO
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mb-10 max-w-xl text-lg leading-relaxed text-neutral-400">
                Guia completo da linguagem visual, componentes e padrões usados no design system do Universo de Luz.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center gap-4">
              <button
                className="group relative flex items-center justify-center gap-2.5 rounded-full px-8 py-3 text-lg font-medium ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(to top, #a5b4fc, #7c3aed, #6d28d9)", color: "#0c0720", boxShadow: "0 0 40px -5px rgba(139,92,246,0.6)" }}
              >
                Explorar Componentes
              </button>
              <button className="rounded-full bg-white px-8 py-3 text-lg text-black transition-colors hover:bg-neutral-200">
                Ver Padrões
              </button>
            </FadeIn>
          </div>

          {/* Right — card */}
          <FadeIn delay={0.5} className="relative z-10 flex justify-center lg:col-span-5 lg:justify-end">
            <div
              className="relative w-[360px] overflow-hidden rounded-[32px] bg-neutral-900 p-[2px]"
              style={{ boxShadow: "0 0 30px rgba(139,92,246,0.3), inset 0 0 20px rgba(139,92,246,0.1)" }}
            >
              <div className="absolute inset-0 z-0 bg-linear-to-b from-indigo-300 via-violet-500 to-transparent opacity-80" />
              <div className="relative z-10 flex flex-col items-start overflow-hidden rounded-[30px] bg-[#090b18] p-8">
                <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-violet-500/10 to-transparent" />
                <div className="relative mb-6 flex w-full items-start justify-between">
                  <span className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase text-neutral-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                    </span>
                    Ao Vivo
                  </span>
                </div>
                <h3 className="mb-2 text-xl text-white">Biblioteca de Componentes</h3>
                <p className="mb-6 text-xs leading-relaxed text-neutral-400">Exemplos interativos de todos os componentes do sistema.</p>
                <div className="mb-8 w-full">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-light tracking-tight text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#fff 0%,#c4b5fd 50%,#e879f9 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
                      +100%
                    </span>
                    <span className="flex items-center rounded bg-violet-500/10 px-1.5 py-0.5 text-xs text-violet-400">
                      <ArrowUp className="mr-0.5 h-3 w-3" strokeWidth={3} />
                      Cobertura
                    </span>
                  </div>
                  <div className="relative mt-4 h-16 w-full">
                    <svg className="h-full w-full overflow-visible" viewBox="0 0 280 60" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="dsChartGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0 50 C 40 50,60 30,100 35 C 140 40,160 10,200 15 C 240 20,260 5,280 0 V 60 H 0 Z" fill="url(#dsChartGrad)" />
                      <path d="M0 50 C 40 50,60 30,100 35 C 140 40,160 10,200 15 C 240 20,260 5,280 0" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                      <circle cx="280" cy="0" r="3" fill="#fff" stroke="#8b5cf6" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <button className="mb-8 w-full rounded-full py-3 text-sm text-white transition-all hover:brightness-110" style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed,#a21caf)", boxShadow: "0 4px 15px rgba(139,92,246,0.4)" }}>
                  Ver Componentes
                </button>
                <div className="mb-8 w-full space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-neutral-300">
                      <Eye className="h-4 w-4 text-violet-500" />
                      <span>Componentes</span>
                    </div>
                    <span className="text-white">24</span>
                  </div>
                </div>
                <div className="relative mb-6 flex h-px w-full items-center justify-center bg-linear-to-r from-transparent via-violet-500/50 to-transparent">
                  <span className="px-2 text-[10px] uppercase text-neutral-400" style={{ backgroundColor: "#090b18" }}>Tokens de Design</span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                    <Sparkles className="h-3.5 w-3.5 fill-white text-white" />
                    Sistema Ativo
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 1) TIPOGRAFIA ────────────────────────────────────────────── */}
      <Sec id="tipografia" title="Tipografia" subtitle="Escala de tipos, pesos e estilos usados no sistema.">
        <div className="space-y-6">
          {[
            { label: "Heading 1", size: "76px / 80px", el: <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-white lg:text-[76px]">The Quick Brown Fox</h1> },
            { label: "Heading 2", size: "48px / 56px", el: <h2 className="text-4xl font-light tracking-tight text-white md:text-5xl">The Quick Brown Fox</h2> },
            { label: "Heading 3", size: "24px / 32px", el: <h3 className="text-2xl font-light tracking-tight text-white">The Quick Brown Fox</h3> },
            { label: "Heading 4", size: "20px / 28px", el: <h4 className="text-xl text-white">The Quick Brown Fox</h4> },
            { label: "Body Large", size: "18px / 28px", el: <p className="text-lg leading-relaxed text-neutral-400">The quick brown fox jumps over the lazy dog. This is a longer paragraph to demonstrate line height and spacing.</p> },
            { label: "Body Regular", size: "14px / 22px", el: <p className="text-sm leading-relaxed text-neutral-400">The quick brown fox jumps over the lazy dog. This is a longer paragraph to demonstrate line height and spacing.</p> },
            { label: "Small", size: "12px / 16px", el: <p className="text-xs text-neutral-400">The quick brown fox jumps over the lazy dog.</p> },
            { label: "Gradient Text", size: "36px / 44px", el: <span className="text-4xl font-light tracking-tight text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#fff 0%,#c4b5fd 50%,#e879f9 100%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>Gradient Heading</span> },
          ].map(({ label, size, el }) => (
            <ScrollFade key={label}>
              <div className="flex items-start justify-between border-b border-white/5 pb-6">
                <div className="flex-1">
                  <div className="mb-2 text-xs uppercase text-neutral-500">{label}</div>
                  {el}
                </div>
                <div className="ml-8 text-right font-mono text-xs text-neutral-500">{size}</div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </Sec>

      {/* ── 2) CORES & SUPERFÍCIES ───────────────────────────────────── */}
      <Sec id="cores" title="Cores & Superfícies" subtitle="Paleta de cores, fundos, bordas e tratamentos de superfície.">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ScrollFade className="space-y-4">
            <h3 className="mb-4 text-xl text-white">Fundos</h3>
            <div className="space-y-3">
              <Swatch bg="bg-[#05070f]" label="#05070f" sublabel="Principal" />
              <Swatch bg="bg-[#090b18]" label="#090b18" sublabel="Card" />
              <Swatch bg="bg-neutral-900" label="neutral-900" sublabel="Surface" />
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-4">
            <h3 className="mb-4 text-xl text-white">Texto</h3>
            <div className="space-y-3">
              <Swatch bg="bg-white" label="white" sublabel="Principal" />
              <Swatch bg="bg-neutral-300" label="neutral-300" sublabel="Secundário" />
              <Swatch bg="bg-neutral-400" label="neutral-400" sublabel="Terciário" />
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-4">
            <h3 className="mb-4 text-xl text-white">Cores Accent</h3>
            <div className="space-y-3">
              <Swatch bg="bg-violet-400" label="violet-400" sublabel="Primary" />
              <Swatch bg="bg-violet-500" label="violet-500" sublabel="Accent" />
              <Swatch bg="bg-fuchsia-400" label="fuchsia-400" sublabel="Highlight" />
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-4 md:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-xl text-white">Gradientes</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="h-24 rounded-xl border border-white/10 bg-linear-to-t from-indigo-200 via-violet-500 to-violet-600" />
              <div className="h-24 rounded-xl border border-white/10 bg-linear-to-r from-indigo-600 via-violet-500 to-fuchsia-500" />
              <div className="h-24 rounded-xl border border-white/10 bg-linear-to-r from-white via-violet-200 to-violet-400" />
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-4 md:col-span-2 lg:col-span-3">
            <h3 className="mb-4 text-xl text-white">Bordas & Overlays</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-2 text-sm text-white">border-white/5</div>
                <div className="text-xs text-neutral-400">Borda sutil</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-2 text-sm text-white">border-white/10</div>
                <div className="text-xs text-neutral-400">Borda padrão</div>
              </div>
            </div>
          </ScrollFade>
        </div>
      </Sec>

      {/* ── 3) COMPONENTES ───────────────────────────────────────────── */}
      <Sec id="componentes" title="Componentes UI" subtitle="Componentes interativos e seus estados.">
        <div className="space-y-16">

          {/* Botões */}
          <ScrollFade className="space-y-8">
            <SubH>Botões</SubH>
            <div className="flex flex-wrap items-center gap-4">
              <button
                className="group relative flex items-center justify-center gap-2.5 rounded-full px-8 py-3 text-lg font-medium ring-1 ring-inset ring-white/40 transition-all duration-300 hover:scale-105"
                style={{ background: "linear-gradient(to top,#a5b4fc,#7c3aed,#6d28d9)", color: "#0c0720", boxShadow: "0 0 40px -5px rgba(139,92,246,0.6)" }}
              >
                Primary
              </button>
              <button className="rounded-full bg-white px-8 py-3 text-lg text-black transition-colors hover:bg-neutral-200">
                Secondary
              </button>
              <button className="rounded-full border-t border-white/20 px-5 py-3 text-sm text-white transition-all hover:brightness-110" style={{ background: "linear-gradient(90deg,#4f46e5,#7c3aed,#a21caf)", boxShadow: "0 4px 15px rgba(139,92,246,0.4)" }}>
                Tertiary
              </button>
              <button className="px-4 py-1.5 text-xs text-neutral-400 transition-colors hover:text-white">
                Text Button
              </button>
            </div>
          </ScrollFade>

          {/* Cards */}
          <ScrollFade className="space-y-8">
            <SubH>Cards</SubH>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white/2 p-6 ring-1 ring-white/10 transition-colors hover:bg-white/4">
                <h4 className="mb-2 text-sm text-white">Card Padrão</h4>
                <p className="text-xs text-neutral-500">Card com fundo sutil e borda.</p>
              </div>
              <ElectricCard>
                <h4 className="mb-2 text-sm text-white">Card Elétrico</h4>
                <p className="text-xs text-neutral-400">Card com efeito de borda luminosa.</p>
              </ElectricCard>
            </div>
          </ScrollFade>

          {/* Inputs */}
          <ScrollFade className="space-y-8">
            <SubH>Inputs</SubH>
            <div className="max-w-md space-y-4">
              <div className="flex h-8 items-center gap-2 rounded-lg bg-black/40 pl-2.5 pr-2.5 ring-1 ring-white/10">
                <Search className="h-3.5 w-3.5 text-neutral-500" />
                <input className="w-48 bg-transparent text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none" placeholder="Buscar..." type="text" />
              </div>
              <div className="flex items-center rounded-lg border border-white/10 bg-[#05070f] transition-all focus-within:border-white/20">
                <input className="h-10 w-full rounded-l-lg border-none bg-transparent pl-4 pr-1 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none" placeholder="Seu e-mail" type="email" />
                <button className="flex h-10 shrink-0 items-center gap-2 rounded-r-lg bg-white px-4 py-2 text-sm text-black shadow-lg transition-colors hover:bg-neutral-200">
                  Enviar
                </button>
              </div>
            </div>
          </ScrollFade>

          {/* Badges */}
          <ScrollFade className="space-y-8">
            <SubH>Badges & Tags</SubH>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase text-neutral-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
                </span>
                Ao Vivo
              </span>
              <span className="rounded-md bg-violet-500/10 px-2 py-0.5 text-[11px] uppercase text-violet-400 ring-1 ring-violet-500/20">
                Tendência
              </span>
              <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-neutral-300 ring-1 ring-white/10">
                Tag
              </span>
            </div>
          </ScrollFade>

          {/* Toggles */}
          <ScrollFade className="space-y-8">
            <SubH>Toggles</SubH>
            <div className="max-w-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Ativado</span>
                <button aria-pressed="true" className="relative inline-flex h-5 w-9 items-center rounded-full bg-violet-500/20 ring-1 ring-violet-500/30">
                  <span className="absolute left-0.5 top-0.5 h-4 w-4 translate-x-4 rounded-full bg-violet-400 shadow-sm transition-transform" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-300">Desativado</span>
                <button aria-pressed="false" className="relative inline-flex h-5 w-9 items-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <span className="absolute left-0.5 top-0.5 h-4 w-4 translate-x-0 rounded-full bg-neutral-400 shadow-sm transition-transform" />
                </button>
              </div>
            </div>
          </ScrollFade>
        </div>
      </Sec>

      {/* ── 4) LAYOUT & ESPAÇAMENTO ──────────────────────────────────── */}
      <Sec id="layout" title="Layout & Espaçamento" subtitle="Grids, containers e padrões de espaçamento.">
        <div className="space-y-16">
          <ScrollFade className="space-y-6">
            <SubH>Container</SubH>
            <div className="mx-auto max-w-7xl rounded-xl border border-white/10 bg-white/5 px-6 py-8">
              <div className="text-sm text-white">max-w-7xl mx-auto px-6</div>
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-6">
            <SubH>Grid System</SubH>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 lg:col-span-7">
                <div className="text-sm text-white">lg:col-span-7</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 lg:col-span-5">
                <div className="text-sm text-white">lg:col-span-5</div>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-6">
            <SubH>Spacing Scale</SubH>
            <div className="space-y-4">
              {[
                { size: "w-2 h-2", label: "gap-2 (8px)" },
                { size: "w-4 h-4", label: "gap-4 (16px)" },
                { size: "w-6 h-6", label: "gap-6 (24px)" },
                { size: "w-8 h-8", label: "gap-8 (32px)" },
              ].map(({ size, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className={`${size} rounded-full bg-violet-500`} />
                  <div className="text-sm text-white">{label}</div>
                </div>
              ))}
            </div>
          </ScrollFade>
        </div>
      </Sec>

      {/* ── 5) MOTION & INTERAÇÃO ────────────────────────────────────── */}
      <Sec id="motion" title="Motion & Interação" subtitle="Animações, transições e comportamentos interativos.">
        <div className="space-y-16">
          <ScrollFade className="space-y-8">
            <SubH>Animações de Entrada</SubH>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[100, 200, 300].map((d) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: d / 1000, ease: [0.2, 0.8, 0.2, 1] }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-2 text-sm text-white">fadeInUpBlur</div>
                  <div className="text-xs text-neutral-400">delay-{d}</div>
                </motion.div>
              ))}
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-8">
            <SubH>Efeitos de Hover</SubH>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/4">
                <div className="mb-2 text-sm text-white">Background Change</div>
                <div className="text-xs text-neutral-400">hover:bg-white/4</div>
              </div>
              <div className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20">
                <div className="mb-2 text-sm text-white">Border Highlight</div>
                <div className="text-xs text-neutral-400">hover:border-white/20</div>
              </div>
              <div className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition-transform hover:scale-105">
                <div className="mb-2 text-sm text-white">Scale Transform</div>
                <div className="text-xs text-neutral-400">hover:scale-105</div>
              </div>
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-8">
            <SubH>Animações no Scroll</SubH>
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-2 text-sm text-white">whileInView</div>
              <div className="text-xs text-neutral-400">Dispara quando o elemento entra na viewport</div>
            </motion.div>
          </ScrollFade>
        </div>
      </Sec>

      {/* ── 6) ÍCONES ────────────────────────────────────────────────── */}
      <Sec id="ícones" title="Ícones" subtitle="Sistema de ícones Lucide com variantes de tamanho e cor.">
        <div className="space-y-16">
          <ScrollFade className="space-y-8">
            <SubH>Tamanhos</SubH>
            {[
              { cls: "h-3 w-3", label: "w-3 h-3 (12px)" },
              { cls: "h-4 w-4", label: "w-4 h-4 (16px)" },
              { cls: "h-6 w-6", label: "w-6 h-6 (24px)" },
            ].map(({ cls, label }) => (
              <div key={cls} className="flex items-center gap-8">
                <Sparkles className={`${cls} text-white`} />
                <span className="text-sm text-neutral-400">{label}</span>
              </div>
            ))}
          </ScrollFade>

          <ScrollFade className="space-y-8">
            <SubH>Cores</SubH>
            <div className="flex flex-wrap gap-8">
              <Sparkles className="h-6 w-6 text-white" />
              <Sparkles className="h-6 w-6 text-neutral-400" />
              <Sparkles className="h-6 w-6 text-violet-400" />
              <Sparkles className="h-6 w-6 text-violet-500" />
            </div>
          </ScrollFade>

          <ScrollFade className="space-y-8">
            <SubH>Ícones Comuns</SubH>
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8">
              {[Asterisk, Sparkles, Zap, TrendingUp, Eye, Search, ChevronDown, ArrowUp].map((Icon, i) => (
                <Icon key={i} className="h-6 w-6 text-white" />
              ))}
            </div>
          </ScrollFade>
        </div>
      </Sec>
    </div>
  );
}
