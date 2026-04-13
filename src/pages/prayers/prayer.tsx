import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent, MotionValue } from "motion/react";
import { ChevronDown } from "lucide-react"; // <-- Importamos a setinha aqui
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
                <div className="relative z-20 flex h-[25%] md:h-full w-full flex-col justify-center px-6 py-4 md:w-1/2 md:px-12 lg:px-20 xl:px-24 md:py-12 backdrop-blur-[2px] transition-all duration-500">

                    <div className="mb-4 md:mb-10 flex flex-wrap gap-2">
                        {CATEGORIES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`rounded-full border px-4 py-1.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${selectedCategory === key
                                    ? "border-white/30 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                    : "border-white/10 bg-transparent text-white/40 hover:border-white/20 hover:text-white/70"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="relative h-fit min-h-[60px] md:min-h-[300px] w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedCategory}-${activeIndex}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.4 }}
                                className="flex flex-col justify-center"
                            >
                                <h3 className="mb-2 md:mb-6 font-headline font-bold text-white uppercase tracking-tight leading-[1.1]" 
                                    style={{ fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 3.5rem)' }}>
                                    {currentPrayers[activeIndex]?.title}
                                </h3>

                                <p className="hidden md:block max-w-md text-base lg:text-lg leading-relaxed text-neutral-400 font-light lg:mb-8">
                                    {currentPrayers[activeIndex]?.description}
                                </p>

                                <div className="hidden md:block mt-4 h-[2px] w-full max-w-xs bg-white/10">
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
                                className="absolute bottom-4 md:bottom-12 left-6 md:left-12 lg:left-20 xl:left-24 flex items-center gap-2 text-white/40"
                            >
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                                </motion.div>
                                <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em]">
                                    Role para a próxima
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* ── PAINEL DIREITO: CARDS ── */}
                <div className="relative h-[75%] w-full md:h-full md:w-1/2 border-t md:border-t-0 md:border-l border-white/5 transition-all">
                    <BackgroundSnake />

                    <div className="relative flex h-full items-center justify-center overflow-hidden p-6 md:p-8 lg:p-12">
                        {currentPrayers.map((prayer, index) => {
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