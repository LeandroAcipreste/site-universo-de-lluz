import type { PrayerData } from "./prayerData";

interface CardPrayerProps {
    prayer: PrayerData;
}

export default function CardPrayer({ prayer }: CardPrayerProps) {
    return (
        <div className="relative flex w-full max-w-[550px] flex-col rounded-[2rem] border border-indigo-900/40 bg-[#0a0a14] px-6 py-8 md:px-10 md:py-10 shadow-[0_0_80px_-20px_rgba(40,20,80,0.5)] backdrop-blur-3xl md:rounded-[2.5rem] pointer-events-auto">

            {/* Soft background glow */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-80 mix-blend-screen" />
            </div>

            {/* Text Body - Agora é a estrela do card */}
            <div className="relative z-10 mb-6 flex flex-col gap-2 border-l border-white/10 pl-5 py-2">
                {prayer.cardLines.map((line, idx) => (
                    <p key={idx} className="font-sans text-[12px] font-medium leading-normal text-[#cbd5e1] md:text-[14px] lg:leading-relaxed">
                        {line}
                    </p>
                ))}
            </div>

            {/* Footer phrase */}
            <p className="relative z-10 mb-5 text-center font-serif text-[14px] font-semibold italic text-white/80 shrink-0">
                {prayer.cardFooter}
            </p>

            {/* Mantras */}
            <div className="relative z-10 mb-8 flex w-full flex-wrap items-center justify-center gap-3 text-center shrink-0 md:gap-5">
                {prayer.cardMantras.map((mantra, idx) => (
                    <span key={idx} className="font-sans text-[12px] font-bold tracking-wider text-[#b794f4]">
                        {mantra}
                    </span>
                ))}
            </div>

            {/* Bottom Watermark */}
            <div className="relative z-10 flex w-full items-center gap-3 shrink-0">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/5" />
                <span className="font-sans text-[9px] font-bold tracking-[0.15em] text-[#93c5fd]/60 uppercase">
                    Universo de Luz
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/5" />
            </div>

        </div>
    );
}