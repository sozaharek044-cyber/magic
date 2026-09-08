import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChefHat, Upload, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(() => {
    return localStorage.getItem('magic_kitchen_custom_cover') || null;
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if /cover.png or /cover.jpg exists in public/ folder on mount
  useEffect(() => {
    if (coverImage) return;

    const checkStaticCover = async () => {
      try {
        const res = await fetch('/cover.png', { method: 'HEAD' });
        if (res.ok) {
          setCoverImage('/cover.png');
          return;
        }
      } catch {
        // ignore
      }
      try {
        const res = await fetch('/cover.jpg', { method: 'HEAD' });
        if (res.ok) {
          setCoverImage('/cover.jpg');
        }
      } catch {
        // ignore
      }
    };

    checkStaticCover();
  }, [coverImage]);

  // Handle image file selection/drop
  const handleProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCoverImage(dataUrl);
        try {
          localStorage.setItem('magic_kitchen_custom_cover', dataUrl);
        } catch {
          // localStorage quota exceeded if image is too large, fallback in memory
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  // Clipboard Paste (Ctrl+V) handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.items) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          const item = e.clipboardData.items[i];
          if (item.type.indexOf('image') !== -1) {
            const file = item.getAsFile();
            if (file) {
              handleProcessFile(file);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const handleClickStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    sound.playBellDing();

    // Smooth transition: plays the crisp bell "Ding!" and lets the title/elements disperse gracefully
    setTimeout(() => {
      onStart();
    }, 450);
  };

  const handleResetCover = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('magic_kitchen_custom_cover');
    setCoverImage(null);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full h-full flex flex-col items-center justify-between select-none overflow-hidden bg-[#0a0f29]"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleProcessFile(e.target.files[0]);
          }
        }}
      />

      {/* CASE 1: Custom Uploaded Cover Image */}
      {coverImage ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Background Full Cover Image */}
          <motion.img
            src={coverImage}
            alt="疯狂魔法厨房封面"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={
              isStarting
                ? { scale: 1.15, opacity: 0, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.6 }}
          />

          {/* Subtle Ambient Vignette & Sparkles */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

          {/* Interactive Start Game Button Hotspot (Aligned with the Golden Cloche Dome in bottom center) */}
          <div className="absolute bottom-[10%] sm:bottom-[13%] md:bottom-[15%] inset-x-0 flex flex-col items-center justify-center z-30 pointer-events-auto">
            {/* Luminous Pulsing Golden Aura around button */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-80 h-28 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 blur-2xl opacity-70 pointer-events-none"
            />

            {/* Glowing Golden Cloche Dome Button */}
            <motion.button
              onClick={handleClickStart}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative group cursor-pointer flex flex-col items-center justify-center"
            >
              {/* Planetary Ring encircling the button */}
              <div className="absolute inset-x-[-26px] top-1/2 -translate-y-1/2 h-14 rounded-full border-4 border-yellow-300/80 bg-gradient-to-r from-yellow-300/30 via-amber-400/50 to-yellow-300/30 -rotate-6 pointer-events-none shadow-[0_0_25px_rgba(251,191,36,0.9)]" />

              {/* Cloche Top Star Handle */}
              <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-b from-yellow-200 to-amber-500 border-2 border-white flex items-center justify-center shadow-lg -mb-2">
                <span className="text-base text-yellow-900 font-black leading-none">★</span>
              </div>

              {/* Main Golden Dish Cloche Dome */}
              <div className="relative z-10 px-12 sm:px-18 py-4 sm:py-5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#b45309] border-4 border-white shadow-[0_12px_45px_rgba(245,158,11,0.9)] flex items-center gap-3">
                {/* Gloss Reflection */}
                <div className="absolute top-1 inset-x-6 h-1/2 rounded-full bg-white/50 blur-[1px] pointer-events-none" />

                <span className="text-3xl sm:text-4xl text-slate-950 font-black tracking-widest drop-shadow">
                  开始游戏
                </span>

                <Sparkles className="w-7 h-7 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </motion.button>

            {/* Prompt text */}
            <span className="text-xs sm:text-sm text-yellow-200 mt-3 font-black tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/40 px-4 py-1 rounded-full border border-yellow-300/40 flex items-center gap-1.5">
              <span>🛎️</span>
              <span>拍击魔法餐盘，播放“叮！”声开席营业！</span>
            </span>
          </div>
        </div>
      ) : (
        /* CASE 2: Default High-Fidelity SVG/CSS Theme (When custom image is not yet loaded) */
        <>
          {/* Dreamy Twilight Magic Kingdom & Starlit Sky (参考图三) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e1638] via-[#1a2356] to-[#2e1d54] pointer-events-none" />

          {/* Floating Magic Palace & Clouds in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
            <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/25 via-indigo-600/15 to-transparent blur-2xl" />
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
          </div>

          {/* Side Beast Characters lurking cheerfully at the bar */}
          {/* Left: Jelly Mouth Beast */}
          <motion.div
            animate={{
              y: [-8, 8, -8],
              rotate: [-2, 2, -2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-2 sm:left-6 md:left-14 bottom-16 sm:bottom-20 w-36 sm:w-52 md:w-64 pointer-events-none z-10 opacity-90 filter drop-shadow-[0_10px_25px_rgba(56,189,248,0.5)]"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon points="100,10 90,50 110,50" fill="#facc15" stroke="#fff" strokeWidth="2" />
              <path d="M 93 25 Q 100 28 107 23" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <path d="M 95 38 Q 100 42 105 36" stroke="#38bdf8" strokeWidth="3" fill="none" />
              <path d="M 30 180 C 15 110, 45 55, 100 50 C 155 55, 185 110, 170 180 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="3.5" />
              <ellipse cx="100" cy="135" rx="34" ry="26" fill="#be123c" stroke="#fff" strokeWidth="2.5" />
              <ellipse cx="100" cy="144" rx="20" ry="10" fill="#fda4af" />
              <rect x="-8" y="-2" width="7" height="6" rx="2" fill="#fff" transform="translate(100, 114)" />
              <rect x="5" y="-2" width="7" height="6" rx="2" fill="#fff" transform="translate(100, 114)" />
              <ellipse cx="68" cy="102" rx="14" ry="18" fill="#082f49" stroke="#fff" strokeWidth="2" />
              <circle cx="64" cy="98" r="5" fill="#fff" />
              <ellipse cx="132" cy="102" rx="14" ry="18" fill="#082f49" stroke="#fff" strokeWidth="2" />
              <circle cx="128" cy="98" r="5" fill="#fff" />
              <ellipse cx="45" cy="175" rx="16" ry="12" fill="#bae6fd" stroke="#fff" strokeWidth="2.5" />
            </svg>
            <div className="text-center font-black text-xs sm:text-sm text-cyan-200 bg-slate-950/70 px-2 py-0.5 rounded-full border border-cyan-400/40 mt-[-10px]">
              果冻大嘴兽
            </div>
          </motion.div>

          {/* Right: Crystal Chubby Dragon */}
          <motion.div
            animate={{
              y: [8, -8, 8],
              rotate: [2, -2, 2],
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute right-2 sm:right-6 md:right-14 bottom-16 sm:bottom-20 w-36 sm:w-52 md:w-64 pointer-events-none z-10 opacity-90 filter drop-shadow-[0_10px_25px_rgba(99,102,241,0.5)]"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon points="100,10 90,48 110,48" fill="#facc15" stroke="#fff" strokeWidth="2" />
              <polygon points="76,26 70,54 88,52" fill="#38bdf8" stroke="#fff" strokeWidth="1.5" />
              <polygon points="124,26 112,52 130,54" fill="#c084fc" stroke="#fff" strokeWidth="1.5" />
              <path d="M 35 180 C 25 115, 55 52, 100 50 C 145 52, 175 115, 165 180 Z" fill="#6366f1" stroke="#ffffff" strokeWidth="3.5" />
              <circle cx="70" cy="100" r="14" fill="#1e1b4b" stroke="#fff" strokeWidth="2" />
              <polygon points="70,92 72,98 78,100 72,102 70,108 68,102 62,100 68,98" fill="#facc15" />
              <circle cx="130" cy="100" r="14" fill="#1e1b4b" stroke="#fff" strokeWidth="2" />
              <polygon points="130,92 132,98 138,100 132,102 130,108 128,102 122,100 128,98" fill="#facc15" />
              <ellipse cx="100" cy="132" rx="24" ry="18" fill="#881337" stroke="#fff" strokeWidth="2.5" />
              <polygon points="90,118 94,126 98,118" fill="#fff" />
              <polygon points="102,118 106,126 110,118" fill="#fff" />
            </svg>
            <div className="text-center font-black text-xs sm:text-sm text-indigo-200 bg-slate-950/70 px-2 py-0.5 rounded-full border border-indigo-400/40 mt-[-10px]">
              晶石小胖龙
            </div>
          </motion.div>

          {/* Center 3D Title Section (参考图三: 《疯狂魔法厨房》立体大字) */}
          <div className="relative z-20 flex flex-col items-center justify-center my-auto px-4">
            {/* Floating Utensils */}
            <motion.div
              animate={{ rotate: [-15, 15, -15], y: [-10, 10, -10] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-12 sm:-left-24 md:-left-36 top-0 w-16 sm:w-24 h-24 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.9)] pointer-events-none"
            >
              <svg viewBox="0 0 80 100" className="w-full h-full">
                <rect x="36" y="55" width="8" height="40" rx="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                <ellipse cx="40" cy="30" rx="18" ry="25" fill="none" stroke="#67e8f9" strokeWidth="2.5" />
                <ellipse cx="40" cy="30" rx="10" ry="25" fill="none" stroke="#67e8f9" strokeWidth="2" />
                <line x1="40" y1="5" x2="40" y2="55" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </motion.div>

            <motion.div
              animate={{ rotate: [15, -15, 15], y: [10, -10, 10] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-12 sm:-right-24 md:-right-36 top-0 w-16 sm:w-24 h-24 filter drop-shadow-[0_0_20px_rgba(244,114,182,0.9)] pointer-events-none"
            >
              <svg viewBox="0 0 80 100" className="w-full h-full">
                <rect x="36" y="55" width="8" height="40" rx="4" fill="#f472b6" stroke="#ffffff" strokeWidth="1.5" />
                <rect x="22" y="8" width="36" height="46" rx="6" fill="#fbcfe8" stroke="#ffffff" strokeWidth="2" />
                <line x1="30" y1="16" x2="30" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="40" y1="16" x2="40" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="16" x2="50" y2="44" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Title Container */}
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
              <div className="absolute inset-x-[-20%] top-[45%] h-14 rounded-full border-4 border-amber-300/40 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -rotate-6 pointer-events-none blur-[1px]" />

              {/* 3D Bubble "疯狂" Text */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [-4, 4, -4], y: [-2, 2, -2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-7 sm:-top-11 left-[42%] -translate-x-1/2 z-20 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]"
                >
                  <svg viewBox="0 0 60 50" className="w-12 h-10 sm:w-16 sm:h-14">
                    <path d="M 12 40 C 6 25, 16 12, 30 12 C 44 12, 54 25, 48 40 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
                    <circle cx="20" cy="18" r="10" fill="#ffffff" />
                    <circle cx="30" cy="14" r="12" fill="#ffffff" />
                    <circle cx="40" cy="18" r="10" fill="#ffffff" />
                    <rect x="14" y="38" width="32" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                  </svg>
                </motion.div>

                <span className="text-3xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] mr-2">
                  ⭐
                </span>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-[#fef08a] drop-shadow-[0_6px_0_#d97706] [-webkit-text-stroke:3px_#ffffff]">
                  疯狂
                </h1>
                <span className="text-3xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] ml-2">
                  ⭐
                </span>
              </div>

              {/* 3D Glazed Word: "魔法厨房" */}
              <div className="relative mt-[-4px] sm:mt-[-10px]">
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#bae6fd] to-[#38bdf8] drop-shadow-[0_8px_0_#0369a1] [-webkit-text-stroke:3px_#ffffff] py-1">
                  魔法厨房
                </h2>
              </div>
            </motion.div>
          </div>

          {/* Default Golden Cloche Dome Button */}
          <div className="relative z-30 flex flex-col items-center pb-4 sm:pb-8">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 blur-2xl opacity-60 pointer-events-none"
            />

            <motion.button
              onClick={handleClickStart}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative group cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="absolute inset-x-[-24px] top-1/2 -translate-y-1/2 h-14 rounded-full border-4 border-yellow-300/80 bg-gradient-to-r from-yellow-300/30 via-amber-400/50 to-yellow-300/30 -rotate-6 pointer-events-none shadow-[0_0_20px_rgba(251,191,36,0.8)]" />

              <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-b from-yellow-200 to-amber-500 border-2 border-white flex items-center justify-center shadow-lg -mb-2">
                <span className="text-base text-yellow-900 font-black leading-none">★</span>
              </div>

              <div className="relative z-10 px-12 sm:px-18 py-4 sm:py-5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#b45309] border-4 border-white shadow-[0_12px_40px_rgba(245,158,11,0.85)] flex items-center gap-3">
                <div className="absolute top-1 inset-x-6 h-1/2 rounded-full bg-white/45 blur-[1px] pointer-events-none" />

                <span className="text-3xl sm:text-4xl text-slate-950 font-black tracking-widest drop-shadow">
                  开始游戏
                </span>

                <Sparkles className="w-7 h-7 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </motion.button>

            <span className="text-xs sm:text-sm text-cyan-200/90 mt-3 font-black tracking-wider flex items-center gap-1.5 drop-shadow">
              <span>🛎️</span>
              <span>拍击魔法餐盘，播放“叮！”声开席营业！</span>
            </span>
          </div>
        </>
      )}

      {/* Top Header Control Bar: Upload / Replace / Reset Cover Button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-40 pointer-events-auto">
        {/* Left Badge: 疯狂主厨 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-300/40 text-cyan-200 text-xs sm:text-sm font-black shadow-lg backdrop-blur-md">
          <ChefHat className="w-4 h-4 text-amber-300" />
          <span>疯狂主厨 · 魔法料理吧台</span>
        </div>

        {/* Right Tools: Upload Cover Image / Reset Cover */}
        <div className="flex items-center gap-2">
          {coverImage && (
            <button
              onClick={handleResetCover}
              className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-rose-950/80 border border-rose-400/40 text-rose-200 text-xs font-bold shadow-lg backdrop-blur-md cursor-pointer transition flex items-center gap-1.5"
              title="恢复默认封面"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">恢复默认</span>
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/80 to-blue-600/80 hover:from-cyan-400 hover:to-blue-500 border border-white/60 text-white text-xs sm:text-sm font-black shadow-[0_0_15px_rgba(56,189,248,0.5)] backdrop-blur-md cursor-pointer transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4 text-yellow-300" />
            <span>{coverImage ? '更换封面图' : '替换封面图'}</span>
          </button>
        </div>
      </div>

      {/* Dragging Overlay Highlight (Drag & Drop helper) */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-cyan-950/85 backdrop-blur-md border-4 border-dashed border-cyan-300 flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-300 flex items-center justify-center mb-4 animate-bounce">
              <ImageIcon className="w-12 h-12 text-cyan-200" />
            </div>
            <h3 className="text-3xl font-black text-white">松开鼠标，立即替换封面图片！</h3>
            <p className="text-cyan-200 text-sm mt-2 font-bold">
              支持直接拖拽图片文件到此窗口
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
