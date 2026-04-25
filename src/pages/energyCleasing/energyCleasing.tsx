import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import CardEnergyCleasing from "./cardEnergyCleasing";
import { ENERGY_CLEASING_DB } from "./energyCleasingData";
import type { CategoryType } from "./energyCleasingData";
import Background from "../../components/background";
import BackgroundSpiral from "./backgroundSpiral";
import "./energyCleasing.css";

const CATEGORIES: { key: CategoryType; label: string }[] = [
    { key: "ambientes", label: "Ambientes" },
    { key: "pessoal", label: "Pessoal" },
    { key: "cristais", label: "Cristais" },
];

export default function EnergyCleasing() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("ambientes");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const sectionRef = useRef<HTMLElement>(null);
    const cooldown = useRef(false);
    const touchStartY = useRef(0);

    const currentTechniques = ENERGY_CLEASING_DB[selectedCategory];
    const total = currentTechniques.length;

    const navigate = (delta: 1 | -1) => {
        if (cooldown.current) return;
        cooldown.current = true;
        setTimeout(() => { cooldown.current = false; }, 700);
        setDirection(delta);
        setActiveIndex(i => Math.min(Math.max(i + delta, 0), total - 1));
    };

    // Desktop: wheel scroll
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            const rect = el.getBoundingClientRect();
            const inView = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.5;
            if (!inView) return;
            e.preventDefault();
            navigate(e.deltaY > 0 ? 1 : -1);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [total]);

    // Mobile: touch swipe
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
        };

        const onTouchEnd = (e: TouchEvent) => {
            const delta = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(delta) < 30) return;
            navigate(delta > 0 ? 1 : -1);
        };

        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, [total]);

    const handleCategoryChange = (cat: CategoryType) => {
        setSelectedCategory(cat);
        setActiveIndex(0);
        setDirection(1);
    };

    const progressPercent = total > 1 ? (activeIndex / (total - 1)) * 100 : 100;

    return (
        <section ref={sectionRef} className="energy-section">
            <Background />

            <div className="energy-sticky">

                {/* ── PAINEL ESQUERDO ── */}
                <div className="energy-panel-left">

                    <div className="energy-tabs">
                        {CATEGORIES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`energy-tab ${selectedCategory === key ? "energy-tab--active" : "energy-tab--inactive"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="energy-title-area">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedCategory}-${activeIndex}`}
                                initial={{ opacity: 0, x: -10 * direction }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 * direction }}
                                transition={{ duration: 0.4 }}
                                className="energy-motion-container"
                            >
                                <h3
                                    className="energy-title"
                                    style={{ fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 3.5rem)' }}
                                >
                                    {currentTechniques[activeIndex]?.title}
                                </h3>

                                <p className="energy-description">
                                    {currentTechniques[activeIndex]?.description}
                                </p>

                                <div className="energy-progress-track">
                                    <div
                                        className="energy-progress-bar"
                                        style={{ width: `${progressPercent}%`, transition: "width 0.5s ease" }}
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── INDICADOR VISUAL ── */}
                    <AnimatePresence>
                        {activeIndex < total - 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="energy-scroll-indicator"
                            >
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="energy-scroll-icon" />
                                </motion.div>
                                <span className="energy-scroll-text">Role para a próxima</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* ── PAINEL DIREITO: CARDS ── */}
                <div className="energy-panel-right">
                    <BackgroundSpiral />

                    <div className="energy-cards-viewport">
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
                                    className="energy-card-slot"
                                    style={{ pointerEvents: isActive ? "auto" : "none" }}
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
