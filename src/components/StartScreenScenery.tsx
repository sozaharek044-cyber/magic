import React from 'react';
import { motion } from 'motion/react';

export const StartScreenScenery: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Deep Cosmic Nebula Gradient with Radiant Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f2c] via-[#151a4a] to-[#2b104a]" />

      {/* 2. Vibrant Aurora Borealis Ribbons (绚丽极光幕布) */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen filter blur-3xl">
        <motion.div
          animate={{
            x: [-40, 40, -40],
            scaleY: [0.9, 1.15, 0.9],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[600px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-400 via-teal-300 to-indigo-500"
        />
        <motion.div
          animate={{
            x: [40, -40, 40],
            scaleY: [1.1, 0.85, 1.1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-10 -right-20 w-[550px] h-[520px] rounded-full bg-gradient-to-bl from-pink-500 via-purple-400 to-amber-300"
        />
        <motion.div
          animate={{
            y: [-30, 30, -30],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[700px] h-[350px] rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-400"
        />
      </div>

      {/* 3. Fantasy Magic Castle Spire Silhouettes & Illuminated Arched Windows */}
      <div className="absolute top-0 inset-x-0 h-80 opacity-35 flex justify-between px-8 sm:px-16 pointer-events-none">
        {/* Left Castle Spires */}
        <div className="relative w-40 sm:w-56 h-full flex items-end">
          <svg viewBox="0 0 160 220" className="w-full h-full">
            <defs>
              <linearGradient id="castle-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Towers */}
            <polygon points="30,10 10,65 50,65" fill="url(#castle-grad)" />
            <rect x="15" y="65" width="30" height="150" fill="#1e1b4b" />
            <polygon points="100,25 75,80 125,80" fill="url(#castle-grad)" />
            <rect x="80" y="80" width="40" height="135" fill="#1e1b4b" />
            {/* Glowing stained windows */}
            <path d="M 24 100 A 6 6 0 0 1 36 100 L 36 125 L 24 125 Z" fill="#fef08a" opacity="0.85" />
            <path d="M 94 110 A 7 7 0 0 1 106 110 L 106 140 L 94 140 Z" fill="#67e8f9" opacity="0.9" />
          </svg>
        </div>

        {/* Right Castle Spires */}
        <div className="relative w-40 sm:w-56 h-full flex items-end justify-end">
          <svg viewBox="0 0 160 220" className="w-full h-full">
            {/* Towers */}
            <polygon points="70,18 45,75 95,75" fill="url(#castle-grad)" />
            <rect x="50" y="75" width="40" height="140" fill="#1e1b4b" />
            <polygon points="135,30 115,85 155,85" fill="url(#castle-grad)" />
            <rect x="120" y="85" width="30" height="130" fill="#1e1b4b" />
            {/* Glowing stained windows */}
            <path d="M 64 105 A 6 6 0 0 1 76 105 L 76 135 L 64 135 Z" fill="#f472b6" opacity="0.85" />
            <path d="M 130 115 A 5 5 0 0 1 140 115 L 140 135 L 130 135 Z" fill="#fef08a" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* 4. Hanging Ornate Crystal Chandeliers (华丽水晶吊灯与烛光) */}
      <div className="absolute top-0 inset-x-0 flex justify-between px-12 sm:px-24 pointer-events-none">
        {/* Left Chandelier */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 sm:w-28 origin-top"
        >
          <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]">
            <line x1="50" y1="0" x2="50" y2="45" stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 20 50 Q 50 75 80 50" fill="none" stroke="#facc15" strokeWidth="2.5" />
            <path d="M 32 50 Q 50 65 68 50" fill="none" stroke="#facc15" strokeWidth="2" />
            {/* Candles & Flames */}
            <rect x="22" y="38" width="6" height="12" fill="#fff" rx="2" />
            <ellipse cx="25" cy="33" rx="4" ry="7" fill="#fbbf24" />
            <rect x="47" y="34" width="6" height="14" fill="#fff" rx="2" />
            <ellipse cx="50" cy="28" rx="5" ry="8" fill="#fde047" />
            <rect x="72" y="38" width="6" height="12" fill="#fff" rx="2" />
            <ellipse cx="75" cy="33" rx="4" ry="7" fill="#fbbf24" />
            {/* Hanging crystal prisms */}
            <polygon points="25,60 21,72 25,80 29,72" fill="#38bdf8" opacity="0.9" />
            <polygon points="50,75 45,92 50,102 55,92" fill="#e0e7ff" opacity="0.95" />
            <polygon points="75,60 71,72 75,80 79,72" fill="#38bdf8" opacity="0.9" />
          </svg>
        </motion.div>

        {/* Right Chandelier */}
        <motion.div
          animate={{ rotate: [2, -2, 2] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 sm:w-28 origin-top"
        >
          <svg viewBox="0 0 100 130" className="w-full h-full filter drop-shadow-[0_0_12px_rgba(253,224,71,0.6)]">
            <line x1="50" y1="0" x2="50" y2="45" stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />
            <path d="M 20 50 Q 50 75 80 50" fill="none" stroke="#facc15" strokeWidth="2.5" />
            <path d="M 32 50 Q 50 65 68 50" fill="none" stroke="#facc15" strokeWidth="2" />
            {/* Candles & Flames */}
            <rect x="22" y="38" width="6" height="12" fill="#fff" rx="2" />
            <ellipse cx="25" cy="33" rx="4" ry="7" fill="#fbbf24" />
            <rect x="47" y="34" width="6" height="14" fill="#fff" rx="2" />
            <ellipse cx="50" cy="28" rx="5" ry="8" fill="#fde047" />
            <rect x="72" y="38" width="6" height="12" fill="#fff" rx="2" />
            <ellipse cx="75" cy="33" rx="4" ry="7" fill="#fbbf24" />
            {/* Hanging crystal prisms */}
            <polygon points="25,60 21,72 25,80 29,72" fill="#f472b6" opacity="0.9" />
            <polygon points="50,75 45,92 50,102 55,92" fill="#e0e7ff" opacity="0.95" />
            <polygon points="75,60 71,72 75,80 79,72" fill="#f472b6" opacity="0.9" />
          </svg>
        </motion.div>
      </div>

      {/* 5. Bubbling Magic Cauldron on the Left Side (咕噜咕噜冒彩泡的魔法锅) */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-6 sm:left-14 bottom-24 sm:bottom-28 w-24 sm:w-32 h-28 pointer-events-none z-10 hidden sm:block filter drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]"
      >
        <svg viewBox="0 0 100 110" className="w-full h-full">
          <defs>
            <linearGradient id="soup-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          {/* Steam swirls */}
          <path d="M 40 30 Q 30 18 45 10" stroke="#fbcfe8" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M 60 28 Q 70 16 55 8" stroke="#a5f3fc" strokeWidth="3" fill="none" opacity="0.7" strokeLinecap="round" />
          {/* Pot handles */}
          <circle cx="12" cy="65" r="10" fill="none" stroke="#facc15" strokeWidth="4" />
          <circle cx="88" cy="65" r="10" fill="none" stroke="#facc15" strokeWidth="4" />
          {/* Cauldron Belly */}
          <ellipse cx="50" cy="72" rx="38" ry="32" fill="#1e1b4b" stroke="#facc15" strokeWidth="3" />
          {/* Pot Rim */}
          <ellipse cx="50" cy="46" rx="34" ry="10" fill="#312e81" stroke="#facc15" strokeWidth="3" />
          {/* Glowing Soup */}
          <ellipse cx="50" cy="46" rx="28" ry="7" fill="url(#soup-grad)" />
          {/* Soup Bubbles */}
          <circle cx="42" cy="45" r="4" fill="#ffffff" opacity="0.8" />
          <circle cx="58" cy="44" r="3" fill="#ffffff" opacity="0.8" />
          {/* Star Emblems */}
          <polygon points="50,68 53,74 60,74 54,78 57,84 50,80 43,84 46,78 40,74 47,74" fill="#facc15" />
        </svg>
      </motion.div>

      {/* 6. Floating Culinary Sweets & Gems around the Scene (甜品与宝石在空中漂浮) */}
      {/* Floating Rainbow Donut */}
      <motion.div
        animate={{
          y: [-12, 12, -12],
          rotate: [-15, 15, -15],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-28 left-[18%] w-14 sm:w-18 h-14 sm:h-18 filter drop-shadow-[0_0_15px_rgba(244,114,182,0.8)] hidden md:block"
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle cx="40" cy="40" r="32" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 14 38 C 14 20, 66 20, 66 38 C 66 58, 14 58, 14 38 Z" fill="#ec4899" />
          <circle cx="40" cy="40" r="12" fill="#0f172a" />
          <rect x="26" y="24" width="6" height="3" rx="1.5" fill="#fef08a" transform="rotate(25 26 24)" />
          <rect x="46" y="22" width="6" height="3" rx="1.5" fill="#38bdf8" transform="rotate(-30 46 22)" />
          <rect x="22" y="44" width="6" height="3" rx="1.5" fill="#4ade80" transform="rotate(45 22 44)" />
          <rect x="52" y="42" width="6" height="3" rx="1.5" fill="#fde047" transform="rotate(15 52 42)" />
        </svg>
      </motion.div>

      {/* Floating Gem Strawberry */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [12, -12, 12],
        }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-[18%] w-12 sm:w-16 h-12 sm:h-16 filter drop-shadow-[0_0_15px_rgba(244,63,94,0.8)] hidden md:block"
      >
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <path d="M 40 18 C 60 18, 68 38, 54 64 C 46 76, 34 76, 26 64 C 12 38, 20 18, 40 18 Z" fill="#f43f5e" stroke="#fff" strokeWidth="2.5" />
          <polygon points="40,6 46,18 40,24 34,18" fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
          <polygon points="26,10 36,20 28,24" fill="#16a34a" />
          <polygon points="54,10 44,20 52,24" fill="#16a34a" />
          <circle cx="32" cy="36" r="2.5" fill="#fef08a" />
          <circle cx="48" cy="34" r="2.5" fill="#fef08a" />
          <circle cx="38" cy="50" r="2.5" fill="#fef08a" />
        </svg>
      </motion.div>

      {/* 7. Twinkling Starlight & Magic Sparkles (繁星闪烁粒子阵列) */}
      {[
        { x: 8, y: 15, size: 4, dur: 2.2 },
        { x: 22, y: 28, size: 6, dur: 3.1 },
        { x: 38, y: 12, size: 5, dur: 2.7 },
        { x: 50, y: 22, size: 7, dur: 3.4 },
        { x: 64, y: 14, size: 5, dur: 2.9 },
        { x: 78, y: 25, size: 6, dur: 3.2 },
        { x: 92, y: 18, size: 4, dur: 2.5 },
        { x: 15, y: 45, size: 5, dur: 3.0 },
        { x: 85, y: 48, size: 6, dur: 3.3 },
        { x: 30, y: 65, size: 4, dur: 2.8 },
        { x: 70, y: 68, size: 5, dur: 3.5 },
      ].map((star, idx) => (
        <motion.div
          key={idx}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            scale: [0.6, 1.4, 0.6],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: star.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]" />
        </motion.div>
      ))}

      {/* 8. Polished Cooking Bar Counter at the Bottom (华丽魔法料理吧台) */}
      <div className="absolute bottom-0 inset-x-0 h-16 sm:h-20 bg-gradient-to-t from-[#090b1c] via-[#1a1c42] to-[#2c1e54] border-t-3 border-amber-400/70 shadow-[0_-10px_35px_rgba(251,191,36,0.3)] z-0">
        {/* Golden Constellation Inlay Ribbon */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-amber-300 to-transparent opacity-80" />
        {/* Counter Surface Sheen */}
        <div className="h-full w-full flex items-center justify-around px-8 opacity-40">
          <span className="text-xl text-cyan-300">✦</span>
          <span className="text-xl text-amber-300">★</span>
          <span className="text-xl text-rose-300">✦</span>
          <span className="text-xl text-amber-300">★</span>
          <span className="text-xl text-cyan-300">✦</span>
        </div>
      </div>
    </div>
  );
};
