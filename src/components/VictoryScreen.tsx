import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/audio';

interface VictoryScreenProps {
  onRestart: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({ onRestart }) => {
  useEffect(() => {
    sound.playVictoryFanfare();

    // Trigger radiant confetti blasts
    const duration = 3200;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#facc15', '#34d399'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#facc15', '#34d399'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Radiant Kitchen Aura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c2c6d] via-[#111942] to-[#070b1e] pointer-events-none" />
      <div className="absolute w-[520px] h-[520px] rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      {/* Main Victory Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 max-w-xl w-full flex flex-col items-center text-center p-8 sm:p-10 rounded-3xl bg-slate-900/85 border-2 border-amber-400/60 shadow-[0_0_50px_rgba(251,191,36,0.5)] backdrop-blur-xl"
      >
        {/* Golden Chef Trophy */}
        <motion.div
          animate={{
            rotate: [-4, 4, -4],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 flex items-center justify-center shadow-xl shadow-amber-500/50 mb-4 border-2 border-white"
        >
          <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-slate-950" />
          <ChefHat className="absolute -top-3 -left-3 w-8 h-8 text-white drop-shadow" />
          <Sparkles className="absolute -bottom-2 -right-2 w-7 h-7 text-amber-950 animate-spin" />
        </motion.div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-rose-200 tracking-wider">
          三星传奇魔法主厨！
        </h2>

        <p className="text-cyan-100 font-semibold text-base sm:text-lg mt-3">
          太厉害了！3位VIP奇异兽食客全部心满意足、圆满饱腹！
          <br />
          你展现了惊人的上菜专注力与超强抑制力！
        </p>

        {/* The 3 VIP Beasts Rejoicing */}
        <div className="flex items-center justify-center gap-6 my-6">
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>🍮</span>
            <span className="text-xs text-pink-200 font-black mt-1">果冻大嘴兽</span>
            <span className="text-[10px] text-pink-300/80">肚饱饱 ⭐</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🐲</span>
            <span className="text-xs text-amber-200 font-black mt-1">晶石小胖龙</span>
            <span className="text-[10px] text-amber-300/80">满星赞誉 ⭐</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>☁️</span>
            <span className="text-xs text-cyan-200 font-black mt-1">星空云朵兽</span>
            <span className="text-[10px] text-cyan-300/80">星光闪耀 ⭐</span>
          </div>
        </div>

        {/* Play Again Big Button */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-2 px-10 sm:px-14 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-cyan-400 text-slate-950 font-black text-xl sm:text-2xl shadow-xl shadow-amber-400/50 border-3 border-white flex items-center gap-3 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6 text-slate-950" />
          <span>开启下一轮魔法营业</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
