import { motion } from "motion/react";
import { ArrowRight, Youtube as YoutubeIcon } from "lucide-react";
import SiteNav from "../../components/siteNav";
import Background from "../../components/background";
import BackgroundSnake from "../prayers/backgroundSnake";
import { BTN_PRIMARY } from "../../constants/btnPrimary";

export default function YoutubePage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white selection:bg-red-500/30">
      <Background />
      <BackgroundSnake />
      <SiteNav />

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center px-5 text-center pt-[max(8rem,15vh)] pb-20 justify-start lg:justify-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-4 font-light leading-[1.05] tracking-tight uppercase antialiased"
          style={{
            fontFamily: "'Optima','Zapf Humanist','Tenor Sans',sans-serif",
            fontSize: 'clamp(2.2rem, 7vw + 0.5rem, 5rem)',
          }}
        >
          CONHEÇA NOSSO
          <br />
          <span
            className="text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg,#67e8f9 0%,#818cf8 50%,#f0abfc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            CANAL NO YOUTUBE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 font-light tracking-[0.15em] text-white/70 uppercase"
          style={{ 
            fontFamily: "'Optima','Zapf Humanist','Tenor Sans',sans-serif",
            fontSize: 'clamp(0.9rem, 1.5vw + 0.4rem, 1.25rem)'
          }}
        >
          VÍDEO NOVO TODA QUARTA-FEIRA 19HS
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex w-full flex-col items-center"
        >
          <a
            href="https://www.youtube.com/universodeluz"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mb-[clamp(3rem,8vw,5rem)] flex items-center justify-center gap-3 rounded-full px-8 py-3.5 text-base md:px-10 md:py-4 md:text-lg font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={BTN_PRIMARY}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 60px -5px rgba(139,92,246,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = BTN_PRIMARY.boxShadow as string;
            }}
          >
            Acessar Canal
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-6xl"
          >
            <p className="mb-8 text-sm md:text-lg font-light tracking-wide text-white/40 lowercase italic">
              Separamos algumas playlists especiais para você
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {[
                { label: "Hinduísmo", link: "https://www.youtube.com/watch?v=Vi9cG1wAEQ0&list=PLlwyMNQ7JxCjfdiGYQBLuRaFw2TV0eOaT" },
                { label: "Orixás", link: "https://www.youtube.com/watch?v=NtLhlPbP4cw&list=PLlwyMNQ7JxChirJZdcldDvhXZfUJSWHoe" },
                { label: "Entidades Auxiliares", link: "https://www.youtube.com/watch?v=Xsr42eC3EmA&list=PLlwyMNQ7JxCihBLTB7SxC6AZ9Og5zEXC4" },
                { label: "Chakras", link: "https://www.youtube.com/watch?v=HB24ISctQbw&list=PLlwyMNQ7JxCjj_Bsn_-Cp_II0K1DlHJZ6" },
                { label: "Arcanjos", link: "https://www.youtube.com/watch?v=DfKC6x_hVH0&list=PLlwyMNQ7JxCiBy5ouT07Vy4Ev2GyVb0l1" },
                { label: "Xamanismo", link: "https://www.youtube.com/watch?v=UGyswblXraM&list=PLlwyMNQ7JxCit-UNiczPf236wMoLokcQu" }
              ].map((playlist, idx) => (
                <a 
                  key={idx}
                  href={playlist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full overflow-hidden rounded-[20px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-red-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="mb-0.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-red-500/80">
                        Playlist
                      </span>
                      <h3 className="text-xl md:text-2xl font-light tracking-tight text-white uppercase" style={{ fontFamily: "'Optima', sans-serif" }}>
                        {playlist.label}
                      </h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-red-500 ring-1 ring-red-500/20 transition-all duration-500 group-hover:bg-red-600 group-hover:text-white md:h-12 md:w-12">
                      <YoutubeIcon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
