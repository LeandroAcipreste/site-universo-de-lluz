import type { CSSProperties } from "react";

/** Gradiente dos CTAs e da navegação principal (cyan → azul → roxo) */
export const BTN_PRIMARY: CSSProperties = {
  background: "linear-gradient(135deg, #F8F9FA 0%, #DDE0E3 20%, #9BA1A6 60%, #5B6166 100%)",
  boxShadow: "0 4px 15px -3px rgba(155, 161, 166, 0.3)",
  color: "#050505", // Elegant dark tone for premium readability
  fontWeight: 600,
};
