import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleClickStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    sound.playBellDing();

    // Smooth transition: plays the crisp bell "Ding!" and lets the title/elements disperse gracefully
    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-4 sm:px-8 py-6 sm:py-8 select-none overflow-hidden">
      {/* Dreamy Twilight Magic Kingdom & Starlit Sky (参考图三) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1638] via-[#1a2356] to-[#2e1d54] pointer-events-none" />

      {/* Floating Magic Palace & Clouds in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {/* Magic Palace Spire Silhouettes */}
        <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/25 via-indigo-600/15 to-transparent blur-2xl" />

        {/* Floating Pastel Rainbow Clouds */}
        <div className="absolute -top-10 -left-20 w-96 h-60 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -top-10 -right-20 w-96 h-60 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute bottom-20 inset-x-0 h-40 bg-purple-500/20 blur-3xl" />

        {/* Twinkling Magic Starlight */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 19) % 95}%`,
              top: `${(i * 13) % 70}%`,
              width: `${(i % 3) + 3}px`,
              height: `${(i % 3) + 3}px`,
              boxShadow: '0 0 10px rgba(255,255,255,0.9)',
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 2 + (i % 4) * 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Floating Crystal Chandeliers */}
        <div className="absolute top-6 left-12 opacity-50 hidden md:block">
          <div className="w-12 h-16 border-b-2 border-cyan-300 rounded-b-full flex items-end justify-center pb-1">
            <span className="text-xl text-yellow-300 animate-pulse">✨</span>
          </div>
        </div>
        <div className="absolute top-6 right-12 opacity-50 hidden md:block">
          <div className="w-12 h-16 border-b-2 border-cyan-300 rounded-b-full flex items-end justify-center pb-1">
            <span className="text-xl text-yellow-300 animate-pulse">✨</span>
          </div>
        </div>
      </div>

      {/* Side Beast Characters lurking cheerfully at the bar (参考图三) */}
      {/* Left: Jelly Mouth Beast peeking out */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          rotate: [-2, 2, -2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-2 sm:left-6 md:left-14 bottom-16 sm:bottom-20 w-36 sm:w-52 md:w-64 pointer-events-none z-10 opacity-90 filter drop-shadow-[0_10px_25px_rgba(56,189,248,0.5)]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Rainbow horn */}
          <polygon points="100,10 90,50 110,50" fill="#facc15" stroke="#fff" strokeWidth="2" />
          <path d="M 93 25 Q 100 28 107 23" stroke="#f43f5e" strokeWidth="3" fill="none" />
          <path d="M 95 38 Q 100 42 105 36" stroke="#38bdf8" strokeWidth="3" fill="none" />
          {/* Body */}
          <path d="M 30 180 C 15 110, 45 55, 100 50 C 155 55, 185 110, 170 180 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="3.5" />
          {/* Big open mouth */}
          <ellipse cx="100" cy="135" rx="34" ry="26" fill="#be123c" stroke="#fff" strokeWidth="2.5" />
          <ellipse cx="100" cy="144" rx="20" ry="10" fill="#fda4af" />
          <rect x="-8" y="-2" width="7" height="6" rx="2" fill="#fff" transform="translate(100, 114)" />
          <rect x="5" y="-2" width="7" height="6" rx="2" fill="#fff" transform="translate(100, 114)" />
          {/* Big cute eyes */}
          <ellipse cx="68" cy="102" rx="14" ry="18" fill="#082f49" stroke="#fff" strokeWidth="2" />
          <circle cx="64" cy="98" r="5" fill="#fff" />
          <ellipse cx="132" cy="102" rx="14" ry="18" fill="#082f49" stroke="#fff" strokeWidth="2" />
          <circle cx="128" cy="98" r="5" fill="#fff" />
          {/* Paws */}
          <ellipse cx="45" cy="175" rx="16" ry="12" fill="#bae6fd" stroke="#fff" strokeWidth="2.5" />
        </svg>
        <div className="text-center font-black text-xs sm:text-sm text-cyan-200 bg-slate-950/70 px-2 py-0.5 rounded-full border border-cyan-400/40 mt-[-10px]">
          果冻大嘴兽
        </div>
      </motion.div>

      {/* Right: Crystal Chubby Dragon smiling */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          rotate: [2, -2, 2],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-2 sm:right-6 md:right-14 bottom-16 sm:bottom-20 w-36 sm:w-52 md:w-64 pointer-events-none z-10 opacity-90 filter drop-shadow-[0_10px_25px_rgba(99,102,241,0.5)]"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Crystal Horns */}
          <polygon points="100,10 90,48 110,48" fill="#facc15" stroke="#fff" strokeWidth="2" />
          <polygon points="76,26 70,54 88,52" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
          <polygon points="124,26 112,52 130,54" fill="#c084fc" stroke="#fff" strokeWidth="1.5" />
          {/* Body */}
          <path d="M 35 180 C 25 115, 55 52, 100 50 C 145 52, 175 115, 165 180 Z" fill="#6366f1" stroke="#ffffff" strokeWidth="3.5" />
          {/* Star eyes */}
          <circle cx="70" cy="100" r="14" fill="#1e1b4b" stroke="#fff" strokeWidth="2" />
          <polygon points="70,92 72,98 78,100 72,102 70,108 68,102 62,100 68,98" fill="#facc15" />
          <circle cx="130" cy="100" r="14" fill="#1e1b4b" stroke="#fff" strokeWidth="2" />
          <polygon points="130,92 132,98 138,100 132,102 130,108 128,102 122,100 128,98" fill="#facc15" />
          {/* Smile mouth with fangs */}
          <ellipse cx="100" cy="132" rx="24" ry="18" fill="#881337" stroke="#fff" strokeWidth="2.5" />
          <polygon points="90,118 94,126 98,118" fill="#fff" />
          <polygon points="102,118 106,126 110,118" fill="#fff" />
        </svg>
        <div className="text-center font-black text-xs sm:text-sm text-indigo-200 bg-slate-950/70 px-2 py-0.5 rounded-full border border-indigo-400/40 mt-[-10px]">
          晶石小胖龙
        </div>
      </motion.div>

      {/* Top Header Tag: 疯狂主厨的魔法料理吧台 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-30 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-300/40 text-cyan-200 text-xs sm:text-sm font-black shadow-lg backdrop-blur-md"
      >
        <ChefHat className="w-4 h-4 text-amber-300" />
        <span>疯狂主厨 · 3位顶级VIP食客上菜挑战</span>
      </motion.div>

      {/* Center 3D Title Section (参考图三: 《疯狂魔法厨房》立体大字) */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto">
        {/* Surrounding Floating Magic Utensils (参考图三: 魔法打蛋器与魔法锅铲) */}
        {/* Left: Floating Luminous Magic Whisk (打蛋器) */}
        <motion.div
          animate={{
            rotate: [-15, 15, -15],
            y: [-10, 10, -10],
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-12 sm:-left-24 md:-left-36 top-0 w-16 sm:w-24 h-24 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.9)] pointer-events-none"
        >
          <svg viewBox="0 0 80 100" className="w-full h-full">
            {/* Whisk handle */}
            <rect x="36" y="55" width="8" height="40" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
            {/* Whisk loops */}
            <ellipse cx="40" cy="30" rx="18" ry="25" fill="none" stroke="#67e8f9" strokeWidth="2.5" />
            <ellipse cx="40" cy="30" rx="10" ry="25" fill="none" stroke="#67e8f9" strokeWidth="2" />
            <line x1="40" y1="5" x2="40" y2="55" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Right: Floating Luminous Magic Spatula (锅铲) */}
        <motion.div
          animate={{
            rotate: [15, -15, 15],
            y: [10, -10, 10],
          }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-12 sm:-right-24 md:-right-36 top-0 w-16 sm:w-24 h-24 filter drop-shadow-[0_0_20px_rgba(244,114,182,0.9)] pointer-events-none"
        >
          <svg viewBox="0 0 80 100" className="w-full h-full">
            {/* Spatula handle */}
            <rect x="36" y="55" width="8" height="40" rx="4" fill="#f472b6" stroke="#ffffff" strokeWidth="1.5" />
            {/* Spatula blade with slits */}
            <rect x="22" y="8" width="36" height="46" rx="6" fill="#fbcfe8" stroke="#ffffff" strokeWidth="2" />
            <line x1="30" y1="16" x2="30" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="40" y1="16" x2="40" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="16" x2="50" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Title Container: Disperses smoothly on tap */}
        <motion.div
          animate={
            isStarting
              ? { scale: 1.35, opacity: 0, filter: 'blur(16px)' }
              : { scale: [1, 1.025, 1] }
          }
          transition={
            isStarting
              ? { duration: 0.48 }
              : { scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }
          }
          className="flex flex-col items-center text-center relative"
        >
          {/* Cosmic Planetary Ring around Title */}
          <div className="absolute inset-x-[-20%] top-[45%] h-14 rounded-full border-4 border-amber-300/40 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -rotate-6 pointer-events-none blur-[1px]" />

          {/* Top Yellow 3D Word: "疯狂" with Chef Hat (参考图三) */}
          <div className="relative flex items-center justify-center">
            {/* White Chef Hat resting over "疯狂" */}
            <motion.div
              animate={{ rotate: [-4, 4, -4], y: [-2, 2, -2] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-7 sm:-top-11 left-[42%] -translate-x-1/2 z-20 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
            >
              <svg viewBox="0 0 60 50" className="w-12 h-10 sm:w-16 sm:h-14">
                <path
                  d="M 12 40 C 6 25, 16 12, 30 12 C 44 12, 54 25, 48 40 Z"
                  fill="#ffffff"
                  stroke="#e2e8f0"
                  strokeWidth="2"
                />
                <circle cx="20" cy="18" r="10" fill="#ffffff" />
                <circle cx="30" cy="14" r="12" fill="#ffffff" />
                <circle cx="40" cy="18" r="10" fill="#ffffff" />
                {/* Hat rim */}
                <rect x="14" y="38" width="32" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
              </svg>
            </motion.div>

            {/* Left & Right Star Sparkles */}
            <span className="text-3xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] mr-2">
              ⭐
            </span>

            {/* 3D Bubble "疯狂" Text */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-[#fef08a] drop-shadow-[0_6px_0_#d97706] [-webkit-text-stroke:3px_#ffffff]">
              疯狂
            </h1>

            <span className="text-3xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] ml-2">
              ⭐
            </span>
          </div>

          {/* Bottom 3D Glazed Word: "魔法厨房" (参考图三: 琉璃水蓝立体字) */}
          <div className="relative mt-[-4px] sm:mt-[-10px]">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#bae6fd] to-[#38bdf8] drop-shadow-[0_8px_0_#0369a1] [-webkit-text-stroke:3px_#ffffff] py-1">
              魔法厨房
            </h2>
          </div>

          {/* Subtitle Description */}
          <p className="text-sm sm:text-lg text-cyan-100 font-bold max-w-lg mt-3 drop-shadow text-center">
            为传送带后的 <span className="text-amber-300">3 位 VIP 奇异兽</span> 上菜！
            <br />
            <span className="text-emerald-300">向上轻划</span>投喂美味，遇到<span className="text-rose-400">危险食物</span>切勿触碰！
          </p>
        </motion.div>
      </div>

      {/* GIANT GLOWING SERVICE BELL / CLOCHE "开始游戏" BUTTON (参考图三) */}
      <div className="relative z-30 flex flex-col items-center pb-4 sm:pb-8">
        {/* Pulsing Luminous Golden Aura */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 blur-2xl opacity-60 pointer-events-none"
        />

        {/* Golden Cloche Dome Serving Bell Button (金色魔法餐盘/服务铃) */}
        <motion.button
          onClick={handleClickStart}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="relative group cursor-pointer flex flex-col items-center justify-center"
        >
          {/* Planetary Ring encircling the Golden Bell Plate (图三特征) */}
          <div className="absolute inset-x-[-24px] top-1/2 -translate-y-1/2 h-14 rounded-full border-4 border-yellow-300/80 bg-gradient-to-r from-yellow-300/30 via-amber-400/50 to-yellow-300/30 -rotate-6 pointer-events-none shadow-[0_0_20px_rgba(251,191,36,0.8)]" />

          {/* Cloche Top Star Handle */}
          <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-b from-yellow-200 to-amber-500 border-2 border-white flex items-center justify-center shadow-lg -mb-2">
            <span className="text-base text-yellow-900 font-black leading-none">★</span>
          </div>

          {/* Main Golden Dish Cloche Dome */}
          <div className="relative z-10 px-12 sm:px-18 py-4 sm:py-5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#b45309] border-4 border-white shadow-[0_12px_40px_rgba(245,158,11,0.85)] flex items-center gap-3 active:shadow-none">
            {/* Gloss Reflection */}
            <div className="absolute top-1 inset-x-6 h-1/2 rounded-full bg-white/45 blur-[1px] pointer-events-none" />

            <span className="text-3xl sm:text-4xl text-slate-950 font-black tracking-widest drop-shadow">
              开始游戏
            </span>

            <Sparkles className="w-7 h-7 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </motion.button>

        {/* Playful prompt below button */}
        <span className="text-xs sm:text-sm text-cyan-200/90 mt-3 font-black tracking-wider flex items-center gap-1.5 drop-shadow">
          <span>🛎️</span>
          <span>拍击魔法餐盘，播放“叮！”声开席营业！</span>
        </span>
      </div>
    </div>
  );
};
