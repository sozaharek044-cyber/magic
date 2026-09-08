import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BeastId, BeastExpression } from '../types';

interface BeastDisplayProps {
  beastId: BeastId;
  expression: BeastExpression;
  stomachCount: number;
  maxStomach: number;
  isPaused: boolean;
}

export const BeastDisplay: React.FC<BeastDisplayProps> = ({
  beastId,
  expression,
  stomachCount,
  maxStomach,
}) => {
  const [blink, setBlink] = useState(false);

  // Periodic blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 180);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const fullnessRatio = Math.min(stomachCount / maxStomach, 1);

  const isHiccup = expression === 'hiccup';
  const isHappy = expression === 'happy';
  const isPhew = expression === 'phew';
  const isDizzy = expression === 'dizzy';
  const isFullBurst = expression === 'full_burst';

  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none">
      {/* Radiant Magic Aura behind Beast */}
      <motion.div
        className="absolute -inset-12 rounded-full blur-3xl opacity-70 pointer-events-none"
        animate={{
          scale: isHappy ? [1, 1.4, 1.25] : isHiccup ? [1, 1.35, 0.9] : [1, 1.15, 1],
          opacity: isHappy ? 0.95 : isHiccup ? 0.85 : 0.55,
          backgroundColor: isHiccup
            ? '#22c55e' // Sickly green glow on poisoning
            : isHappy
            ? '#facc15'
            : isPhew
            ? '#34d399'
            : beastId === 'jelly'
            ? '#38bdf8'
            : beastId === 'dragon'
            ? '#818cf8'
            : '#f472b6',
        }}
        transition={{
          duration: isHappy || isHiccup ? 0.35 : 3,
          repeat: isHappy || isHiccup ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Sparkles & Stars during Feed Success */}
      <AnimatePresence>
        {isHappy && (
          <div className="absolute -top-16 inset-x-0 flex justify-center pointer-events-none z-30">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.4, 0],
                  x: (i - 3.5) * 35,
                  y: -50 - Math.random() * 40,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.05 }}
                className="absolute text-2xl sm:text-3xl text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)]"
              >
                ⭐
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Relieved "好险" badge pop */}
      <AnimatePresence>
        {isPhew && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1.1, y: -48 }}
            exit={{ opacity: 0, scale: 0.8, y: -65 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 z-30 flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-400/50 backdrop-blur-md text-base"
          >
            <span className="text-xl">✨</span>
            <span>好险！监测成功，双手已克制</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Success Reaction Banner (参考图五: 投喂成功！眼睛冒星光 / 美味身体变色 / 太棒了全身闪耀) */}
      <AnimatePresence>
        {isHappy && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1.15, y: -52 }}
            exit={{ opacity: 0, scale: 0.9, y: -72 }}
            className="absolute top-0 z-30 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-slate-950 font-black shadow-xl shadow-amber-300/60 text-lg sm:text-xl tracking-wider border-2 border-white"
          >
            <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>
              ✨
            </span>
            <span>投喂成功！眼睛冒星光 饱食度上升！</span>
            <span className="text-2xl">😋</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Poison / Hiccup Reaction Banner (参考图五: 危险！中毒了！快停止上菜！) */}
      <AnimatePresence>
        {isHiccup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 0 }}
            animate={{ opacity: 1, scale: [0.9, 1.2, 1.1], y: -55 }}
            exit={{ opacity: 0, scale: 0.8, y: -70 }}
            className="absolute top-0 z-30 flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-lime-500 text-white font-black shadow-[0_0_30px_rgba(239,68,68,0.9)] text-lg sm:text-xl tracking-wider border-2 border-yellow-300 animate-pulse"
          >
            <span className="text-2xl">☠️</span>
            <span>危险！中毒了！快停止上菜！</span>
            <span className="text-2xl">💥</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Animated Beast Body Container */}
      <motion.div
        animate={
          isHiccup
            ? {
                x: [-16, 16, -10, 10, -5, 5, 0],
                y: [-8, 8, -5, 5, 0],
                scale: [1, 1.25, 0.95, 1.15, 1],
                filter: 'hue-rotate(95deg) saturate(2.4) drop-shadow(0 0 35px #22c55e)',
              }
            : isFullBurst
            ? {
                scale: [1, 1.4, 1.7],
                filter: 'brightness(2.2) drop-shadow(0 0 60px #ffffff)',
              }
            : isDizzy
            ? {
                rotate: [-8, 8, -8],
                y: [15, 20, 15],
                scale: 0.95,
                filter: 'grayscale(0.7) opacity(0.85)',
              }
            : isHappy
            ? {
                y: [-16, 0, -8, 0],
                scale: [1, 1.15, 1],
                filter: 'drop-shadow(0 0 35px #facc15)',
              }
            : {
                y: [-6, 6, -6],
                scale: [1 + fullnessRatio * 0.08, 1.03 + fullnessRatio * 0.08, 1 + fullnessRatio * 0.08],
              }
        }
        transition={{
          duration: isHiccup ? 0.65 : isHappy ? 0.75 : isDizzy ? 3 : 2.5,
          repeat: isHiccup || isHappy ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
      >
        {/* ================= BEAST A: 果冻大嘴兽 (A. Jelly Mouth Beast - 参考图一) ================= */}
        {/* 特点：大嘴巴、喜欢果冻食物、软萌治愈、彩虹螺旋独角、青蓝透光果冻身躯 */}
        {beastId === 'jelly' && (
          <svg viewBox="0 0 260 260" className="w-full h-full filter drop-shadow-[0_12px_40px_rgba(56,189,248,0.55)]">
            <defs>
              <linearGradient id="jelly-blue-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="80%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>

              {/* Rainbow Spiral Horn Gradients */}
              <linearGradient id="rainbow-horn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="25%" stopColor="#f472b6" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="75%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>

              <radialGradient id="jelly-mouth-inner" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="70%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>
            </defs>

            {/* Rainbow Spiral Unicorn Horn on Head */}
            <g transform="translate(130, 48)">
              <polygon points="0,-42 -12,2 12,2" fill="url(#rainbow-horn)" stroke="#ffffff" strokeWidth="2" />
              {/* Spiral Stripes on Horn */}
              <path d="M -9 -10 Q 0 -6 9 -12" stroke="#ffffff" strokeWidth="2.5" fill="none" />
              <path d="M -7 -22 Q 0 -18 7 -24" stroke="#ffffff" strokeWidth="2.5" fill="none" />
              <path d="M -4 -32 Q 0 -28 4 -34" stroke="#ffffff" strokeWidth="2" fill="none" />
              {/* Horn Tip Star Sparkle */}
              <polygon points="0,-48 2,-44 6,-44 3,-42 4,-38 0,-40 -4,-38 -3,-42 -6,-44 -2,-44" fill="#ffffff" />
            </g>

            {/* Back Left & Right Jelly Flippers/Ears */}
            <ellipse cx="44" cy="140" rx="16" ry="26" transform="rotate(-30 44 140)" fill="#7dd3fc" stroke="#fff" strokeWidth="2.5" />
            <ellipse cx="216" cy="140" rx="16" ry="26" transform="rotate(30 216 140)" fill="#7dd3fc" stroke="#fff" strokeWidth="2.5" />

            {/* Chubby Translucent Jelly Body */}
            <path
              d="M 50 180 C 35 120, 60 55, 130 50 C 200 55, 225 120, 210 180 C 198 225, 62 225, 50 180 Z"
              fill="url(#jelly-blue-body)"
              stroke="#ffffff"
              strokeWidth="4"
            />

            {/* Translucent Tummy Highlight & Digested Food Glow */}
            <ellipse
              cx="130"
              cy="188"
              rx={54 + fullnessRatio * 10}
              ry={32 + fullnessRatio * 8}
              fill="#e0f2fe"
              opacity="0.4"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Glowing Eaten Snacks in Belly */}
            {Array.from({ length: stomachCount }).map((_, idx) => {
              const offsets = [
                { x: -25, y: -4 },
                { x: 0, y: 6 },
                { x: 25, y: -4 },
                { x: -14, y: 12 },
                { x: 14, y: 12 },
              ];
              const off = offsets[idx % offsets.length];
              return (
                <circle
                  key={idx}
                  cx={130 + off.x}
                  cy={188 + off.y}
                  r="7"
                  fill="#facc15"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
              );
            })}

            {/* Front Little Paws resting on the counter ledge */}
            <ellipse cx="64" cy="205" rx="18" ry="12" fill="#bae6fd" stroke="#ffffff" strokeWidth="3" />
            <ellipse cx="196" cy="205" rx="18" ry="12" fill="#bae6fd" stroke="#ffffff" strokeWidth="3" />

            {/* Glossy Jelly Highlights */}
            <ellipse cx="80" cy="85" rx="10" ry="22" transform="rotate(-30 80 85)" fill="#ffffff" opacity="0.8" />
            <circle cx="95" cy="72" r="5" fill="#ffffff" opacity="0.9" />

            {/* BIG WATERY EYES with Starbursts */}
            {/* Left Eye */}
            <g transform="translate(88, 108)">
              {isHiccup ? (
                // Spiral dizzy eyes on poisoning (@_@)
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-12 0 Q 0 10 12 0" stroke="#0c4a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                // Bursting Star Pupil in Eye! (眼睛冒星光)
                <g>
                  <circle cx="0" cy="0" r="18" fill="#0c4a6e" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                // Normal Cute Watery Eye
                <g>
                  <ellipse cx="0" cy="0" rx="16" ry="20" fill="#082f49" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="13" ry="17" fill="#0284c7" />
                  <circle cx="-5" cy="-6" r="6" fill="#ffffff" />
                  <circle cx="5" cy="6" r="3" fill="#ffffff" />
                  <circle cx="3" cy="-3" r="1.5" fill="#bae6fd" />
                </g>
              )}
            </g>

            {/* Right Eye */}
            <g transform="translate(172, 108)">
              {isHiccup ? (
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-12 0 Q 0 10 12 0" stroke="#0c4a6e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#0c4a6e" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="16" ry="20" fill="#082f49" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="13" ry="17" fill="#0284c7" />
                  <circle cx="-5" cy="-6" r="6" fill="#ffffff" />
                  <circle cx="5" cy="6" r="3" fill="#ffffff" />
                  <circle cx="3" cy="-3" r="1.5" fill="#bae6fd" />
                </g>
              )}
            </g>

            {/* Rosy Pink Cheeks */}
            <circle cx="68" cy="132" r="10" fill="#f43f5e" opacity="0.65" filter="blur(2px)" />
            <circle cx="192" cy="132" r="10" fill="#f43f5e" opacity="0.65" filter="blur(2px)" />

            {/* GIANT OPEN CHEERFUL MOUTH (张着大嘴巴充满期待) */}
            <g transform="translate(130, 142)">
              {isHiccup ? (
                // Vomiting acid green foam mouth on hiccup/poison
                <g>
                  <ellipse cx="0" cy="0" rx="24" ry="22" fill="#14532d" stroke="#86efac" strokeWidth="3" />
                  {/* Toxic foam drops */}
                  <path d="M -16 6 Q 0 28 16 6" fill="#4ade80" />
                  <circle cx="-8" cy="12" r="4" fill="#22c55e" />
                  <circle cx="6" cy="16" r="5" fill="#86efac" />
                </g>
              ) : isHappy ? (
                // Ecstatic open mouth with big pink tongue
                <g>
                  <path d="M -34 -4 Q 0 42 34 -4 Q 0 6 -34 -4" fill="url(#jelly-mouth-inner)" stroke="#ffffff" strokeWidth="3" />
                  <ellipse cx="0" cy="14" rx="18" ry="10" fill="#fda4af" />
                  {/* Shiny top teeth */}
                  <rect x="-12" y="-4" width="8" height="6" rx="2" fill="#ffffff" />
                  <rect x="4" y="-4" width="8" height="6" rx="2" fill="#ffffff" />
                </g>
              ) : (
                // Giant round waiting mouth
                <g>
                  <ellipse cx="0" cy="0" rx="34" ry="26" fill="url(#jelly-mouth-inner)" stroke="#ffffff" strokeWidth="3.5" />
                  {/* Tongue */}
                  <ellipse cx="0" cy="12" rx="20" ry="10" fill="#fda4af" />
                  {/* White cute round teeth on bottom & top */}
                  <rect x="-14" y="-22" width="9" height="7" rx="3" fill="#ffffff" />
                  <rect x="5" y="-22" width="9" height="7" rx="3" fill="#ffffff" />
                  <rect x="-9" y="15" width="8" height="6" rx="3" fill="#ffffff" />
                </g>
              )}
            </g>
          </svg>
        )}

        {/* ================= BEAST B: 晶石小胖龙 (B. Crystal Chubby Dragon - 参考图一) ================= */}
        {/* 特点：水晶角、喜欢晶石食物、活泼好奇、蓝紫色水晶切面身躯、星芒瞳孔、小爪子搭在料理台前 */}
        {beastId === 'dragon' && (
          <svg viewBox="0 0 260 260" className="w-full h-full filter drop-shadow-[0_12px_45px_rgba(99,102,241,0.55)]">
            <defs>
              {/* Faceted Crystal Dragon Body Gradient */}
              <linearGradient id="crystal-dragon-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a5b4fc" />
                <stop offset="35%" stopColor="#6366f1" />
                <stop offset="70%" stopColor="#4338ca" />
                <stop offset="100%" stopColor="#312e81" />
              </linearGradient>

              {/* Golden Crown Crystal Horn */}
              <linearGradient id="gold-crystal" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>

              {/* Cyan & Violet Side Crystal Horns */}
              <linearGradient id="cyan-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <linearGradient id="purple-crystal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5d0fe" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>

            {/* Glowing Crystal Horn Clusters on Head (水晶角簇) */}
            {/* Center Golden Crystal Horn */}
            <polygon points="130,16 118,54 142,54" fill="url(#gold-crystal)" stroke="#ffffff" strokeWidth="2" />
            <polygon points="130,16 125,54 135,54" fill="#ffffff" opacity="0.4" />

            {/* Left Cyan & Purple Crystal Spikes */}
            <polygon points="102,28 92,58 114,58" fill="url(#cyan-crystal)" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="76,46 70,72 90,70" fill="url(#purple-crystal)" stroke="#ffffff" strokeWidth="1.5" />

            {/* Right Cyan & Purple Crystal Spikes */}
            <polygon points="158,28 146,58 168,58" fill="url(#cyan-crystal)" stroke="#ffffff" strokeWidth="1.5" />
            <polygon points="184,46 170,70 190,72" fill="url(#purple-crystal)" stroke="#ffffff" strokeWidth="1.5" />

            {/* Dragon Crystal Wings on sides */}
            <path
              d="M 45 125 C 10 90, 16 55, 48 72 C 38 90, 42 110, 45 125 Z"
              fill="url(#cyan-crystal)"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.85"
            />
            <path
              d="M 215 125 C 250 90, 244 55, 212 72 C 222 90, 218 110, 215 125 Z"
              fill="url(#cyan-crystal)"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Chubby Dragon Faceted Body */}
            <path
              d="M 55 175 C 45 110, 75 56, 130 54 C 185 56, 215 110, 205 175 C 196 220, 64 220, 55 175 Z"
              fill="url(#crystal-dragon-body)"
              stroke="#ffffff"
              strokeWidth="4"
            />

            {/* Geometric Crystal Facet Lines Across Body */}
            <polygon points="130,54 90,95 130,120 170,95" fill="#818cf8" opacity="0.35" stroke="#ffffff" strokeWidth="1" />
            <polygon points="90,95 55,140 100,165 130,120" fill="#6366f1" opacity="0.25" stroke="#ffffff" strokeWidth="1" />
            <polygon points="170,95 130,120 160,165 205,140" fill="#a855f7" opacity="0.3" stroke="#ffffff" strokeWidth="1" />

            {/* Belly Glowing Opal Shell */}
            <ellipse cx="130" cy="180" rx={48 + fullnessRatio * 10} ry={32 + fullnessRatio * 8} fill="#c7d2fe" opacity="0.45" stroke="#ffffff" strokeWidth="2" />

            {/* Little Front Dragon Claws resting on the counter */}
            <ellipse cx="70" cy="204" rx="16" ry="12" fill="#e0e7ff" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="60,212 62,204 66,212" fill="#ffffff" />
            <polygon points="67,214 70,204 73,214" fill="#ffffff" />
            <polygon points="74,212 77,204 80,212" fill="#ffffff" />

            <ellipse cx="190" cy="204" rx="16" ry="12" fill="#e0e7ff" stroke="#ffffff" strokeWidth="2.5" />
            <polygon points="180,212 183,204 186,212" fill="#ffffff" />
            <polygon points="187,214 190,204 193,214" fill="#ffffff" />
            <polygon points="194,212 197,204 200,212" fill="#ffffff" />

            {/* BIG STARRY DRAGON EYES (眼睛里有四角星芒) */}
            {/* Left Eye */}
            <g transform="translate(94, 105)">
              {isHiccup ? (
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-10 0 Q 0 8 10 0" stroke="#1e1b4b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                // 4-point Golden Star Pupil (晶石龙标志性星芒瞳孔)
                <g>
                  <ellipse cx="0" cy="0" rx="15" ry="18" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="12" ry="15" fill="#312e81" />
                  <polygon points="0,-9 2.5,-2.5 9,0 2.5,2.5 0,9 -2.5,2.5 -9,0 -2.5,-2.5" fill="#facc15" stroke="#fff" strokeWidth="1" />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Right Eye */}
            <g transform="translate(166, 105)">
              {isHiccup ? (
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-10 0 Q 0 8 10 0" stroke="#1e1b4b" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="15" ry="18" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="12" ry="15" fill="#312e81" />
                  <polygon points="0,-9 2.5,-2.5 9,0 2.5,2.5 0,9 -2.5,2.5 -9,0 -2.5,-2.5" fill="#facc15" stroke="#fff" strokeWidth="1" />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Dragon Nostrils */}
            <circle cx="124" cy="120" r="2.5" fill="#312e81" />
            <circle cx="136" cy="120" r="2.5" fill="#312e81" />

            {/* Dragon Open Cheerful Mouth with cute fangs (大张着嘴巴等待投喂) */}
            <g transform="translate(130, 140)">
              {isHiccup ? (
                <g>
                  <ellipse cx="0" cy="0" rx="22" ry="20" fill="#14532d" stroke="#86efac" strokeWidth="3" />
                  <circle cx="-6" cy="10" r="4" fill="#4ade80" />
                  <circle cx="6" cy="12" r="5" fill="#86efac" />
                </g>
              ) : isHappy ? (
                <g>
                  <path d="M -30 -2 Q 0 38 30 -2 Z" fill="#881337" stroke="#ffffff" strokeWidth="3" />
                  <path d="M -14 14 Q 0 4 14 14 Q 0 24 -14 14" fill="#fb7185" />
                  {/* Two cute dragon fangs */}
                  <polygon points="-16,-2 -12,6 -8,-2" fill="#ffffff" />
                  <polygon points="8,-2 12,6 16,-2" fill="#ffffff" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="30" ry="24" fill="#881337" stroke="#ffffff" strokeWidth="3.5" />
                  <ellipse cx="0" cy="10" rx="18" ry="9" fill="#fb7185" />
                  {/* Fangs */}
                  <polygon points="-16,-18 -12,-9 -8,-18" fill="#ffffff" />
                  <polygon points="8,-18 12,-9 16,-18" fill="#ffffff" />
                  <polygon points="-10,16 -6,8 -2,16" fill="#ffffff" />
                  <polygon points="2,16 6,8 10,16" fill="#ffffff" />
                </g>
              )}
            </g>
          </svg>
        )}

        {/* ================= BEAST C: 星空云朵兽 (C. Star Cloud Beast - 参考图一) ================= */}
        {/* 特点：云朵身体、喜欢星空食物、温柔梦幻、弯弯月牙触角挂星星、土星光环、星空大眼睛 */}
        {beastId === 'cloud' && (
          <svg viewBox="0 0 260 260" className="w-full h-full filter drop-shadow-[0_12px_45px_rgba(244,114,182,0.55)]">
            <defs>
              {/* Pastel Marshmallow Cloud Gradient */}
              <linearGradient id="marshmallow-cloud" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#fce7f3" />
                <stop offset="70%" stopColor="#f3e8ff" />
                <stop offset="100%" stopColor="#e0e7ff" />
              </linearGradient>

              {/* Saturn Halo Ring Gradient */}
              <linearGradient id="saturn-ring" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Curling Lunar Antenna with Dangling Star on Top (头顶发光月牙触角) */}
            <g transform="translate(130, 48)">
              <path
                d="M 0 0 Q 15 -35 -10 -48 Q -28 -58 -18 -72 Q -8 -82 12 -68 Q 28 -56 22 -35"
                stroke="#c084fc"
                strokeWidth="4.5"
                fill="none"
                strokeLinecap="round"
              />
              {/* Glowing Dangling Golden Star */}
              <g transform="translate(12, -68)">
                <polygon
                  points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"
                  fill="#facc15"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="animate-spin"
                  style={{ transformOrigin: '0px 0px', animationDuration: '6s' }}
                />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>
            </g>

            {/* Glowing Golden Star Halo behind Cloud Head */}
            <ellipse cx="130" cy="95" rx="72" ry="24" fill="none" stroke="url(#saturn-ring)" strokeWidth="3" strokeDasharray="8 4" opacity="0.75" />

            {/* Multi-tier Fluffy Marshmallow Cloud Body */}
            <g fill="url(#marshmallow-cloud)" stroke="#ffffff" strokeWidth="4">
              <circle cx="85" cy="115" r="42" />
              <circle cx="175" cy="115" r="42" />
              <circle cx="130" cy="90" r="50" />
              <circle cx="78" cy="165" r="38" />
              <circle cx="182" cy="165" r="38" />
              <circle cx="130" cy="175" r="45" />
            </g>

            {/* Translucent Cosmic Belly showing galaxy swirls */}
            <ellipse
              cx="130"
              cy="165"
              rx={46 + fullnessRatio * 10}
              ry={30 + fullnessRatio * 8}
              fill="#e0e7ff"
              opacity="0.5"
              stroke="#ffffff"
              strokeWidth="2"
              strokeDasharray="5 3"
            />

            {/* Front Fluffy Cloud Paws on counter */}
            <ellipse cx="80" cy="202" rx="18" ry="12" fill="#ffffff" stroke="#fbcfe8" strokeWidth="3" />
            <ellipse cx="180" cy="202" rx="18" ry="12" fill="#ffffff" stroke="#fbcfe8" strokeWidth="3" />

            {/* Orbiting Planetary Ring in front */}
            <g transform="translate(130, 185) rotate(-12)">
              <ellipse cx="0" cy="0" rx="90" ry="26" fill="none" stroke="url(#saturn-ring)" strokeWidth="4" />
              {/* Mini planet on ring */}
              <circle cx="75" cy="12" r="7" fill="#f472b6" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="-65" cy="-14" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
            </g>

            {/* DREAMY STARRY GALAXY EYES */}
            {/* Left Eye */}
            <g transform="translate(95, 112)">
              {isHiccup ? (
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-10 0 Q 0 8 10 0" stroke="#4c1d95" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#312e81" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="15" ry="19" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="12" ry="16" fill="#6d28d9" />
                  <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#facc15" />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                  <circle cx="4" cy="5" r="2.5" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Right Eye */}
            <g transform="translate(165, 112)">
              {isHiccup ? (
                <g>
                  <circle cx="0" cy="0" r="16" fill="#14532d" stroke="#86efac" strokeWidth="2.5" />
                  <path d="M -8 0 A 8 8 0 0 1 8 0 A 6 6 0 0 1 -4 0 A 3 3 0 0 1 2 0" fill="none" stroke="#22c55e" strokeWidth="2.5" />
                </g>
              ) : blink || isDizzy ? (
                <path d="M-10 0 Q 0 8 10 0" stroke="#4c1d95" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              ) : isHappy ? (
                <g>
                  <circle cx="0" cy="0" r="18" fill="#312e81" stroke="#fff" strokeWidth="2.5" />
                  <polygon
                    points="0,-14 4,-4 14,0 4,4 0,14 -4,4 -14,0 -4,-4"
                    fill="#facc15"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="15" ry="19" fill="#1e1b4b" stroke="#fff" strokeWidth="2.5" />
                  <ellipse cx="0" cy="2" rx="12" ry="16" fill="#6d28d9" />
                  <polygon points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2" fill="#facc15" />
                  <circle cx="-4" cy="-5" r="4" fill="#ffffff" />
                  <circle cx="4" cy="5" r="2.5" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Soft Rosy Cloud Cheeks */}
            <circle cx="75" cy="132" r="12" fill="#f472b6" opacity="0.65" filter="blur(2px)" />
            <circle cx="185" cy="132" r="12" fill="#f472b6" opacity="0.65" filter="blur(2px)" />

            {/* Cloud Waiting Open Mouth */}
            <g transform="translate(130, 142)">
              {isHiccup ? (
                <g>
                  <ellipse cx="0" cy="0" rx="20" ry="18" fill="#14532d" stroke="#86efac" strokeWidth="3" />
                  <circle cx="0" cy="10" r="4" fill="#4ade80" />
                </g>
              ) : isHappy ? (
                <g>
                  <path d="M -26 -2 Q 0 34 26 -2 Z" fill="#4c1d95" stroke="#ffffff" strokeWidth="3" />
                  <ellipse cx="0" cy="10" rx="14" ry="7" fill="#f472b6" />
                </g>
              ) : (
                <g>
                  <ellipse cx="0" cy="0" rx="26" ry="20" fill="#4c1d95" stroke="#ffffff" strokeWidth="3" />
                  <ellipse cx="0" cy="8" rx="14" ry="7" fill="#f472b6" />
                </g>
              )}
            </g>
          </svg>
        )}
      </motion.div>
    </div>
  );
};
