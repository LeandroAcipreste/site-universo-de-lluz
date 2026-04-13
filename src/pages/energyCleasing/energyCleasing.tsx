import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, MotionValue } from "motion/react";
import { ChevronDown } from "lucide-react";
import CardEnergyCleasing from "./cardEnergyCleasing";
import { ENERGY_CLEASING_DB } from "./energyCleasingData";
import type { CategoryType } from "./energyCleasingData";
import Background from "../../components/background";
import BackgroundSpiral from "./backgroundSpiral";

const CATEGORIES: { key: CategoryType; label: string }[] = [
    { key: "ambientes", label: "Ambientes" },
    { key: "pessoal", label: "Pessoal" },
    { key: "cristais", label: "Cristais" },
];

function CategoryProgressBar({ scrollYProgress, activeIndex, total }: { scrollYProgress: MotionValue<number>; activeIndex: number; total: number; }) {
    const width = useTransform(scrollYProgress, [activeIndex / total, (activeIndex + 1) / total], ["0%", "100%"]);
    return <motion.div className="h-full bg-white shadow-[0_0_8px_#fff]" style={{ width }} />;
}

export default function EnergyCleasing() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("ambientes");
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLElement>(null);

    const currentTechniques = ENERGY_CLEASING_DB[selectedCategory];
    const total = currentTechniques.length;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(Math.floor(latest * total), total - 1);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    });

    const handleCategoryChange = (cat: CategoryType) => {
        setSelectedCategory(cat);
        setActiveIndex(0);
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

                {/* ── PAINEL ESQUERDO ── */}
                <div className="relative z-20 flex h-[20%] md:h-full w-full flex-col justify-center px-6 py-2 md:w-1/2 md:px-16 lg:px-24 md:py-12 backdrop-blur-[2px]">

                    <div className="mb-2 md:mb-10 flex flex-wrap gap-2">
                        {CATEGORIES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`rounded-full border px-4 py-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${selectedCategory === key
                                    ? "border-white/30 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative h-[40px] md:h-[300px] w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedCategory}-${activeIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <h3 className="mb-0 md:mb-4 font-headline text-lg font-bold text-white uppercase tracking-tight md:text-5xl">
                                    {currentTechniques[activeIndex]?.title}
                                </h3>

                                <p className="hidden md:block max-w-md text-lg leading-relaxed text-neutral-400 font-light">
                                    {currentTechniques[activeIndex]?.description}
                                </p>

                                <div className="hidden md:block mt-8 h-[2px] w-full max-w-sm bg-white/10">
                                    <CategoryProgressBar scrollYProgress={scrollYProgress} activeIndex={activeIndex} total={total} />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── INDICADOR DE SCROLL ANIMADO ── */}
                    <AnimatePresence>
                        {activeIndex < total - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute bottom-2 md:bottom-12 left-6 md:left-16 lg:left-24 flex items-center gap-2 text-white/40"
                            >
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                </motion.div>
                                <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em]">
                                    Role para a próxima
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* ── PAINEL DIREITO: CARDS ── */}
                <div className="relative h-[80%] w-full md:h-full md:w-1/2 border-t md:border-t-0 md:border-l border-white/5">
                    <BackgroundSpiral />

                    <div className="relative flex h-full items-center justify-center overflow-hidden">
                        {currentTechniques.map((technique, index) => {
                            const isActive = index === activeIndex;
                            const isPast = index < activeIndex;

                            return (
                                <motion.div
                                    key={`${selectedCategory}-${index}`}
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                        y: isActive ? 0 : (isPast ? -100 : 100),
                                        scale: isActive ? 1 : 0.85,
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute inset-0 flex items-center justify-center p-4 md:p-12 z-10"
                                    style={{
                                        pointerEvents: isActive ? "auto" : "none"
                                    }}
                                >
                                    <CardEnergyCleasing cleasing={technique} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
