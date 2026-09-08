import React from 'react';
import { motion } from 'motion/react';
import { Heart, Volume2, VolumeX, Maximize2, Sparkles, ChefHat } from 'lucide-react';
import { BeastConfig } from '../types';

interface GameHUDProps {
  currentBeast: BeastConfig;
  beastIndex: number; // 0, 1, 2
  totalBeasts: number; // 3
  hp: number; // 0, 1, 2, 3
  stomachCount: number;
  maxStomach: number;
  comboCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

const MUSICAL_NOTES = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti', '高音Do'];

export const GameHUD: React.FC<GameHUDProps> = ({
  currentBeast,
  beastIndex,
  totalBeasts,
  hp,
  stomachCount,
  maxStomach,
  comboCount,
  isMuted,
  onToggleMute,
  onToggleFullscreen,
}) => {
  const fullnessPercent = Math.min(Math.round((stomachCount / maxStomach) * 100), 100);

  return (
    <div className="relative z-30 w-full px-4 sm:px-6 pt-3 select-none pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Left Side: Chef Tag & VIP Beast Rank & 3 Hearts */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* VIP Beast Badge */}
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-400/40 rounded-2xl px-3 py-1.5 shadow-lg">
            <div className="w-7 h-7 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center">
              <ChefHat className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs text-amber-300 font-bold leading-tight">
                  VIP 食客 {beastIndex + 1}/{totalBeasts}
                </span>
                <span className="text-[10px] text-cyan-300 bg-cyan-950/60 px-1 rounded font-semibold">
                  {currentBeast.vipRank}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                {currentBeast.name}
              </span>
            </div>
          </div>

          {/* 3 Glowing Glass Hearts (HP) */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md border border-rose-500/40 rounded-2xl px-3 py-2 shadow-lg">
            {[1, 2, 3].map((heartIndex) => {
              const isActive = heartIndex <= hp;
              return (
                <motion.div
                  key={heartIndex}
                  animate={
                    isActive
                      ? { scale: [1, 1.15, 1] }
                      : { scale: [1, 0.8, 1], filter: 'grayscale(1)' }
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Infinity : 0,
                    delay: heartIndex * 0.2,
                  }}
                  className="relative"
                >
                  <Heart
                    className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                      isActive
                        ? 'fill-rose-500 text-rose-300 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.95)]'
                        : 'fill-slate-800 text-slate-600 opacity-40'
                    }`}
                  />
                  {isActive && (
                    <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Center: Combo Musical Note Indicator (when combo > 0) */}
        {comboCount > 0 && (
          <motion.div
            key={comboCount}
            initial={{ scale: 0.6, y: -10, opacity: 0 }}
            animate={{ scale: 1.05, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400 text-slate-950 px-4 py-1.5 rounded-full font-black text-sm tracking-wider shadow-lg shadow-amber-400/40"
          >
            <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
            <span>连续上菜 {comboCount} 连击</span>
            <span className="bg-slate-950/90 text-amber-300 px-2.5 py-0.5 rounded-full text-xs font-black">
              🎵 {MUSICAL_NOTES[(comboCount - 1) % MUSICAL_NOTES.length]}
            </span>
          </motion.div>
        )}

        {/* Right Side: Stomach Fullness Meter & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Glass Stomach Fullness Meter (直观的“肠胃饱食度”图标) */}
          <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-amber-400/40 rounded-2xl px-3 py-1.5 shadow-lg">
            {/* Round Translucent Flask / Belly Indicator */}
            <div className="relative w-8 h-8 rounded-full border-2 border-amber-300/80 bg-slate-950/60 overflow-hidden flex items-end justify-center shadow-inner">
              <motion.div
                className="w-full bg-gradient-to-t from-amber-500 via-yellow-400 to-rose-400"
                style={{ height: `${fullnessPercent}%` }}
                transition={{ duration: 0.4 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white drop-shadow">
                {stomachCount}/{maxStomach}
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs text-amber-200 font-bold">
                  肠胃饱食度
                </span>
                <span className="text-[10px] text-yellow-300 font-mono font-bold">
                  {fullnessPercent}%
                </span>
              </div>
              {/* Discrete Feeding Pods */}
              <div className="flex gap-1 mt-0.5">
                {Array.from({ length: maxStomach }).map((_, idx) => {
                  const isFilled = idx < stomachCount;
                  return (
                    <motion.div
                      key={idx}
                      animate={isFilled ? { scale: [1, 1.2, 1] } : {}}
                      className={`w-3.5 h-2 rounded-sm border transition-all duration-300 ${
                        isFilled
                          ? 'bg-amber-400 border-yellow-200 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                          : 'bg-slate-800/80 border-slate-700'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Interactive Utility Buttons (Audio & Fullscreen) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={onToggleMute}
              title={isMuted ? '开启音效' : '静音'}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
            </button>

            <button
              onClick={onToggleFullscreen}
              title="切换全屏"
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow"
            >
              <Maximize2 className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
