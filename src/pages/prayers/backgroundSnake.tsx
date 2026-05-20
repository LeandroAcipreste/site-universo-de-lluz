import { useMemo } from 'react';
import { motion } from 'motion/react';
import "./backgroundSnake.css";

const COLORS = ['#F8F9FA', '#DDE0E3', '#9BA1A6', '#C0C4C7', '#FFFFFF'];
const GRID_SIZE = 40;

interface SnakeProps {
  isHorizontal: boolean;
  startPos: number;
  duration: number;
  delay: number;
  size: number;
  reverse: boolean;
}

function Snake({ isHorizontal, startPos, duration, delay, size, reverse }: SnakeProps) {
  // O gradiente desenha as bordas prateadas e o centro preto (só prata e o centro preto)
  const gradient = isHorizontal
    ? `linear-gradient(to bottom, #DDE0E3 0%, #DDE0E3 25%, #000000 25%, #000000 75%, #DDE0E3 75%, #DDE0E3 100%)`
    : `linear-gradient(to right, #DDE0E3 0%, #DDE0E3 25%, #000000 25%, #000000 75%, #DDE0E3 75%, #DDE0E3 100%)`;

  // A máscara garante o fade-out suave nas duas extremidades (cabeça/cauda da cobrinha)
  const mask = isHorizontal
    ? (reverse
        ? 'linear-gradient(270deg, transparent 0%, black 20%, black 80%, transparent 100%)'
        : 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)')
    : (reverse
        ? 'linear-gradient(360deg, transparent 0%, black 20%, black 80%, transparent 100%)'
        : 'linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)');

  const initial = {
    x: isHorizontal ? (reverse ? '100vw' : `-${size}px`) : `${startPos * GRID_SIZE}px`,
    y: isHorizontal ? `${startPos * GRID_SIZE}px` : (reverse ? '100vh' : `-${size}px`),
  };

  const animate = {
    x: isHorizontal ? (reverse ? `-${size}px` : '100vw') : initial.x,
    y: isHorizontal ? initial.y : (reverse ? `-${size}px` : '100vh'),
  };

  return (
    <motion.div
      className="snake-item"
      style={{
        width: isHorizontal ? size : 6,
        height: isHorizontal ? 6 : size,
        background: gradient,
        WebkitMaskImage: mask,
        maskImage: mask,
        boxShadow: `0 0 12px 1px rgba(255, 255, 255, 0.45)`,
        x: initial.x,
        y: initial.y,
        opacity: 0.85
      }}
      animate={{
        x: [initial.x, animate.x],
        y: [initial.y, animate.y]
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  );
}

export default function BackgroundSnake() {
  const snakes = useMemo(() => {
    const NUM_SNAKES = 30;
    const generated = [];

    const MAX_LINES = 50;

    for (let i = 0; i < NUM_SNAKES; i++) {
      const isHorizontal = Math.random() > 0.5;
      const reverse = Math.random() > 0.5;
      const startPos = Math.floor(Math.random() * MAX_LINES);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const duration = 25 + Math.random() * 25;
      const delay = Math.random() * 20;
      const size = 150 + Math.random() * 200;

      generated.push(
        <Snake
          key={i}
          isHorizontal={isHorizontal}
          reverse={reverse}
          startPos={startPos}
          color={color}
          duration={duration}
          delay={delay}
          size={size}
        />
      );
    }
    return generated;
  }, []);

  return (
    <div className="snake-bg">
      <div
        className="snake-bg__grid"
        style={{
          backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`
        }}
      />
      <div className="snake-bg__snakes">
        {snakes}
      </div>
    </div>
  );
}
