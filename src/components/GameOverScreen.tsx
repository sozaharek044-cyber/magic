import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, HeartCrack } from 'lucide-react';
import { BeastConfig } from '../types';

interface GameOverScreenProps {
  currentBeast: BeastConfig;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  currentBeast,
  onRestart,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Dim Kitchen Twilight Background */}
      <div className="absolute inset-0 bg-[#080d21]/90 backdrop-blur-md pointer-events-none" />

      {/* Comical Slumped / Dizzy Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 max-w-md w-full flex flex-col items-center text-center p-8 rounded-3xl bg-slate-900/90 border-2 border-rose-500/50 shadow-[0_0_40px_rgba(244,63,94,0.4)] backdrop-blur-xl"
      >
        {/* Cracked Heart Icon */}
        <div className="w-20 h-20 rounded-full bg-rose-500/20 border-2 border-rose-400/50 flex items-center justify-center mb-3">
          <HeartCrack className="w-10 h-10 text-rose-400 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-rose-200 tracking-wide">
          奇异兽食客吃撑啦！
        </h2>

        {/* Fainted beast expression note */}
        <p className="text-slate-300 font-semibold text-sm sm:text-base mt-2">
          {currentBeast.name} 误食了太多打嗝胡椒球，打着大嗝瘫倒休息了~
          <br />
          下次在传送带上看到带刺黑球，小手千万不要滑动哦！
        </p>

        {/* Restart Button (点击后返回第一只奇异兽) */}
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-xl shadow-lg shadow-rose-500/40 border-2 border-white/80 flex items-center gap-3 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-white" />
          <span>重新开灶上菜</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
