import React from 'react';
import { GoFoodVariant, NoGoFoodVariant } from '../types';

interface FoodItemProps {
  type: 'fruit' | 'pepper';
  goVariant?: GoFoodVariant;
  noGoVariant?: NoGoFoodVariant;
  fruitVariant?: 0 | 1 | 2 | 3;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FoodItem: React.FC<FoodItemProps> = ({
  type,
  goVariant,
  noGoVariant,
  fruitVariant = 0,
  size = 'md',
  showLabel = false,
}) => {
  // Map legacy fruitVariant (0-3) to goVariant if not explicitly passed
  let activeGo = goVariant;
  if (!activeGo && type === 'fruit') {
    const defaultVariants: GoFoodVariant[] = [
      'pudding',
      'donut',
      'strawberry',
      'diamond',
      'jelly',
      'blueberry',
    ];
    activeGo = defaultVariants[fruitVariant % defaultVariants.length];
  }

  let activeNoGo = noGoVariant;
  if (!activeNoGo && type === 'pepper') {
    activeNoGo = 'exploding_chili';
  }

  const dimensionClasses =
    size === 'sm'
      ? 'w-14 h-14'
      : size === 'lg'
      ? 'w-24 h-24 sm:w-28 sm:h-28'
      : 'w-16 h-16 sm:w-20 sm:h-20';

  return (
    <div className="relative flex flex-col items-center select-none pointer-events-none">
      <div className={`relative ${dimensionClasses} flex items-center justify-center`}>
        {/* ======================= GO FOODS (6 种美味又治愈的常规食物) ======================= */}
        {type === 'fruit' && (
          <>
            {/* Ambient Glaze Aura */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-400/40 via-pink-400/40 to-cyan-400/40 blur-md pointer-events-none" />

            {/* 1. 布丁 (Pudding) - 焦糖琉璃布丁配红樱桃 */}
            {activeGo === 'pudding' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_16px_rgba(251,191,36,0.6)]">
                <defs>
                  <linearGradient id="pudding-body" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="60%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="caramel-top" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#b45309" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                  <radialGradient id="cherry-grad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#ff4d6d" />
                    <stop offset="60%" stopColor="#e11d48" />
                    <stop offset="100%" stopColor="#881337" />
                  </radialGradient>
                </defs>
                {/* Glass Saucer Plate */}
                <ellipse cx="40" cy="68" rx="34" ry="10" fill="#a5f3fc" opacity="0.5" stroke="#ffffff" strokeWidth="1.5" />
                <ellipse cx="40" cy="66" rx="28" ry="7" fill="#ffffff" opacity="0.3" />

                {/* Pudding Body */}
                <path
                  d="M 22 42 Q 20 62 18 64 Q 40 70 62 64 Q 60 62 58 42 Z"
                  fill="url(#pudding-body)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />

                {/* Caramel Sauce Top Layer dripping */}
                <ellipse cx="40" cy="42" rx="18" ry="7" fill="url(#caramel-top)" stroke="#ffffff" strokeWidth="1" />
                {/* Caramel drips */}
                <path d="M 24 43 Q 26 52 28 44 Q 35 55 40 45 Q 46 54 50 44 Q 56 50 56 43" fill="url(#caramel-top)" />

                {/* Whipped Cream Dollop */}
                <path
                  d="M 34 38 Q 32 30 40 28 Q 48 30 46 38 Q 44 42 40 42 Q 36 42 34 38 Z"
                  fill="#ffffff"
                  stroke="#ffe4e6"
                  strokeWidth="1.2"
                />

                {/* Glossy Cherry with stem */}
                <path d="M 40 28 Q 44 14 52 16" stroke="#16a34a" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="40" cy="28" r="6" fill="url(#cherry-grad)" stroke="#ffffff" strokeWidth="1" />
                <circle cx="38" cy="26" r="2" fill="#ffffff" opacity="0.9" />

                {/* Light Reflections */}
                <ellipse cx="26" cy="52" rx="3" ry="6" transform="rotate(-15 26 52)" fill="#ffffff" opacity="0.75" />
                <polygon points="40,56 42,60 46,60 43,63 44,67 40,64 36,67 37,63 34,60 38,60" fill="#ffffff" opacity="0.8" />
              </svg>
            )}

            {/* 2. 甜甜圈 (Donut) - 草莓糖霜彩色星芒甜甜圈 */}
            {activeGo === 'donut' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_18px_rgba(244,114,182,0.65)]">
                <defs>
                  <linearGradient id="donut-pastry" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="60%" stopColor="#fba359" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="strawberry-frosting" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbcfe8" />
                    <stop offset="40%" stopColor="#f472b6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                {/* Donut Dough */}
                <circle cx="40" cy="40" r="28" fill="url(#donut-pastry)" stroke="#ffffff" strokeWidth="2" />
                {/* Donut Hole */}
                <circle cx="40" cy="40" r="10" fill="#1e1b4b" opacity="0.9" stroke="#fed7aa" strokeWidth="2" />

                {/* Wavy Strawberry Frosting */}
                <path
                  d="M 18 36 C 16 22, 26 14, 40 14 C 54 14, 64 22, 62 36 C 63 42, 59 47, 57 43 C 54 39, 50 46, 48 42 C 45 38, 41 44, 38 41 C 35 44, 31 39, 29 45 C 26 49, 22 47, 20 42 C 17 40, 18 38, 18 36 Z"
                  fill="url(#strawberry-frosting)"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />

                {/* Inner Hole Frosting Trim */}
                <circle cx="40" cy="40" r="11" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Shiny Golden Stars on Frosting */}
                <polygon points="26,24 28,27 32,27 29,30 30,34 26,32 22,34 23,30 20,27 24,27" fill="#facc15" stroke="#fff" strokeWidth="0.8" />
                <polygon points="52,26 53,28 56,28 54,30 55,33 52,31 49,33 50,30 48,28 51,28" fill="#facc15" stroke="#fff" strokeWidth="0.8" />

                {/* Rainbow Sprinkles */}
                <rect x="36" y="19" width="6" height="2.5" rx="1.2" transform="rotate(25 36 19)" fill="#38bdf8" />
                <rect x="22" y="38" width="6" height="2.5" rx="1.2" transform="rotate(-30 22 38)" fill="#a855f7" />
                <rect x="56" y="38" width="6" height="2.5" rx="1.2" transform="rotate(40 56 38)" fill="#facc15" />
                <rect x="46" y="20" width="5" height="2.5" rx="1.2" transform="rotate(-15 46 20)" fill="#ffffff" />
                <rect x="40" y="25" width="5" height="2.2" rx="1" transform="rotate(60 40 25)" fill="#4ade80" />

                {/* Glossy Highlight */}
                <path d="M 28 20 C 33 17, 47 17, 52 20" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            )}

            {/* 3. 草莓 (Strawberry) - 璀璨红光宝石切割面草莓 */}
            {activeGo === 'strawberry' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_18px_rgba(244,63,94,0.7)]">
                <defs>
                  <radialGradient id="gem-strawberry" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ff708d" />
                    <stop offset="50%" stopColor="#f43f5e" />
                    <stop offset="85%" stopColor="#be123c" />
                    <stop offset="100%" stopColor="#881337" />
                  </radialGradient>
                </defs>
                {/* Gem Strawberry Body with Diamond Facets */}
                <path
                  d="M 40 18 L 58 32 L 54 55 L 40 72 L 26 55 L 22 32 Z"
                  fill="url(#gem-strawberry)"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Gem Facet Lines */}
                <polygon points="40,18 48,32 40,46 32,32" fill="#fda4af" opacity="0.7" stroke="#ffffff" strokeWidth="1" />
                <polygon points="48,32 58,32 54,48 40,46" fill="#fb7185" opacity="0.6" stroke="#ffffff" strokeWidth="1" />
                <polygon points="32,32 22,32 26,48 40,46" fill="#f43f5e" opacity="0.8" stroke="#ffffff" strokeWidth="1" />
                <polygon points="40,46 54,48 50,62 40,72" fill="#be123c" opacity="0.7" stroke="#ffffff" strokeWidth="1" />
                <polygon points="40,46 26,48 30,62 40,72" fill="#9f1239" opacity="0.8" stroke="#ffffff" strokeWidth="1" />

                {/* Golden Strawberry Seeds */}
                <polygon points="40,30 42,33 40,36 38,33" fill="#fef08a" stroke="#ffffff" strokeWidth="0.6" />
                <polygon points="50,40 52,43 50,46 48,43" fill="#fef08a" stroke="#ffffff" strokeWidth="0.6" />
                <polygon points="30,40 32,43 30,46 28,43" fill="#fef08a" stroke="#ffffff" strokeWidth="0.6" />
                <polygon points="40,55 42,58 40,61 38,58" fill="#fef08a" stroke="#ffffff" strokeWidth="0.6" />

                {/* Emerald Green Calyx Leaves */}
                <path d="M 40 20 L 32 10 L 37 18 L 40 7 L 43 18 L 48 10 Z" fill="#22c55e" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M 40 18 L 41 8 Q 43 5 45 6" stroke="#15803d" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Diamond Sparkle Stars */}
                <polygon points="28,26 29,29 32,29 30,31 31,34 28,32 25,34 26,31 24,29 27,29" fill="#ffffff" />
              </svg>
            )}

            {/* 4. 钻石 (Diamond) - 纯净绚丽折射彩钻晶石 */}
            {activeGo === 'diamond' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_20px_rgba(56,189,248,0.8)]">
                <defs>
                  <linearGradient id="diamond-top" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e0e7ff" />
                    <stop offset="50%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#fed7aa" />
                  </linearGradient>
                </defs>
                {/* Brilliant Cut Diamond Facets */}
                <polygon points="26,30 54,30 68,42 40,74 12,42" fill="#7dd3fc" stroke="#ffffff" strokeWidth="2" />

                {/* Table & Crown Facets */}
                <polygon points="26,30 54,30 48,42 32,42" fill="url(#diamond-top)" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="26,30 32,42 12,42" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="54,30 68,42 48,42" fill="#c084fc" opacity="0.8" stroke="#ffffff" strokeWidth="1.2" />

                {/* Pavilion Facets */}
                <polygon points="32,42 40,74 48,42" fill="#f472b6" opacity="0.75" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="12,42 40,74 32,42" fill="#0284c7" stroke="#ffffff" strokeWidth="1.2" />
                <polygon points="48,42 40,74 68,42" fill="#818cf8" stroke="#ffffff" strokeWidth="1.2" />

                {/* Sparkling Rainbow Glare */}
                <polygon points="40,24 42,28 46,28 43,30 44,34 40,32 36,34 37,30 34,28 38,28" fill="#ffffff" />
                <polygon points="58,36 59,38 62,38 60,40 61,43 58,41 55,43 56,40 54,38 57,38" fill="#ffffff" />
              </svg>
            )}

            {/* 5. 果冻 (Jelly) - 带小星星与颜文字的Q弹蓝光果冻 */}
            {activeGo === 'jelly' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_18px_rgba(56,189,248,0.7)]">
                <defs>
                  <radialGradient id="jelly-dome" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="45%" stopColor="#38bdf8" />
                    <stop offset="85%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                  </radialGradient>
                </defs>
                {/* Wobbly Jelly Tier Body */}
                <path
                  d="M 28 34 Q 16 52 14 62 Q 40 70 66 62 Q 64 52 52 34 Q 40 28 28 34 Z"
                  fill="url(#jelly-dome)"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Jelly Flutes / Ridges */}
                <path d="M 28 34 Q 24 50 22 62" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M 36 31 Q 34 50 34 64" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M 44 31 Q 46 50 46 64" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
                <path d="M 52 34 Q 56 50 58 62" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />

                {/* Golden Crown Star */}
                <polygon points="40,16 43,23 50,23 45,28 47,35 40,31 33,35 35,28 30,23 37,23" fill="#facc15" stroke="#ffffff" strokeWidth="1.2" />

                {/* Cute Anime Face on Jelly (· ‿ ·) */}
                <circle cx="34" cy="48" r="2.2" fill="#ffffff" />
                <circle cx="46" cy="48" r="2.2" fill="#ffffff" />
                <path d="M 38 52 Q 40 55 42 52" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="30" cy="50" r="2.5" fill="#f472b6" opacity="0.8" />
                <circle cx="50" cy="50" r="2.5" fill="#f472b6" opacity="0.8" />

                {/* Top Gloss */}
                <ellipse cx="26" cy="42" rx="3" ry="8" transform="rotate(-20 26 42)" fill="#ffffff" opacity="0.8" />
              </svg>
            )}

            {/* 6. 蓝莓 (Blueberry) - 饱满晶莹深蓝玻璃蓝莓配小花 */}
            {activeGo === 'blueberry' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_18px_rgba(99,102,241,0.7)]">
                <defs>
                  <radialGradient id="blueberry-grad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#c7d2fe" />
                    <stop offset="45%" stopColor="#6366f1" />
                    <stop offset="85%" stopColor="#3730a3" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                  </radialGradient>
                </defs>
                {/* Background Green Leaves */}
                <path d="M 28 28 Q 12 18 20 10 Q 28 14 28 28" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />
                <path d="M 52 28 Q 68 18 60 10 Q 52 14 52 28" fill="#22c55e" stroke="#ffffff" strokeWidth="1" />

                {/* Back Berries */}
                <circle cx="28" cy="40" r="15" fill="url(#blueberry-grad)" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx="52" cy="40" r="15" fill="url(#blueberry-grad)" stroke="#ffffff" strokeWidth="1.5" />

                {/* Front Main Berry */}
                <circle cx="40" cy="52" r="18" fill="url(#blueberry-grad)" stroke="#ffffff" strokeWidth="2" />
                {/* Berry Navel Star Crown */}
                <polygon points="40,48 42,51 45,51 43,53 44,56 40,54 36,56 37,53 35,51 38,51" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />

                {/* Delicate White Flower */}
                <g transform="translate(52, 28)">
                  {[0, 72, 144, 216, 288].map((angle, i) => (
                    <circle key={i} cx={Math.cos((angle * Math.PI) / 180) * 5} cy={Math.sin((angle * Math.PI) / 180) * 5} r="3" fill="#ffffff" />
                  ))}
                  <circle cx="0" cy="0" r="2.5" fill="#facc15" />
                </g>

                {/* Gloss highlights */}
                <ellipse cx="34" cy="45" rx="3" ry="6" transform="rotate(-25 34 45)" fill="#ffffff" opacity="0.8" />
                <ellipse cx="24" cy="35" rx="2.5" ry="4" transform="rotate(-25 24 35)" fill="#ffffff" opacity="0.8" />
                <ellipse cx="48" cy="35" rx="2.5" ry="4" transform="rotate(-25 48 35)" fill="#ffffff" opacity="0.8" />
              </svg>
            )}
          </>
        )}

        {/* ======================= NO-GO FOODS (2 种危险食物) ======================= */}
        {type === 'pepper' && (
          <>
            {/* 1. 爆炸辣椒 (Exploding Chili) - 燃烧烈火与恶魔面孔 */}
            {activeNoGo === 'exploding_chili' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_22px_rgba(239,68,68,0.85)]">
                <defs>
                  <linearGradient id="fire-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ea580c" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fef08a" />
                  </linearGradient>
                  <linearGradient id="chili-body" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fca5a5" />
                    <stop offset="35%" stopColor="#ef4444" />
                    <stop offset="85%" stopColor="#b91c1c" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                </defs>

                {/* Surrounding Dynamic Fire Flames */}
                <path
                  d="M 22 55 Q 12 35 24 25 Q 26 35 32 30 Q 34 15 46 12 Q 44 24 54 22 Q 68 25 66 42 Q 72 32 74 50 Q 64 68 40 70 Q 20 68 22 55 Z"
                  fill="url(#fire-flame)"
                  opacity="0.85"
                  className="animate-pulse"
                />

                {/* Curved Fiery Chili Pepper Body */}
                <path
                  d="M 52 28 C 62 44, 52 64, 32 64 C 20 64, 18 52, 26 44 C 36 34, 46 26, 52 28 Z"
                  fill="url(#chili-body)"
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Green Stem */}
                <path d="M 52 28 Q 58 18 64 16 Q 66 22 56 30" fill="#22c55e" stroke="#ffffff" strokeWidth="1.2" />

                {/* Angry Demon Eyes & Brows */}
                <path d="M 34 38 L 42 42 M 50 38 L 42 42" stroke="#7f1d1d" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="36" cy="42" rx="2.5" ry="3.5" fill="#fef08a" />
                <ellipse cx="48" cy="42" rx="2.5" ry="3.5" fill="#fef08a" />
                <circle cx="36" cy="42" r="1.5" fill="#7f1d1d" />
                <circle cx="48" cy="42" r="1.5" fill="#7f1d1d" />

                {/* Zigzag Sharp Teeth Grin */}
                <path d="M 34 50 L 37 47 L 40 50 L 43 47 L 46 50 L 49 47 L 51 50" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Hot Spark */}
                <polygon points="60,22 62,25 65,25 63,27 64,30 61,28 58,30 59,27 57,25 60,25" fill="#fef08a" />
              </svg>
            )}

            {/* 2. 臭袜子 (Stinky Sock) - 塞在软木塞玻璃罐里的臭袜子与恶臭绿烟 */}
            {activeNoGo === 'stinky_sock' && (
              <svg viewBox="0 0 80 80" className="w-full h-full filter drop-shadow-[0_6px_22px_rgba(34,197,94,0.85)]">
                <defs>
                  <linearGradient id="sock-green" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" />
                    <stop offset="50%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                  <radialGradient id="smog-green" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#86efac" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#22c55e" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#14532d" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Billowing Toxic Green Vapor & Bubbles */}
                <circle cx="20" cy="22" r="7" fill="url(#smog-green)" className="animate-pulse" />
                <circle cx="62" cy="20" r="8" fill="url(#smog-green)" className="animate-pulse" />
                <circle cx="16" cy="38" r="5" fill="#4ade80" opacity="0.7" />
                <circle cx="66" cy="42" r="6" fill="#4ade80" opacity="0.7" />
                <path d="M 22 18 Q 28 8 36 12 Q 32 20 40 16" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
                <path d="M 58 16 Q 52 8 46 14 Q 50 20 44 18" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />

                {/* Glass Bottle Body */}
                <rect x="24" y="28" width="32" height="42" rx="8" fill="#d1fae5" opacity="0.45" stroke="#ffffff" strokeWidth="2" />
                {/* Bottle Neck & Rim */}
                <rect x="30" y="22" width="20" height="6" rx="2" fill="#d1fae5" opacity="0.6" stroke="#ffffff" strokeWidth="1.5" />
                {/* Wooden Cork Stopper */}
                <polygon points="32,16 48,16 46,22 34,22" fill="#d97706" stroke="#ffffff" strokeWidth="1" />

                {/* Green Striped Stinky Sock inside Bottle */}
                <path
                  d="M 33 34 L 43 34 L 41 46 Q 48 48 47 56 Q 44 62 36 60 Q 30 58 35 50 Z"
                  fill="url(#sock-green)"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
                {/* Sock Stripes */}
                <path d="M 33 38 L 43 38" stroke="#fef08a" strokeWidth="2" />
                <path d="M 34 44 L 42 44" stroke="#fef08a" strokeWidth="2" />
                <circle cx="42" cy="56" r="3" fill="#15803d" />

                {/* Brown Hanging Warning Tag */}
                <g transform="translate(54, 28) rotate(15)">
                  <line x1="0" y1="0" x2="3" y2="8" stroke="#b45309" strokeWidth="1.2" />
                  <rect x="-2" y="8" width="10" height="13" rx="1.5" fill="#fed7aa" stroke="#78350f" strokeWidth="1" />
                  <path d="M 1 12 L 5 12 M 1 15 L 7 15 M 1 18 L 4 18" stroke="#78350f" strokeWidth="1" strokeLinecap="round" />
                </g>

                {/* Glass Highlights */}
                <line x1="28" y1="34" x2="28" y2="62" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              </svg>
            )}
          </>
        )}
      </div>

      {/* Optional Micro Name Tag */}
      {showLabel && (
        <span
          className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full border shadow mt-1 whitespace-nowrap ${
            type === 'fruit'
              ? 'bg-slate-900/90 text-amber-200 border-amber-400/50'
              : 'bg-rose-950/95 text-rose-200 border-rose-500 animate-bounce'
          }`}
        >
          {type === 'fruit' ? (
            activeGo === 'pudding'
              ? '布丁 🍮'
              : activeGo === 'donut'
              ? '甜甜圈 🍩'
              : activeGo === 'strawberry'
              ? '宝石草莓 🍓'
              : activeGo === 'diamond'
              ? '绚丽钻石 💎'
              : activeGo === 'jelly'
              ? '萌脸果冻 ✨'
              : '琉璃蓝莓 🫐'
          ) : activeNoGo === 'exploding_chili' ? (
            '🔥 爆炸辣椒 🚫'
          ) : (
            '🧦 臭袜子罐 🚫'
          )}
        </span>
      )}
    </div>
  );
};
