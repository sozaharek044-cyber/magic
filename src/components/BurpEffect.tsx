import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BurpBubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

export const BurpEffect: React.FC = () => {
  const [bubbles, setBubbles] = useState<BurpBubble[]>([]);

  useEffect(() => {
    // Generate bursts of colorful stained-glass bubbles
    const colors = [
      '#f43f5e',
      '#ec4899',
      '#a855f7',
      '#38bdf8',
      '#facc15',
      '#34d399',
    ];
    const newBubbles: BurpBubble[] = [];
    for (let i = 0; i < 28; i++) {
      newBubbles.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 40 + (Math.random() - 0.5) * 40,
        size: 24 + Math.random() * 45,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
      });
    }
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
      {/* Comical Screen Tint Flash */}
      <motion.div
        className="absolute inset-0 bg-fuchsia-600/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.1, 0] }}
        transition={{ duration: 0.9 }}
      />

      {/* Giant Comic Burp Sound Word Bubble */}
      <motion.div
        initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
        animate={{
          scale: [0.2, 1.4, 1.1, 1.25, 0],
          rotate: [-15, 10, -5, 0],
          opacity: [0, 1, 1, 1, 0],
        }}
        transition={{ duration: 1.1, times: [0, 0.2, 0.5, 0.8, 1], ease: 'easeOut' }}
        className="relative z-30 flex flex-col items-center"
      >
        <div className="relative px-8 py-4 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-amber-500 text-white font-black text-4xl sm:text-6xl tracking-wider shadow-[0_0_50px_rgba(236,72,153,0.8)] border-4 border-yellow-300 transform -rotate-6">
          <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            嗝~~~~！💥
          </span>
          <div className="text-xl sm:text-2xl text-yellow-200 text-center font-bold mt-1">
            (超辣大嗝！暂停 1 秒)
          </div>

          {/* Comic speech triangle pointer pointing down */}
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-16 border-x-transparent border-t-20 border-t-purple-600" />
        </div>
      </motion.div>

      {/* Spray of colorful soap bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{
            left: '50%',
            top: '48%',
            scale: 0.1,
            opacity: 0.9,
          }}
          animate={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            scale: [0.2, 1.2, 0],
            opacity: [0.9, 0.9, 0],
          }}
          transition={{
            duration: 0.9 + Math.random() * 0.4,
            delay: b.delay,
            ease: 'easeOut',
          }}
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color,
            boxShadow: `0 0 15px ${b.color}, inset 0 0 10px rgba(255,255,255,0.8)`,
          }}
          className="absolute rounded-full border border-white/70 backdrop-blur-xs flex items-center justify-center"
        >
          {/* Bubble specular highlight */}
          <div className="w-1/3 h-1/3 rounded-full bg-white/80 -translate-x-1 -translate-y-1" />
        </motion.div>
      ))}
    </div>
  );
};
