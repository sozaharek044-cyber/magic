import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/audio';
import { StartScreenScenery } from './StartScreenScenery';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleClickStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    sound.playBellDing();

    // Smooth transition: plays the crisp bell "Ding!" and lets the scene disperse gracefully
    setTimeout(() => {
      onStart();
    }, 450);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between px-3 sm:px-8 py-5 sm:py-7 select-none overflow-hidden">
      {/* 1. Rich Background Fantasy Kitchen Scenery (绚丽星空城堡、水晶吊灯、极光) */}
      <StartScreenScenery />

      {/* 2. Top Header Badge: 疯狂主厨的魔法料理吧台 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-30 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/85 border-2 border-cyan-400/50 text-cyan-200 text-xs sm:text-sm font-black shadow-[0_0_25px_rgba(56,189,248,0.4)] backdrop-blur-md"
      >
        <ChefHat className="w-4 h-4 text-amber-300 animate-bounce" />
        <span className="tracking-wide">疯狂主厨 · 3位顶级VIP食客上菜挑战</span>
        <span className="text-amber-300">✨</span>
      </motion.div>

      {/* 3. Left Side: Jelly Mouth Beast peeking cheerfully with a golden fork (果冻大嘴兽) */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [-3, 3, -3],
        }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-2 sm:left-6 md:left-12 bottom-12 sm:bottom-16 w-40 sm:w-56 md:w-68 pointer-events-none z-10 filter drop-shadow-[0_12px_30px_rgba(56,189,248,0.6)]"
      >
        <svg viewBox="0 0 220 220" className="w-full h-full">
          <defs>
            <linearGradient id="start-jelly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="horn-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Golden Fork held in left paw */}
          <g transform="translate(18, 110) rotate(-25)">
            <rect x="0" y="20" width="5" height="40" rx="2.5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M -6 12 L 11 12 L 9 22 L -4 22 Z" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="-3" y1="0" x2="-3" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="2.5" y1="0" x2="2.5" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="0" x2="8" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Rainbow Unicorn Horn */}
          <polygon points="110,12 98,55 122,55" fill="url(#horn-grad)" stroke="#ffffff" strokeWidth="2.5" />
          <path d="M 103 26 Q 110 30 117 24" stroke="#f43f5e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 105 40 Q 110 44 115 38" stroke="#38bdf8" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <circle cx="110" cy="10" r="4" fill="#ffffff" />

          {/* Jelly Body */}
          <path
            d="M 35 195 C 18 115, 50 56, 110 52 C 170 56, 202 115, 185 195 Z"
            fill="url(#start-jelly-grad)"
            stroke="#ffffff"
            strokeWidth="4"
          />

          {/* Jelly Inner Light Bubble Sheen */}
          <ellipse cx="75" cy="85" rx="18" ry="12" fill="#ffffff" opacity="0.4" transform="rotate(-30 75 85)" />

          {/* Rosy Blush */}
          <ellipse cx="58" cy="122" rx="12" ry="7" fill="#f43f5e" opacity="0.6" />
          <ellipse cx="162" cy="122" rx="12" ry="7" fill="#f43f5e" opacity="0.6" />

          {/* Big Cheerful Open Mouth */}
          <ellipse cx="110" cy="145" rx="38" ry="30" fill="#9f1239" stroke="#ffffff" strokeWidth="3" />
          {/* Tongue */}
          <ellipse cx="110" cy="156" rx="24" ry="12" fill="#fb7185" />
          {/* Two Cute White Teeth */}
          <rect x="96" y="122" width="9" height="8" rx="3" fill="#ffffff" />
          <rect x="115" y="122" width="9" height="8" rx="3" fill="#ffffff" />

          {/* Big Sparkly Eyes */}
          <ellipse cx="75" cy="110" rx="16" ry="20" fill="#0c4a6e" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="70" cy="104" r="6" fill="#ffffff" />
          <circle cx="80" cy="116" r="3" fill="#ffffff" />

          <ellipse cx="145" cy="110" rx="16" ry="20" fill="#0c4a6e" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="140" cy="104" r="6" fill="#ffffff" />
          <circle cx="150" cy="116" r="3" fill="#ffffff" />

          {/* Cute Paws Resting on Bar */}
          <ellipse cx="48" cy="188" rx="20" ry="14" fill="#bae6fd" stroke="#ffffff" strokeWidth="3" />
          <ellipse cx="172" cy="188" rx="20" ry="14" fill="#bae6fd" stroke="#ffffff" strokeWidth="3" />
        </svg>

        <div className="text-center font-black text-xs sm:text-sm text-cyan-200 bg-slate-950/85 px-3 py-1 rounded-full border border-cyan-400/60 shadow-lg -mt-3">
          VIP 01 · 果冻大嘴兽
        </div>
      </motion.div>

      {/* 4. Right Side: Crystal Chubby Dragon peeking with starry eyes (晶石小胖龙) */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          rotate: [3, -3, 3],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-2 sm:right-6 md:right-12 bottom-12 sm:bottom-16 w-40 sm:w-56 md:w-68 pointer-events-none z-10 filter drop-shadow-[0_12px_30px_rgba(99,102,241,0.6)]"
      >
        <svg viewBox="0 0 220 220" className="w-full h-full">
          <defs>
            <linearGradient id="start-dragon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
          </defs>

          {/* Golden Spoon held in right hand */}
          <g transform="translate(195, 120) rotate(25)">
            <rect x="0" y="20" width="5" height="40" rx="2.5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            <ellipse cx="2.5" cy="10" rx="9" ry="14" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            <ellipse cx="2.5" cy="10" rx="6" ry="10" fill="#fde047" />
          </g>

          {/* Multi-faceted Crystal Horn Cluster */}
          <polygon points="110,10 98,52 122,52" fill="#facc15" stroke="#ffffff" strokeWidth="2.5" />
          <polygon points="84,28 76,58 98,56" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
          <polygon points="136,28 122,56 144,58" fill="#c084fc" stroke="#ffffff" strokeWidth="2" />

          {/* Dragon Wings fluttering */}
          <path d="M 28 95 C 10 70, 30 50, 48 68 Z" fill="#a5b4fc" stroke="#ffffff" strokeWidth="2" />
          <path d="M 192 95 C 210 70, 190 50, 172 68 Z" fill="#a5b4fc" stroke="#ffffff" strokeWidth="2" />

          {/* Dragon Body */}
          <path
            d="M 40 195 C 28 120, 60 55, 110 52 C 160 55, 192 120, 180 195 Z"
            fill="url(#start-dragon-grad)"
            stroke="#ffffff"
            strokeWidth="4"
          />

          {/* Belly scales */}
          <path d="M 80 195 C 75 145, 145 145, 140 195 Z" fill="#c7d2fe" opacity="0.8" />
          <line x1="90" y1="160" x2="130" y2="160" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="175" x2="135" y2="175" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />

          {/* Star Eyes */}
          <circle cx="78" cy="108" r="16" fill="#1e1b4b" stroke="#ffffff" strokeWidth="2.5" />
          <polygon points="78,98 81,105 88,108 81,111 78,118 75,111 68,108 75,105" fill="#facc15" />
          <circle cx="82" cy="102" r="2.5" fill="#ffffff" />

          <circle cx="142" cy="108" r="16" fill="#1e1b4b" stroke="#ffffff" strokeWidth="2.5" />
          <polygon points="142,98 145,105 152,108 145,111 142,118 139,111 132,108 139,105" fill="#facc15" />
          <circle cx="146" cy="102" r="2.5" fill="#ffffff" />

          {/* Dragon Smile with Tiny Fangs */}
          <ellipse cx="110" cy="142" rx="28" ry="20" fill="#881337" stroke="#ffffff" strokeWidth="3" />
          <ellipse cx="110" cy="150" rx="16" ry="10" fill="#fb7185" />
          <polygon points="98,126 102,136 106,126" fill="#ffffff" />
          <polygon points="114,126 118,136 122,126" fill="#ffffff" />

          {/* Dragon Paws on Bar */}
          <ellipse cx="55" cy="188" rx="18" ry="12" fill="#a5b4fc" stroke="#ffffff" strokeWidth="2.5" />
          <ellipse cx="165" cy="188" rx="18" ry="12" fill="#a5b4fc" stroke="#ffffff" strokeWidth="2.5" />
        </svg>

        <div className="text-center font-black text-xs sm:text-sm text-indigo-200 bg-slate-950/85 px-3 py-1 rounded-full border border-indigo-400/60 shadow-lg -mt-3">
          VIP 02 · 晶石小胖龙
        </div>
      </motion.div>

      {/* 5. Top Right: Star Cloud Beast peeking in cloud halo (星空云朵兽) */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          x: [4, -4, 4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-4 sm:right-16 top-16 sm:top-20 w-28 sm:w-40 pointer-events-none z-10 hidden lg:block filter drop-shadow-[0_8px_25px_rgba(244,114,182,0.7)]"
      >
        <svg viewBox="0 0 160 140" className="w-full h-full">
          {/* Planet Ring */}
          <ellipse cx="80" cy="70" rx="72" ry="20" fill="none" stroke="#38bdf8" strokeWidth="3" transform="rotate(-15 80 70)" opacity="0.8" />

          {/* Antenna & Dangling Star */}
          <path d="M 80 40 Q 95 15 110 25" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
          <polygon points="110,25 112,30 117,30 113,33 115,38 110,35 105,38 107,33 103,30 108,30" fill="#fde047" />

          {/* Cloud Body */}
          <circle cx="50" cy="75" r="28" fill="#f472b6" stroke="#ffffff" strokeWidth="3" />
          <circle cx="80" cy="65" r="34" fill="#f472b6" stroke="#ffffff" strokeWidth="3" />
          <circle cx="110" cy="75" r="28" fill="#f472b6" stroke="#ffffff" strokeWidth="3" />

          {/* Star Eyes */}
          <ellipse cx="68" cy="68" rx="6" ry="8" fill="#1e1b4b" />
          <circle cx="66" cy="65" r="2.5" fill="#ffffff" />
          <ellipse cx="92" cy="68" rx="6" ry="8" fill="#1e1b4b" />
          <circle cx="90" cy="65" r="2.5" fill="#ffffff" />

          {/* Cute Cat Smile */}
          <path d="M 76 78 Q 80 82 84 78" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
        <div className="text-center font-black text-[11px] text-pink-200 bg-slate-950/80 px-2 py-0.5 rounded-full border border-pink-400/40 -mt-2">
          VIP 03 · 星空云朵兽
        </div>
      </motion.div>

      {/* 6. Center 3D Title & Floating Magic Utensils Section (立体大字标题) */}
      <div className="relative z-20 flex flex-col items-center justify-center my-auto px-2">
        {/* Floating Magic Utensil: Luminous Whisk (魔法打蛋器) */}
        <motion.div
          animate={{
            rotate: [-18, 18, -18],
            y: [-12, 12, -12],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-10 sm:-left-24 md:-left-36 -top-4 w-18 sm:w-26 h-26 filter drop-shadow-[0_0_25px_rgba(56,189,248,0.95)] pointer-events-none"
        >
          <svg viewBox="0 0 80 100" className="w-full h-full">
            {/* Whisk handle */}
            <rect x="36" y="52" width="8" height="42" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
            <circle cx="40" cy="94" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            {/* Whisk loops */}
            <ellipse cx="40" cy="28" rx="19" ry="26" fill="none" stroke="#67e8f9" strokeWidth="3" />
            <ellipse cx="40" cy="28" rx="11" ry="26" fill="none" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="40" y1="2" x2="40" y2="52" stroke="#ffffff" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* Floating Magic Utensil: Luminous Spatula with Star Pancake (魔法锅铲) */}
        <motion.div
          animate={{
            rotate: [18, -18, 18],
            y: [12, -12, 12],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-10 sm:-right-24 md:-right-36 -top-4 w-18 sm:w-26 h-26 filter drop-shadow-[0_0_25px_rgba(244,114,182,0.95)] pointer-events-none"
        >
          <svg viewBox="0 0 80 100" className="w-full h-full">
            {/* Spatula handle */}
            <rect x="36" y="52" width="8" height="42" rx="4" fill="#f472b6" stroke="#ffffff" strokeWidth="2" />
            <circle cx="40" cy="94" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            {/* Spatula blade */}
            <rect x="20" y="8" width="40" height="46" rx="6" fill="#fbcfe8" stroke="#ffffff" strokeWidth="2.5" />
            <line x1="28" y1="16" x2="28" y2="44" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="16" x2="40" y2="44" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="16" x2="52" y2="44" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
            {/* Little smiling pancake on spatula */}
            <circle cx="40" cy="-6" r="14" fill="#fde047" stroke="#ffffff" strokeWidth="2" />
            <circle cx="36" cy="-8" r="2" fill="#78350f" />
            <circle cx="44" cy="-8" r="2" fill="#78350f" />
            <path d="M 37 -3 Q 40 0 43 -3" stroke="#78350f" strokeWidth="1.5" fill="none" />
          </svg>
        </motion.div>

        {/* Main 3D Title Container */}
        <motion.div
          animate={
            isStarting
              ? { scale: 1.35, opacity: 0, filter: 'blur(16px)' }
              : { scale: [1, 1.025, 1] }
          }
          transition={
            isStarting
              ? { duration: 0.45 }
              : { scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }
          }
          className="flex flex-col items-center text-center relative"
        >
          {/* Luminous Cosmic Planetary Ring around Title */}
          <div className="absolute inset-x-[-22%] top-[46%] h-16 rounded-full border-4 border-amber-300/50 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent -rotate-6 pointer-events-none blur-[1px] shadow-[0_0_30px_rgba(251,191,36,0.6)]" />

          {/* Top Yellow 3D Word: "疯狂" with White Chef Hat */}
          <div className="relative flex items-center justify-center">
            {/* White Chef Hat perched over "疯狂" */}
            <motion.div
              animate={{ rotate: [-5, 5, -5], y: [-3, 3, -3] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-9 sm:-top-13 left-[42%] -translate-x-1/2 z-20 filter drop-shadow-[0_6px_15px_rgba(0,0,0,0.5)]"
            >
              <svg viewBox="0 0 70 60" className="w-14 h-12 sm:w-20 sm:h-16">
                <path
                  d="M 15 48 C 8 28, 20 12, 35 12 C 50 12, 62 28, 55 48 Z"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                />
                <circle cx="24" cy="20" r="12" fill="#ffffff" />
                <circle cx="35" cy="15" r="15" fill="#ffffff" />
                <circle cx="46" cy="20" r="12" fill="#ffffff" />
                {/* Hat Rim & Golden Star */}
                <rect x="16" y="46" width="38" height="8" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="35,46 36.5,49.5 40,49.5 37,52 38.5,55 35,53 31.5,55 33,52 30,49.5 33.5,49.5" fill="#facc15" />
              </svg>
            </motion.div>

            {/* Left Sparkling 3D Star */}
            <motion.span
              animate={{ rotate: [0, 180, 360], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-4xl sm:text-6xl text-yellow-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.95)] mr-2"
            >
              ⭐
            </motion.span>

            {/* 3D Bubble "疯狂" Text with Golden Jelly Glow */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-widest text-[#fef08a] drop-shadow-[0_8px_0_#d97706] [-webkit-text-stroke:4px_#ffffff] filter drop-shadow-[0_10px_25px_rgba(245,158,11,0.85)]">
              疯狂
            </h1>

            {/* Right Sparkling 3D Star */}
            <motion.span
              animate={{ rotate: [360, 180, 0], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="text-4xl sm:text-6xl text-yellow-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.95)] ml-2"
            >
              ⭐
            </motion.span>
          </div>

          {/* Bottom 3D Glazed Crystal Word: "魔法厨房" */}
          <div className="relative mt-[-8px] sm:mt-[-16px]">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#bae6fd] to-[#38bdf8] drop-shadow-[0_10px_0_#0284c7] [-webkit-text-stroke:4px_#ffffff] py-2 filter drop-shadow-[0_12px_30px_rgba(56,189,248,0.9)]">
              魔法厨房
            </h2>
          </div>

          {/* Food Previews Pill Strip (琉璃甜品预告) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 bg-slate-900/80 px-4 sm:px-6 py-1.5 rounded-full border border-white/20 shadow-xl backdrop-blur-md">
            <span className="text-xs sm:text-sm text-cyan-200 font-black">特色料理：</span>
            <span className="text-base sm:text-xl" title="萌脸布丁">🍮</span>
            <span className="text-base sm:text-xl" title="彩色甜甜圈">🍩</span>
            <span className="text-base sm:text-xl" title="宝石草莓">🍓</span>
            <span className="text-base sm:text-xl" title="绚丽钻石">💎</span>
            <span className="text-base sm:text-xl" title="萌脸果冻">🍧</span>
            <span className="text-xs sm:text-sm text-rose-400 font-bold ml-1">🚫 避开炸弹辣椒</span>
          </div>

          {/* Kid-Friendly Subtitle Description */}
          <p className="text-sm sm:text-lg text-cyan-100 font-bold max-w-xl mt-3 drop-shadow text-center">
            为吧台前的 <span className="text-amber-300 font-black">3 位顶级 VIP 食客</span> 投喂心仪美食！
            <br />
            <span className="text-emerald-300 font-black">向上轻划</span>上菜守护它的胃，遇到<span className="text-rose-400 font-black">危险食材</span>克制双手不动！
          </p>
        </motion.div>
      </div>

      {/* 7. GIANT GLOWING GOLDEN SERVICE BELL / CLOCHE "开始游戏" BUTTON (参考图三) */}
      <div className="relative z-30 flex flex-col items-center pb-2 sm:pb-6">
        {/* Radiant Pulsing Golden-Amber Aurora Glow */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 blur-2xl pointer-events-none"
        />

        {/* Golden Cloche Dome Serving Bell Button */}
        <motion.button
          onClick={handleClickStart}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          className="relative group cursor-pointer flex flex-col items-center justify-center focus:outline-none"
        >
          {/* Planetary Ring encircling the Golden Bell Plate */}
          <div className="absolute inset-x-[-28px] top-1/2 -translate-y-1/2 h-16 rounded-full border-4 border-yellow-300 bg-gradient-to-r from-yellow-300/40 via-amber-400/60 to-yellow-300/40 -rotate-6 pointer-events-none shadow-[0_0_25px_rgba(251,191,36,0.9)]" />

          {/* Cloche Top Sparkling Crystal Star Handle */}
          <div className="relative z-10 w-10 h-10 rounded-full bg-gradient-to-b from-yellow-100 to-amber-500 border-2 border-white flex items-center justify-center shadow-lg -mb-2.5">
            <span className="text-lg text-amber-950 font-black leading-none animate-pulse">★</span>
          </div>

          {/* Main Golden Dish Cloche Dome */}
          <div className="relative z-10 px-12 sm:px-20 py-4 sm:py-5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#b45309] border-4 border-white shadow-[0_14px_45px_rgba(245,158,11,0.9)] flex items-center gap-3">
            {/* Top Gloss Curve Reflection */}
            <div className="absolute top-1 inset-x-8 h-1/2 rounded-full bg-white/50 blur-[1px] pointer-events-none" />

            <span className="text-3xl sm:text-4xl md:text-5xl text-slate-950 font-black tracking-widest drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)]">
              开始游戏
            </span>

            <Sparkles className="w-8 h-8 text-amber-950 animate-spin" style={{ animationDuration: '3.5s' }} />
          </div>
        </motion.button>

        {/* Playful prompt below button */}
        <span className="text-xs sm:text-sm text-cyan-200 mt-3 font-black tracking-wider flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="text-base animate-bounce">🛎️</span>
          <span>拍击金色魔法餐盘，播放“叮！”声开席营业！</span>
        </span>
      </div>
    </div>
  );
};
