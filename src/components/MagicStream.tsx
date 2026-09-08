import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { StreamItem } from '../types';
import { FoodItem } from './FoodItem';

interface MagicStreamProps {
  items: StreamItem[];
  onSwipeItem: (item: StreamItem, startX: number, startY: number) => void;
  disabled: boolean;
  highlightItemId?: string | null;
}

export const MagicStream: React.FC<MagicStreamProps> = ({
  items,
  onSwipeItem,
  disabled,
  highlightItemId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ id: string; x: number; y: number; time: number } | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Handle touch / pointer down
  const handlePointerDown = (item: StreamItem, e: React.PointerEvent) => {
    if (disabled || item.isSwiped) return;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    touchStartRef.current = {
      id: item.id,
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
    setActiveDragId(item.id);
  };

  // Handle pointer move / swipe detection
  const handlePointerMove = (item: StreamItem, e: React.PointerEvent) => {
    if (!touchStartRef.current || touchStartRef.current.id !== item.id) return;

    const deltaY = e.clientY - touchStartRef.current.y;

    // Upward swipe threshold: swiping UP from the horizontal conveyor belt into the beast's mouth above
    if (deltaY < -20) {
      onSwipeItem(item, e.clientX, e.clientY);
      touchStartRef.current = null;
      setActiveDragId(null);
    }
  };

  const handlePointerUp = (item: StreamItem, e: React.PointerEvent) => {
    if (!touchStartRef.current || touchStartRef.current.id !== item.id) return;

    const deltaY = e.clientY - touchStartRef.current.y;
    const elapsed = Date.now() - touchStartRef.current.time;

    // Quick upward flick or tap
    if (deltaY < -10 || (elapsed < 280 && deltaY < -4)) {
      onSwipeItem(item, e.clientX, e.clientY);
    }
    touchStartRef.current = null;
    setActiveDragId(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-44 sm:h-52 select-none overflow-visible flex flex-col justify-end pb-4 sm:pb-6"
    >
      {/* Horizontal Magic Conveyor Belt Runway (横向魔力传送带) */}
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-8">
        {/* Soft Ambient Underglow below the horizontal conveyor belt */}
        <div className="absolute inset-x-8 -bottom-2 h-14 bg-gradient-to-r from-cyan-500/20 via-sky-400/30 to-amber-500/20 blur-xl pointer-events-none" />

        {/* Horizontal Track Structure */}
        <div className="relative w-full h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-slate-900/95 via-slate-900/80 to-slate-950/95 border-2 border-cyan-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden flex items-center">
          {/* Top & Bottom Glowing Track Neon Rails */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />

          {/* Horizontal Conveyor Rollers & Moving Chevron Slats */}
          <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                className="h-full w-2.5 bg-gradient-to-b from-transparent via-cyan-300 to-transparent mx-4 sm:mx-6 shrink-0 rotate-12"
                animate={{
                  x: ['-100%', '1000%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.55,
                }}
              />
            ))}
          </div>

          {/* Center Magic Track Rune Line */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-cyan-500/20 pointer-events-none" />

          {/* Left Entrance Gate: 魔法出菜口 (Kitchen Dispatch Station) */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent flex items-center justify-start pl-2 sm:pl-3 z-10 pointer-events-none border-r border-cyan-400/30">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-pulse">🍲</span>
              <span className="text-[9px] sm:text-[10px] font-black text-cyan-300 tracking-wider">出菜口</span>
            </div>
          </div>

          {/* Right Exit Gate: 回收口 (Safe Pass Exit Station) */}
          <div className="absolute right-0 inset-y-0 w-16 sm:w-24 bg-gradient-to-l from-slate-950 via-slate-900/90 to-transparent flex items-center justify-end pr-2 sm:pr-3 z-10 pointer-events-none border-l border-cyan-400/30">
            <div className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl animate-pulse">🚪</span>
              <span className="text-[9px] sm:text-[10px] font-black text-amber-300 tracking-wider">回收口</span>
            </div>
          </div>

          {/* Floating Horizontal Food Items */}
          <div className="absolute inset-0 pointer-events-auto">
            {items.map((item) => {
              if (item.isSwiped) return null;

              // item.progress is 0% (left entrance) to 100% (right exit)
              const leftPercent = item.progress;
              const isHighlighted = highlightItemId === item.id;

              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    top: `calc(50% + ${item.laneY || 0}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onPointerDown={(e) => handlePointerDown(item, e)}
                  onPointerMove={(e) => handlePointerMove(item, e)}
                  onPointerUp={(e) => handlePointerUp(item, e)}
                  onPointerCancel={(e) => handlePointerUp(item, e)}
                  className={`cursor-grab active:cursor-grabbing transition-transform touch-none flex flex-col items-center justify-center p-1 sm:p-2 ${
                    activeDragId === item.id ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  {/* Tutorial Highlight Pulse */}
                  {isHighlighted && (
                    <div className="absolute -inset-4 rounded-full border-4 border-yellow-300 animate-ping pointer-events-none z-20" />
                  )}

                  {/* Magic Silver/Golden Serving Plate (魔法托盘/餐盘底座) */}
                  <div className="relative flex flex-col items-center">
                    {/* Plate base shadow & rim */}
                    <div className="absolute bottom-1 w-14 sm:w-16 h-4 rounded-full bg-slate-950/70 blur-[2px] pointer-events-none" />
                    <div className="absolute bottom-1.5 w-14 sm:w-16 h-3 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400 border border-cyan-200/80 shadow-md pointer-events-none opacity-90" />

                    {/* Food Item Graphic Component */}
                    <div className="relative z-10 -mb-1">
                      <FoodItem
                        type={item.type}
                        goVariant={item.goVariant}
                        noGoVariant={item.noGoVariant}
                        fruitVariant={item.fruitVariant}
                        showLabel={false}
                        className="scale-90 sm:scale-100"
                      />
                    </div>

                    {/* Interaction Micro-Prompt Badge */}
                    {item.type === 'fruit' ? (
                      <span className="text-[10px] sm:text-xs font-black text-amber-200 bg-slate-900/90 px-2.5 py-0.5 rounded-full border border-amber-400/50 shadow mt-0.5 whitespace-nowrap z-10">
                        👆 上划投喂
                      </span>
                    ) : (
                      <span className="text-[10px] sm:text-xs font-black text-rose-200 bg-rose-950/95 px-2.5 py-0.5 rounded-full border border-rose-500 shadow mt-0.5 whitespace-nowrap animate-bounce z-10">
                        🚫 危险！别动！
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track Label under the belt */}
        <div className="flex items-center justify-between px-3 mt-1.5 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-bold text-cyan-300/80 flex items-center gap-1">
            <span>✨</span>
            <span>横向魔力传送带 · 菜品流转中 ➔</span>
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-amber-300/80 flex items-center gap-1">
            <span>向上划动上菜给上方VIP食客 🍽️</span>
          </span>
        </div>
      </div>
    </div>
  );
};
