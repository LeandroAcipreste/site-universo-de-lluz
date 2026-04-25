import type { EnergyCleasingData } from "./energyCleasingData";
import "./cardEnergyCleasing.css";

interface CardEnergyCleasingProps {
    cleasing: EnergyCleasingData;
}

export default function CardEnergyCleasing({ cleasing }: CardEnergyCleasingProps) {
    return (
        <div className="card-energy">

            {/* Soft background glow */}
            <div className="card-energy__glow-wrapper">
                <div className="card-energy__glow" />
            </div>

            {/* Text Body */}
            <div className="card-energy__body">
                {cleasing.cardLines.map((line, idx) => (
                    <p key={idx} className="card-energy__line">
                        {line}
                    </p>
                ))}
            </div>

            {/* Bottom Watermark */}
            <div className="card-energy__watermark">
                <div className="card-energy__watermark-line card-energy__watermark-line--left" />
                <span className="card-energy__watermark-text">
                    Universo de Luz
                </span>
                <div className="card-energy__watermark-line card-energy__watermark-line--right" />
            </div>

        </div>
    );
}
