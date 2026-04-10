import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, MotionValue } from "motion/react";
import CardPrayer from "./cardprayer";
import { PRAYERS_DB } from "./prayerData";
import type { CategoryType } from "./prayerData";
import Background from "../../components/background";
import BackgroundSnake from "./backgroundSnake.tsx";

const CATEGORIES: { key: CategoryType; label: string }[] = [
    { key: "catolicas", label: "Católicas" },
    { key: "xamanicas", label: "Xamânicas" },
    { key: "anjos", label: "Aos Anjos" },
];

/**
 * Barra de progresso isolada para evitar erros de Hooks
 */
function CategoryProgressBar({ scrollYProgress, activeIndex, total }: { scrollYProgress: MotionValue<number>; activeIndex: number; total: number; }) {
    const width = useTransform(scrollYProgress, [activeIndex / total, (activeIndex + 1) / total], ["0%", "100%"]);
    return <motion.div className="h-full bg-white shadow-[0_0_8px_#fff]" style={{ width }} />;
}

export default function Prayer() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("catolicas");
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    const currentPrayers = PRAYERS_DB[selectedCategory];
    const total = currentPrayers.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Cérebro do scroll: decide exatamente qual card é o ativo
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(Math.floor(latest * total), total - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const handleCategoryChange = (cat: CategoryType) => {
        setSelectedCategory(cat);
        setActiveIndex(0); // Força a voltar para a primeira oração na troca
        if (containerRef.current) {
            window.scrollTo({ top: containerRef.current.offsetTop, behavior: "smooth" });
        }
    };

    return (
        <section
            ref={containerRef}
            className="relative bg-transparent text-[#f2f2f2]"
            style={{ height: `${total * 120}vh` }}
        >
            <Background />

            <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex flex-col md:flex-row overflow-hidden">

                {/* ── PAINEL ESQUERDO: TEXTOS ── */}
                <div className="relative z-20 flex h-full w-full flex-col justify-center px-6 py-12 md:w-1/2 md:px-16 lg:px-24 bg-[#050505]/90 backdrop-blur-sm md:bg-transparent">
                    <div className="mb-10 flex flex-wrap gap-2">
                        {CATEGORIES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${selectedCategory === key
                                        ? "border-white/30 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                        : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative h-[300px] w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedCategory}-${activeIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <h3 className="mb-4 font-headline text-3xl font-bold text-white uppercase tracking-tight md:text-5xl">
                                    {currentPrayers[activeIndex]?.title}
                                </h3>
                                <p className="max-w-md text-lg leading-relaxed text-neutral-400 font-light">
                                    {currentPrayers[activeIndex]?.description}
                                </p>

                                <div className="mt-8 h-[2px] w-full max-w-sm bg-white/10">
                                    <CategoryProgressBar scrollYProgress={scrollYProgress} activeIndex={activeIndex} total={total} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── PAINEL DIREITO: CARDS ANTI-GHOSTING ── */}
                <div className="relative h-1/2 w-full bg-[#080808]/50 md:h-full md:w-1/2 border-l border-white/5">
                    <BackgroundSnake />

                    <div className="relative flex h-full items-center justify-center overflow-hidden">
                        {currentPrayers.map((prayer, index) => {
                            // A Lógica de Ferro: Apenas o index atual fica ativo
                            const isActive = index === activeIndex;
                            const isPast = index < activeIndex;

                            return (
                                <motion.div
                                    key={`${selectedCategory}-${index}`}
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0, // Se não for o ativo, some!
                                        y: isActive ? 0 : (isPast ? -100 : 100), // Empurra os inativos pra fora
                                        scale: isActive ? 1 : 0.85,
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 flex items-center justify-center p-4 md:p-12 z-10"
                                    style={{
                                        pointerEvents: isActive ? "auto" : "none" // Impede que cards invisíveis sejam clicados
                                    }}
                                >
                                    <CardPrayer prayer={prayer} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}