import React from "react";
import "./ChakraPillar.css";

// Helper para desenhar as pétalas do lótus em volta do centro (50, 50)
const renderPetals = (count: number, path: string, color: string) => {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (360 / count) * i;
    return (
      <path
        key={i}
        d={path}
        transform={`rotate(${angle} 50 50)`}
        fill={color}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    );
  });
};

// Caminhos padrão de pétalas para os diferentes chakras
const rootPetal = "M 50 28 C 65 18, 70 5, 50 0 C 30 5, 35 18, 50 28 Z";
const sacralPetal = "M 50 28 C 60 15, 62 5, 50 0 C 38 5, 40 15, 50 28 Z";
const solarPetal = "M 50 28 C 58 18, 60 8, 50 2 C 40 8, 42 18, 50 28 Z";
const heartPetal = "M 50 26 C 56 18, 58 10, 50 4 C 42 10, 44 18, 50 26 Z";
const throatPetal = "M 50 26 C 54 16, 56 8, 50 2 C 44 8, 46 16, 50 26 Z";

// Design intricado e perfeito como solicitado na imagem
const chakras = [
  {
    id: "crown",
    name: "Coronário",
    color: "#a855f7", // Violeta
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {renderPetals(24, "M 50 20 C 53 10, 55 2, 50 0 C 45 2, 47 10, 50 20 Z", "currentColor")}
        {renderPetals(16, "M 50 26 C 54 16, 56 8, 50 4 C 44 8, 46 16, 50 26 Z", "#d8b4fe")}
        {renderPetals(8, "M 50 32 C 55 22, 57 14, 50 8 C 43 14, 45 22, 50 32 Z", "currentColor")}
        <circle cx="50" cy="50" r="16" fill="#d8b4fe" />
        <circle cx="50" cy="50" r="12" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "thirdeye",
    name: "Frontal",
    color: "#4f46e5", // Índigo (Ajustado para um azul mais profundo)
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {/* As duas grandes pétalas horizontais */}
        <path d="M 12 50 Q 50 15 88 50 Q 50 85 12 50 Z" fill="currentColor" />
        <circle cx="50" cy="50" r="24" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
        <polygon points="50,68 32,38 68,38" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "throat",
    name: "Laríngeo",
    color: "#0ea5e9", // Azul Claro/Turquesa
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#bae6fd" strokeWidth="2" />
        {renderPetals(16, throatPetal, "currentColor")}
        <circle cx="50" cy="50" r="25" fill="#ffffff" />
        <polygon points="50,72 26,32 74,32" fill="currentColor" />
        <circle cx="50" cy="46" r="12" fill="#bae6fd" />
      </svg>
    ),
  },
  {
    id: "heart",
    name: "Cardíaco",
    color: "#22c55e", // Verde
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {renderPetals(12, heartPetal, "currentColor")}
        <circle cx="50" cy="50" r="25" fill="#ffffff" />
        {/* Hexagrama (Estrela de David) */}
        <polygon points="50,22 26,64 74,64" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="50,78 26,36 74,36" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "solar",
    name: "Plexo Solar",
    color: "#eab308", // Amarelo Ouro
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {renderPetals(10, solarPetal, "currentColor")}
        <circle cx="50" cy="50" r="27" fill="#ffffff" />
        <polygon points="50,70 30,35 70,35" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "sacral",
    name: "Sacral",
    color: "#f97316", // Laranja
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {renderPetals(6, sacralPetal, "currentColor")}
        <circle cx="50" cy="50" r="28" fill="#ffffff" />
        <circle cx="50" cy="50" r="24" fill="currentColor" />
        {/* Lua Crescente perfeita usando arcs SVG */}
        <path d="M 40 50 A 15 15 0 1 0 60 50 A 12 12 0 1 1 40 50 Z" fill="#ffffff" />
      </svg>
    ),
  },
  {
    id: "root",
    name: "Básico",
    color: "#ef4444", // Vermelho
    svg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
        {renderPetals(4, rootPetal, "currentColor")}
        <circle cx="50" cy="50" r="26" fill="#ffffff" />
        <rect x="32" y="32" width="36" height="36" fill="currentColor" />
        <polygon points="50,62 38,40 62,40" fill="#fca5a5" />
      </svg>
    ),
  },
];

export const ChakraPillar = () => {
  return (
    <div className="chakra-pillar" aria-hidden="true">
      {chakras.map((chakra) => (
        <div 
          key={chakra.id} 
          className="chakra-symbol-container"
          style={{ "--chakra-color": chakra.color } as React.CSSProperties}
        >
          <div className="chakra-symbol-glow"></div>
          <div className="chakra-symbol-icon">
            {chakra.svg}
          </div>
        </div>
      ))}
    </div>
  );
};
