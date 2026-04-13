import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SiteNav from "../../components/siteNav";
import OracleBackground from "./oracleBackground";
import { BTN_PRIMARY } from "../../constants/btnPrimary";

/**
 * Oracle Page — Responsividade Senior
 * ─────────────────────────────────────
 * Mobile  : Conteúdo empilhado, título centralizado, card em baixo
 * Tablet  : Layout de 1 col com espaçamentos intermediários
 * Desktop : 2 colunas — título à esq., card informativo à dir.
 * Todas as dimensões usam clamp() para fluidez contínua
 */
export default function Oracle() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-violet-500/30">
      <OracleBackground />
      <SiteNav />

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div
        className={[
          "relative z-10",
          "mx-auto max-w-7xl",
          /* Mobile: empilhado, padding generoso no topo para nav */
          "flex min-h-screen flex-col items-center justify-center",
          "gap-8 px-5 pb-10 pt-24",
          /* Desktop: layout em 2 colunas lado a lado */
          "lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-10 lg:py-0",
        ].join(" ")}
      >

        {/* ── COLUNA ESQUERDA: Título ── */}
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-light uppercase antialiased leading-[1.05] tracking-tight text-white"
            style={{
              fontFamily: "'Optima','Zapf Humanist','Tenor Sans',sans-serif",
              fontSize: "clamp(2.2rem, 7vw + 0.5rem, 5rem)",
            }}
          >
            Conheça o
            <br />
            <span
              className="text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg,#67e8f9 0%,#818cf8 50%,#f0abfc 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              Oráculo com Ol
            </span>
            <span style={{ color: "#67e8f9" }}>y</span>via
          </motion.h1>
        </div>

        {/* ── COLUNA DIREITA: Card Informativo ── */}
        <div className="flex w-full flex-col">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className={[
              "relative overflow-hidden",
              "rounded-[20px] border border-white/10",
              "bg-black/40 backdrop-blur-xl",
              /* Padding responsivo */
              "p-5 sm:p-6 md:p-7",
            ].join(" ")}
            style={{ fontFamily: "'Exo 2', system-ui, sans-serif" }}
          >
            {/* Brilho interno */}
            <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-gradient-to-b from-violet-500/6 to-transparent" />

            <h2
              className="mb-3 font-bold uppercase tracking-[0.18em] text-cyan-400"
              style={{ fontSize: "clamp(0.65rem, 1.5vw + 0.3rem, 0.8rem)" }}
            >
              Como é o Oráculo?
            </h2>

            <div
              className="space-y-2.5 font-light leading-relaxed text-neutral-200 antialiased"
              style={{ fontSize: "clamp(0.8rem, 1.5vw + 0.3rem, 0.95rem)" }}
            >
              <p>
                O encontro dura 40 minutos onde Olyvia se conecta com seus
                guias pessoais, servindo de ponte para mensagens e orientações
                profundas.
              </p>
              <p>
                Atendimentos às terças-feiras (presencial ou online) e um
                sábado por mês (apenas online), mediante agendamento prévio.
              </p>
              <p>
                Inclui receita via e-mail e limpeza energética obrigatória
                para atendimentos presenciais na Livraria 3º Milênio, Salvador.
              </p>
              <p className="italic text-neutral-400" style={{ fontSize: "clamp(0.72rem, 1.3vw + 0.25rem, 0.85rem)" }}>
                *Serviço de descarrego com Ramaiana disponível nos dias de
                atendimento presencial.
              </p>
            </div>

            {/* Botão compacto centralizado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-5 flex justify-center"
            >
              <a
                href="https://wa.me/5571996612421"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full px-5 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={BTN_PRIMARY}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 40px -5px rgba(139,92,246,0.75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    BTN_PRIMARY.boxShadow as string;
                }}
              >
                Agendar Consulta
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
