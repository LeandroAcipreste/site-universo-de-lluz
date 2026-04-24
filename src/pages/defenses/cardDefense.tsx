import type { DefenseData } from "./defensesData";
import "./cardDefense.css";

interface CardDefenseProps {
    defense: DefenseData;
}

export default function CardDefense({ defense }: CardDefenseProps) {
    return (
        <div className="card-defense">

            {/* Soft background glow */}
            <div className="card-defense__glow-wrapper">
                <div className="card-defense__glow" />
            </div>

            {/* Text Body */}
            <div className="card-defense__body">
                {defense.cardLines.map((line, idx) => (
                    <p key={idx} className="card-defense__line">
                        {line}
                    </p>
                ))}
            </div>

            {/* Bottom Watermark */}
            <div className="card-defense__watermark">
                <div className="card-defense__watermark-line card-defense__watermark-line--left" />
                <span className="card-defense__watermark-text">
                    Universo de Luz
                </span>
                <div className="card-defense__watermark-line card-defense__watermark-line--right" />
            </div>

        </div>
    );
}
