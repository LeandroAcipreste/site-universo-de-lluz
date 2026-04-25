import { useMemo } from 'react';
import { motion } from 'motion/react';
import "./backgroundSnake.css";

const COLORS = ['#6d28d9', '#a21caf', '#7c3aed', '#4f46e5'];
const GRID_SIZE = 40;

interface SnakeProps {
  color: string;
  isHorizontal: boolean;
  startPos: number;
  duration: number;
  delay: number;
  size: number;
  reverse: boolean;
}

function Snake({ color, isHorizontal, startPos, duration, delay, size, reverse }: SnakeProps) {
  const gradientDirection = isHorizontal
    ? (reverse ? '270deg' : '90deg')
    : (reverse ? '360deg' : '180deg');

  const gradient = `linear-gradient(${gradientDirection}, transparent 0%, ${color} 40%, ${color} 60%, transparent 100%)`;

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
        width: isHorizontal ? size : 2,
        height: isHorizontal ? 2 : size,
        background: gradient,
        boxShadow: `0 0 15px 2px ${color}80, 0 0 4px 1px ${color}`,
        x: initial.x,
        y: initial.y,
        opacity: 0.9
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
