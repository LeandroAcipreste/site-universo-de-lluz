import type { CSSProperties } from "react";

/** Gradiente dos CTAs e da navegação principal (cyan → azul → roxo) */
export const BTN_PRIMARY: CSSProperties = {
  background: "linear-gradient(135deg, #e9d5ff, #a78bfa, #f0abfc)",
  boxShadow: "0 0 40px -5px rgba(139,92,246,0.5)",
  color: "#1e0b36", // Elegant deep purple for premium readability
  fontWeight: 600,
};
