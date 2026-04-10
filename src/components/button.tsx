import { type ButtonHTMLAttributes } from "react";

/*
  Componente Button — Sistema de Design Universo de Luz
  Variantes:
    primary   → gradiente indigo → violet → fuchsia + glow
    secondary → branco sólido com texto escuro
    tertiary  → gradiente outline horizontal + glow sutil
    ghost     → só texto, sem fundo
*/

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
}

const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070f] disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
    sm: "px-5 py-1.5 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
};

const variants: Record<Variant, { className: string; style?: React.CSSProperties }> = {
    primary: {
        className: "ring-1 ring-inset ring-white/40 hover:scale-105 hover:brightness-110",
        style: {
            background: "linear-gradient(to top, #a5b4fc, #7c3aed, #6d28d9)",
            color: "#0c0720",
            boxShadow: "0 0 40px -5px rgba(139,92,246,0.6)",
        },
    },
    secondary: {
        className: "bg-white text-black hover:bg-neutral-200",
    },
    tertiary: {
        className: "border-t border-white/20 text-white hover:brightness-110",
        style: {
            background: "linear-gradient(90deg, #4f46e5, #7c3aed, #a21caf)",
            boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
        },
    },
    ghost: {
        className: "text-neutral-400 hover:text-white",
    },
};

export function Button({
    variant = "primary",
    size = "md",
    className = "",
    style,
    children,
    ...props
}: ButtonProps) {
    const v = variants[variant];
    return (
        <button
            className={[base, sizes[size], v.className, className].join(" ")}
            style={{ ...v.style, ...style }}
            {...props}
        >
            {children}
        </button>
    );
}