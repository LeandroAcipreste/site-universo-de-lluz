import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import CardPrayer from "./cardprayer";
import { PRAYERS_DB } from "./prayerData";
import type { CategoryType } from "./prayerData";
import Background from "../../components/background";
import BackgroundSnake from "./backgroundSnake.tsx";
import MobileScrollFactory from "../../layouts/MobileScrollFactory";
import "./prayer.css";

const CATEGORIES: { key: CategoryType; label: string }[] = [
    { key: "catolicas", label: "Católicas" },
    { key: "xamanicas", label: "Xamânicas" },
    { key: "anjos", label: "Aos Anjos" },
];

export default function Prayer() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryType>("catolicas");
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const cooldown = useRef(false);

    const currentPrayers = PRAYERS_DB[selectedCategory];
    const total = currentPrayers.length;

    const navigate = (delta: 1 | -1) => {
        if (cooldown.current) return;
        cooldown.current = true;
        setTimeout(() => { cooldown.current = false; }, 700);
        setDirection(delta);
        setActiveIndex(i => Math.min(Math.max(i + delta, 0), total - 1));
    };

    const handleCategoryChange = (cat: CategoryType) => {
        setSelectedCategory(cat);
        setActiveIndex(0);
        setDirection(1);
    };

    const progressPercent = total > 1 ? (activeIndex / (total - 1)) * 100 : 100;

    return (
        <MobileScrollFactory 
            className="prayer-section" 
            onSwipeUp={() => navigate(1)} 
            onSwipeDown={() => navigate(-1)}
        >
            <Background />

            <div className="prayer-sticky">

                {/* ── PAINEL ESQUERDO ── */}
                <div className="prayer-panel-left">

                    <div className="prayer-tabs">
                        {CATEGORIES.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => handleCategoryChange(key)}
                                className={`prayer-tab ${selectedCategory === key ? "prayer-tab--active" : "prayer-tab--inactive"}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="prayer-title-area">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${selectedCategory}-${activeIndex}`}
                                initial={{ opacity: 0, x: -10 * direction }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 * direction }}
                                transition={{ duration: 0.4 }}
                                className="prayer-motion-container"
                            >
                                <h3
                                    className="prayer-title"
                                    style={{
                                        fontSize: currentPrayers[activeIndex]?.title?.length > 40
                                            ? 'clamp(1.5rem, 3.5vw + 0.3rem, 2.4rem)'
                                            : currentPrayers[activeIndex]?.title?.length > 25
                                            ? 'clamp(1.8rem, 4.5vw + 0.4rem, 3rem)'
                                            : 'clamp(2rem, 5.5vw + 0.5rem, 4rem)'
                                    }}
                                >
                                    {currentPrayers[activeIndex]?.title}
                                </h3>

                                <p className="prayer-description">
                                    {currentPrayers[activeIndex]?.description}
                                </p>

                                <div className="prayer-progress-track">
                                    <div
                                        className="prayer-progress-bar"
                                        style={{ width: `${progressPercent}%` }}
                                    />
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
                                className="prayer-scroll-indicator"
                            >
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="prayer-scroll-icon" />
                                </motion.div>
                                <span className="prayer-scroll-text">Role para a próxima</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                {/* ── PAINEL DIREITO: CARDS ── */}
                <div className="prayer-panel-right">
                    <BackgroundSnake />

                    <div className="prayer-cards-viewport">
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
                                    className="prayer-card-slot"
                                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                                >
                                    <CardPrayer prayer={prayer} />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </MobileScrollFactory>
    );
}