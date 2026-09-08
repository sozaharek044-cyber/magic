import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TutorialState } from '../types';
import { ShieldCheck, AlertOctagon } from 'lucide-react';

interface GhostHandTutorialProps {
  step: TutorialState;
  onActionComplete: () => void;
}

export const GhostHandTutorial: React.FC<GhostHandTutorialProps> = ({
  step,
  onActionComplete,
}) => {
  const [countdown, setCountdown] = useState<number>(2);

  // For dangerous food (No-Go), count down 2 seconds of hands-off stillness
  useEffect(() => {
    if (step !== 'first_pepper') return;

    setCountdown(2);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => {
            onActionComplete();
          }, 300);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, onActionComplete]);

  if (step === 'none') return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between py-8 sm:py-12 px-6 select-none bg-slate-950/80 backdrop-blur-md pointer-events-auto">
      {/* Top Instructional Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-20 max-w-xl w-full flex flex-col items-center text-center p-5 sm:p-6 rounded-3xl bg-slate-900/95 border-2 shadow-2xl"
        style={{
          borderColor: step === 'first_fruit' ? '#38bdf8' : '#f43f5e',
          boxShadow:
            step === 'first_fruit'
              ? '0 0 45px rgba(56,189,248,0.6)'
              : '0 0 45px rgba(244,63,94,0.7)',
        }}
      >
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-xs sm:text-sm mb-2 ${
            step === 'first_fruit'
              ? 'bg-sky-500/20 text-cyan-200 border border-sky-400/40'
              : 'bg-rose-500/20 text-rose-200 border border-rose-400/40'
          }`}
        >
          {step === 'first_fruit' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>主厨教学 · 常规食物投喂</span>
            </>
          ) : (
            <>
              <AlertOctagon className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>警报！危险食物切勿触碰</span>
            </>
          )}
        </div>

        {/* Exact User Prompt: "向上滑动，把菜扔进奇异兽嘴里！" vs "危险！停止上菜，监测它直到离开传送带！" */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-wide">
          {step === 'first_fruit' ? (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-cyan-200 drop-shadow">
              向上滑动，把菜扔进奇异兽嘴里！
            </span>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-red-400 to-amber-200 drop-shadow">
              危险！停止上菜，监测它直到离开传送带！
            </span>
          )}
        </h2>

        {/* Subtitle helper */}
        <p className="text-xs sm:text-sm text-slate-200 font-bold mt-2">
          {step === 'first_fruit'
            ? '从传送带将美味菜品向上推入奇异兽大嘴中 😋'
            : '双手离开屏幕，保持身体静止 2 秒 🛑'}
        </p>

        {/* Pepper countdown indicator */}
        {step === 'first_pepper' && (
          <div className="mt-4 flex items-center gap-3 bg-rose-950/90 px-5 py-2.5 rounded-2xl border border-rose-500/60 shadow-lg">
            <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>
              ⏱️
            </span>
            <span className="text-sm sm:text-base font-black text-rose-200">
              双手克制监测中：
            </span>
            <span className="w-9 h-9 rounded-full bg-rose-500 text-white font-black flex items-center justify-center text-xl shadow-md animate-pulse">
              {countdown}s
            </span>
          </div>
        )}
      </motion.div>

      {/* Center Animated Ghost Hand / Stop Gesture */}
      <div className="relative flex flex-col items-center justify-center flex-1 my-4">
        {step === 'first_fruit' ? (
          /* Step 1: Upward Swipe Ghost Hand Animation */
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [60, -50, -90, -120],
              scale: [0.95, 1.1, 1, 0.85],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.3,
              ease: 'easeInOut',
            }}
          >
            {/* Luminous Light Trail pointing upward */}
            <div className="w-2.5 h-32 bg-gradient-to-t from-transparent via-cyan-300 to-amber-300 rounded-full blur-[1px] opacity-90 mb-2" />

            {/* Ripple Pulse Circle at base */}
            <div className="absolute bottom-6 w-24 h-24 rounded-full border-2 border-amber-300 bg-amber-300/20 animate-ping" />

            {/* Translucent Luminous Ghost Hand */}
            <div className="relative w-28 h-28 filter drop-shadow-[0_0_25px_rgba(56,189,248,0.95)]">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="ghost-hand-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                    <stop offset="60%" stopColor="#fef08a" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.98" />
                  </linearGradient>
                </defs>
                <path
                  d="M38 90 L38 52 C38 48 42 46 45 49 L45 35 C45 31 49 29 52 32 L52 22 C52 18 56 16 59 19 L59 26 C59 22 63 20 66 23 L66 52 C66 58 72 62 72 70 C72 82 65 90 55 90 Z"
                  fill="url(#ghost-hand-grad)"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <circle cx="55.5" cy="20" r="7" fill="#ffffff" />
                <circle cx="55.5" cy="20" r="11" fill="#fef08a" opacity="0.6" />
              </svg>
            </div>

            {/* Upward Arrows */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <div className="w-6 h-6 border-t-4 border-l-4 border-amber-300 rotate-45" />
              <div className="w-5 h-5 border-t-3 border-l-3 border-amber-200 rotate-45 -mt-3" />
            </div>
          </motion.div>
        ) : (
          /* Step 2: "双手离开屏幕" Hands-Off / Stop Gesture with Red Flashing Warning & Red Cross */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.08, 1], opacity: 1 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Warning Stop Halo */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-rose-500/30 border-4 border-rose-500 shadow-[0_0_60px_rgba(244,63,94,0.9)] flex items-center justify-center animate-pulse">
              <span className="text-7xl sm:text-8xl">✋</span>
            </div>

            {/* Giant Flashing Red Cross ❌ */}
            <motion.div
              animate={{ rotate: [-10, 10, -10], scale: [1, 1.25, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-rose-600 border-3 border-white flex items-center justify-center text-white text-3xl font-black shadow-[0_0_20px_rgba(244,63,94,1)]"
            >
              ✕
            </motion.div>

            {/* Two Palms pulling away illustration: 双手离开屏幕 */}
            <div className="flex items-center gap-6 mt-6 bg-slate-900/90 px-6 py-3 rounded-full border border-rose-500/50 shadow-xl">
              <div className="flex flex-col items-center">
                <span className="text-4xl animate-bounce">🫱</span>
                <span className="text-xs text-rose-300 font-black mt-1">左手收起</span>
              </div>
              <span className="text-lg sm:text-xl font-black text-rose-400 tracking-wider">
                双手离开屏幕！
              </span>
              <div className="flex flex-col items-center">
                <span className="text-4xl animate-bounce">🫲</span>
                <span className="text-xs text-rose-300 font-black mt-1">右手收起</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Action Button for Immediate Resumption */}
      <div className="relative z-30 flex flex-col items-center pb-2">
        <motion.button
          onClick={onActionComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-10 py-3.5 rounded-full font-black text-lg sm:text-xl shadow-2xl border-2 border-white cursor-pointer flex items-center gap-3 ${
            step === 'first_fruit'
              ? 'bg-gradient-to-r from-amber-400 to-cyan-400 text-slate-950 shadow-cyan-400/50'
              : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-rose-500/50'
          }`}
        >
          {step === 'first_fruit' ? (
            <>
              <span>向上滑上菜，继续游戏</span>
              <span className="text-2xl">🍲</span>
            </>
          ) : (
            <>
              <span>保持不动 2 秒，监测完成</span>
              <span className="text-2xl">✅</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
