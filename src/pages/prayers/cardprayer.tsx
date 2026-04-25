import type { PrayerData } from "./prayerData";
import "./cardprayer.css";

interface CardPrayerProps {
    prayer: PrayerData;
}

export default function CardPrayer({ prayer }: CardPrayerProps) {
    return (
        <div className="card-prayer">

            {/* Soft background glow */}
            <div className="card-prayer__glow-wrapper">
                <div className="card-prayer__glow" />
            </div>

            {/* Text Body */}
            <div className="card-prayer__body">
                {prayer.cardLines.map((line, idx) => (
                    <p key={idx} className="card-prayer__line">
                        {line}
                    </p>
                ))}
            </div>

            {/* Bottom Watermark */}
            <div className="card-prayer__watermark">
                <div className="card-prayer__watermark-line card-prayer__watermark-line--left" />
                <span className="card-prayer__watermark-text">
                    Universo de Luz
                </span>
                <div className="card-prayer__watermark-line card-prayer__watermark-line--right" />
            </div>

        </div>
    );
}