import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  GameMode,
  BeastConfig,
  StreamItem,
  BeastExpression,
  ItemType,
  TutorialState,
  GoFoodVariant,
  NoGoFoodVariant,
} from './types';
import { sound } from './utils/audio';
import { BeastDisplay } from './components/BeastDisplay';
import { MagicStream } from './components/MagicStream';
import { GameHUD } from './components/GameHUD';
import { GhostHandTutorial } from './components/GhostHandTutorial';
import { StartScreen } from './components/StartScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { BurpEffect } from './components/BurpEffect';
import { FoodItem } from './components/FoodItem';

const VIP_BEASTS: BeastConfig[] = [
  {
    id: 'jelly',
    name: '果冻大嘴兽',
    vipRank: '顶级VIP食客',
    title: '大嘴巴 · 喜欢果冻食物 · 软萌治愈',
    maxStomach: 5,
    primaryColor: '#38bdf8',
    accentColor: '#facc15',
    bgGradient: 'from-[#0d1c3a] via-[#142954] to-[#091124]',
    favoriteFood: '萌脸果冻 / 布丁',
    description: '半透明如果冻般弹润的顶级VIP食客，长着一张永远吃不够的呆萌大嘴。',
  },
  {
    id: 'dragon',
    name: '晶石小胖龙',
    vipRank: '顶级VIP食客',
    title: '水晶角 · 喜欢晶石食物 · 活泼好奇',
    maxStomach: 5,
    primaryColor: '#6366f1',
    accentColor: '#facc15',
    bgGradient: 'from-[#1a1c4b] via-[#241f5a] to-[#0c0d24]',
    favoriteFood: '绚丽钻石 / 宝石草莓',
    description: '背负紫晶簇的胖嘟嘟幼龙，特别喜爱闪烁金光的甜脆晶石。',
  },
  {
    id: 'cloud',
    name: '星空云朵兽',
    vipRank: '顶级VIP食客',
    title: '云朵身体 · 喜欢星空食物 · 温柔梦幻',
    maxStomach: 5,
    primaryColor: '#f472b6',
    accentColor: '#38bdf8',
    bgGradient: 'from-[#22173f] via-[#2f1b4a] to-[#120a22]',
    favoriteFood: '彩色甜甜圈 / 琉璃蓝莓',
    description: '蓬松如棉花糖的云朵灵兽，腹中旋转着微型星河，食量惊人。',
  },
];

const GO_VARIANTS: GoFoodVariant[] = [
  'pudding',
  'donut',
  'strawberry',
  'diamond',
  'jelly',
  'blueberry',
];

const NO_GO_VARIANTS: NoGoFoodVariant[] = ['exploding_chili', 'stinky_sock'];

interface FlyingItem {
  id: string;
  type: ItemType;
  variant?: 0 | 1 | 2 | 3;
  goVariant?: GoFoodVariant;
  noGoVariant?: NoGoFoodVariant;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
}

export default function App() {
  const [gameMode, setGameMode] = useState<GameMode>('start');
  const [beastIndex, setBeastIndex] = useState<number>(0);
  const [hp, setHp] = useState<number>(3);
  const [stomachCount, setStomachCount] = useState<number>(0);
  const [comboCount, setComboCount] = useState<number>(0);
  const [beastExpression, setBeastExpression] = useState<BeastExpression>('idle');
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Beginner Triggered Tutorial States (首次遭遇触发式引导)
  const [tutorialState, setTutorialState] = useState<TutorialState>('none');
  const [hasTriggeredFruitTutorial, setHasTriggeredFruitTutorial] = useState<boolean>(false);
  const [hasTriggeredPepperTutorial, setHasTriggeredPepperTutorial] = useState<boolean>(false);
  const [highlightItemId, setHighlightItemId] = useState<string | null>(null);

  const [showBurp, setShowBurp] = useState<boolean>(false);
  const [isScreenShaking, setIsScreenShaking] = useState<boolean>(false);
  const [fullScreenFlash, setFullScreenFlash] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Stream items on horizontal conveyor belt
  const [streamItems, setStreamItems] = useState<StreamItem[]>([]);
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);

  // Beast mouth position target for flying items
  const beastContainerRef = useRef<HTMLDivElement>(null);
  const spawnTimerRef = useRef<number | null>(null);
  const expressionTimeoutRef = useRef<number | null>(null);

  const currentBeast = VIP_BEASTS[beastIndex];

  // Start the game
  const handleStartGame = () => {
    sound.startAmbient();
    setGameMode('playing');
    setBeastIndex(0);
    setHp(3);
    setStomachCount(0);
    setComboCount(0);
    setBeastExpression('idle');
    setStreamItems([]);
    setFlyingItems([]);
    setTutorialState('none');
    setHasTriggeredFruitTutorial(false);
    setHasTriggeredPepperTutorial(false);
    setHighlightItemId(null);
    setIsPaused(false);
  };

  // Restart after gameover
  const handleRestart = () => {
    setGameMode('playing');
    setBeastIndex(0);
    setHp(3);
    setStomachCount(0);
    setComboCount(0);
    setBeastExpression('idle');
    setStreamItems([]);
    setFlyingItems([]);
    setShowBurp(false);
    setIsPaused(false);
    setTutorialState('none');
  };

  // Temporary Expression Helper
  const setTemporaryExpression = useCallback((expr: BeastExpression, durationMs: number = 850) => {
    if (expressionTimeoutRef.current) {
      clearTimeout(expressionTimeoutRef.current);
    }
    setBeastExpression(expr);
    expressionTimeoutRef.current = window.setTimeout(() => {
      setBeastExpression('idle');
    }, durationMs);
  }, []);

  // Full belly burst & seamless switch
  const triggerBellyBurst = useCallback(() => {
    sound.playBellyBurst();
    setBeastExpression('full_burst');
    setIsPaused(true);

    // Dazzling confetti burst
    confetti({
      particleCount: 95,
      spread: 100,
      origin: { y: 0.45 },
      colors: ['#38bdf8', '#f43f5e', '#fbbf24', '#a855f7', '#34d399', '#fde047'],
    });

    // Trigger full screen radiant light flash
    setFullScreenFlash(true);

    // At peak flash (450ms), seamlessly swap beast without loading screen
    setTimeout(() => {
      if (beastIndex + 1 < VIP_BEASTS.length) {
        setBeastIndex((prev) => prev + 1);
        setStomachCount(0);
        setHp(3); // refresh hearts
        setStreamItems([]);
        setFlyingItems([]);
        setBeastExpression('idle');
        setIsPaused(false);
      } else {
        // All 3 beasts completed!
        setGameMode('victory');
        setIsPaused(false);
      }
    }, 450);

    // Fade out flash
    setTimeout(() => {
      setFullScreenFlash(false);
    }, 950);
  }, [beastIndex]);

  // Handle fruit or pepper eaten
  const handleItemConsumed = useCallback(
    (type: ItemType) => {
      if (type === 'fruit') {
        // Correct Feed (执行守护)
        sound.playFeedSuccess();
        const nextCombo = comboCount + 1;
        setComboCount(nextCombo);
        sound.playChime(nextCombo - 1);

        setTemporaryExpression('happy', 1100);

        setStomachCount((prev) => {
          const next = prev + 1;
          if (next >= currentBeast.maxStomach) {
            // Trigger belly burst
            setTimeout(() => {
              triggerBellyBurst();
            }, 300);
          }
          return next;
        });
      } else {
        // No-Go Violation: Eaten Pepper / Stinky Hazard! (误食危险食材)
        sound.playHiccupBurp();
        setComboCount(0); // Combo breaks
        setIsScreenShaking(true);
        setShowBurp(true);
        setIsPaused(true);
        setBeastExpression('hiccup');

        // Shake screen for 600ms
        setTimeout(() => {
          setIsScreenShaking(false);
        }, 600);

        // Forced 1s pause
        setTimeout(() => {
          setShowBurp(false);
          setIsPaused(false);
          setBeastExpression('idle');
        }, 1100);

        // Deduct 1 HP heart
        setHp((prev) => {
          const nextHp = prev - 1;
          if (nextHp <= 0) {
            // Game Over
            setTimeout(() => {
              setBeastExpression('dizzy');
              setGameMode('gameover');
            }, 1100);
          }
          return nextHp;
        });
      }
    },
    [comboCount, currentBeast.maxStomach, setTemporaryExpression, triggerBellyBurst]
  );

  // Swipe item up gesture handler along the horizontal conveyor belt
  const handleSwipeItem = (item: StreamItem, clientX: number, clientY: number) => {
    if (isPaused || item.isSwiped) return;

    sound.playSwipeSwoosh();

    // If swiping during tutorial, dismiss tutorial
    if (tutorialState === 'first_fruit') {
      setTutorialState('none');
      setHighlightItemId(null);
      setIsPaused(false);
    }

    // Mark as swiped in stream
    setStreamItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, isSwiped: true } : it))
    );

    // Calculate beast mouth coordinate in screen pixels
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.32;
    if (beastContainerRef.current) {
      const rect = beastContainerRef.current.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height * 0.52;
    }

    // Add to flying items
    const flyingId = item.id;
    setFlyingItems((prev) => [
      ...prev,
      {
        id: flyingId,
        type: item.type,
        variant: item.fruitVariant ?? 0,
        goVariant: item.goVariant,
        noGoVariant: item.noGoVariant,
        startX: clientX,
        startY: clientY,
        targetX,
        targetY,
      },
    ]);

    // Animate flight and trigger consume
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((f) => f.id !== flyingId));
      handleItemConsumed(item.type);
    }, 380);
  };

  // Safe Pass detection (Hazard drifted away without being swiped)
  const handleItemExitSafe = useCallback(
    (item: StreamItem) => {
      if (item.type === 'pepper' && !item.isSwiped) {
        // Successful Inhabitation! (成功监测危险物离开)
        sound.playSafeRelief();
        setTemporaryExpression('phew', 1200);
      }
    },
    [setTemporaryExpression]
  );

  // Complete Tutorial handler
  const handleTutorialActionComplete = () => {
    if (tutorialState === 'first_fruit') {
      // Find highlighted item and swipe it upwards from horizontal track
      const targetItem = streamItems.find((it) => it.id === highlightItemId);
      if (targetItem) {
        const startX = (window.innerWidth * targetItem.progress) / 100;
        const startY = window.innerHeight * 0.82;
        handleSwipeItem(targetItem, startX, startY);
      }
      setTutorialState('none');
      setHighlightItemId(null);
      setIsPaused(false);
    } else if (tutorialState === 'first_pepper') {
      // 2s Stillness complete -> continue
      setTutorialState('none');
      setHighlightItemId(null);
      setIsPaused(false);
    }
  };

  // Horizontal Conveyor Belt Animation Loop (moves items horizontally from left to right: progress 0% -> 100%)
  useEffect(() => {
    if (gameMode !== 'playing' || isPaused) return;

    const interval = window.setInterval(() => {
      setStreamItems((prev) => {
        const updated: StreamItem[] = [];

        for (const item of prev) {
          if (item.isSwiped) continue;

          // Items move horizontally along the conveyor belt from left to right
          const nextProgress = item.progress + item.speed;

          // First Encounter Tutorial Triggers:
          // 1. First Fruit encounter around middle of horizontal track (progress >= 30%)
          if (
            !hasTriggeredFruitTutorial &&
            item.type === 'fruit' &&
            nextProgress >= 30 &&
            nextProgress <= 45
          ) {
            setHasTriggeredFruitTutorial(true);
            setTutorialState('first_fruit');
            setHighlightItemId(item.id);
            setIsPaused(true);
            return prev;
          }

          // 2. First Pepper encounter around middle of horizontal track (progress >= 30%)
          if (
            hasTriggeredFruitTutorial &&
            !hasTriggeredPepperTutorial &&
            item.type === 'pepper' &&
            nextProgress >= 30 &&
            nextProgress <= 45
          ) {
            setHasTriggeredPepperTutorial(true);
            setTutorialState('first_pepper');
            setHighlightItemId(item.id);
            setIsPaused(true);
            return prev;
          }

          if (nextProgress > 96) {
            // Exited safely into the right recycle exit port
            handleItemExitSafe(item);
          } else {
            updated.push({
              ...item,
              progress: nextProgress,
            });
          }
        }
        return updated;
      });
    }, 33);

    return () => clearInterval(interval);
  }, [
    gameMode,
    isPaused,
    hasTriggeredFruitTutorial,
    hasTriggeredPepperTutorial,
    handleItemExitSafe,
  ]);

  // Spawner loop: Spawns food at left entrance of the horizontal conveyor belt
  useEffect(() => {
    if (gameMode !== 'playing' || isPaused) return;

    const spawnNext = () => {
      // Guarantee the first item is fruit, second can be pepper once fruit tutorial passes
      const shouldForceFruit = !hasTriggeredFruitTutorial;
      const isPepper = !shouldForceFruit && Math.random() < 0.33;
      const fruitVariant = Math.floor(Math.random() * 4) as 0 | 1 | 2 | 3;
      const goVariant = GO_VARIANTS[Math.floor(Math.random() * GO_VARIANTS.length)];
      const noGoVariant = NO_GO_VARIANTS[Math.floor(Math.random() * NO_GO_VARIANTS.length)];

      const newItem: StreamItem = {
        id: `item-${Date.now()}-${Math.random()}`,
        type: isPepper ? 'pepper' : 'fruit',
        progress: 0, // Starts at left entrance of horizontal conveyor belt
        laneY: (Math.random() - 0.5) * 6, // Slight vertical centering variance
        speed: 0.42 + Math.random() * 0.12, // Gentle child-friendly horizontal pacing
        scale: 1,
        fruitVariant,
        goVariant,
        noGoVariant,
        isSwiped: false,
      };

      setStreamItems((prev) => [...prev, newItem]);

      // Schedule next item spawn (between 1.7s and 2.7s)
      const nextDelay = 1700 + Math.random() * 1000;
      spawnTimerRef.current = window.setTimeout(spawnNext, nextDelay);
    };

    spawnTimerRef.current = window.setTimeout(spawnNext, 800);

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, [gameMode, isPaused, hasTriggeredFruitTutorial]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Audio toggle
  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  return (
    <div
      className={`relative w-screen h-screen overflow-hidden select-none bg-gradient-to-b ${currentBeast.bgGradient} transition-colors duration-700 ${
        isScreenShaking ? 'animate-[shake_0.4s_ease-in-out_infinite]' : ''
      }`}
    >
      {/* Background Kitchen Starlight & Floating Magic Spores */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        {[12, 28, 48, 68, 84].map((left, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-amber-300 blur-[1px]"
            style={{
              left: `${left}%`,
              top: `${15 + (idx % 3) * 25}%`,
              width: `${4 + (idx % 3) * 3}px`,
              height: `${4 + (idx % 3) * 3}px`,
            }}
            animate={{
              y: [-12, 12, -12],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + idx * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Screen Mode Router */}
      {gameMode === 'start' && <StartScreen onStart={handleStartGame} />}

      {gameMode === 'victory' && <VictoryScreen onRestart={handleStartGame} />}

      {gameMode === 'gameover' && (
        <GameOverScreen currentBeast={currentBeast} onRestart={handleRestart} />
      )}

      {/* Active Game Scene (竖屏纵深视角，横向传送带) */}
      {gameMode === 'playing' && (
        <div className="relative w-full h-full flex flex-col justify-between">
          {/* Top HUD: 主厨状态, 奇异兽饱食度, 3颗红心, 连击音阶 */}
          <GameHUD
            currentBeast={currentBeast}
            beastIndex={beastIndex}
            totalBeasts={VIP_BEASTS.length}
            hp={hp}
            stomachCount={stomachCount}
            maxStomach={currentBeast.maxStomach}
            comboCount={comboCount}
            isMuted={isMuted}
            onToggleMute={toggleMute}
            onToggleFullscreen={toggleFullscreen}
          />

          {/* First Encounter Triggered Tutorial (首次遭遇触发式引导) */}
          <AnimatePresence>
            {tutorialState !== 'none' && (
              <GhostHandTutorial
                step={tutorialState}
                onActionComplete={handleTutorialActionComplete}
              />
            )}
          </AnimatePresence>

          {/* 核心角色层（中上方）：当前等待投喂的VIP奇异兽，占据视觉C位 */}
          <div
            ref={beastContainerRef}
            className="relative flex-1 flex items-center justify-center -mt-2 sm:-mt-6"
          >
            <BeastDisplay
              beastId={currentBeast.id}
              expression={beastExpression}
              stomachCount={stomachCount}
              maxStomach={currentBeast.maxStomach}
              isPaused={isPaused}
            />
          </div>

          {/* Kitchen Counter Bar Ledge (料理吧台台面，奇异兽的小爪子搭在吧台上) */}
          <div className="relative z-20 w-full flex justify-center pointer-events-none -mb-3 sm:-mb-5">
            <div className="w-full max-w-5xl px-4 sm:px-8">
              <div className="relative h-4 sm:h-5 rounded-t-2xl bg-gradient-to-r from-[#2a1b4e] via-[#432c7a] to-[#2a1b4e] border-t-2 border-cyan-300/40 shadow-lg flex items-center justify-center">
                {/* Bar Counter Polish Highlight */}
                <div className="absolute inset-x-8 top-0.5 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
              </div>
            </div>
          </div>

          {/* 交互轨道层（中下方）：横向“魔力传送带”，食物从左往右流转 */}
          <div className="relative z-30 w-full">
            <MagicStream
              items={streamItems}
              onSwipeItem={handleSwipeItem}
              disabled={isPaused}
              highlightItemId={highlightItemId}
            />
          </div>

          {/* Flying Food Layer: Soaring upwards straight into the mouth */}
          <div className="fixed inset-0 z-40 pointer-events-none">
            {flyingItems.map((flying) => (
              <motion.div
                key={flying.id}
                initial={{
                  left: flying.startX,
                  top: flying.startY,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  left: flying.targetX,
                  top: flying.targetY,
                  scale: [1, 1.25, 0.4],
                  opacity: [1, 1, 0.85],
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                {/* Luminous light flight trail */}
                <div
                  className={`w-16 h-16 rounded-full blur-md ${
                    flying.type === 'pepper' ? 'bg-rose-600/70' : 'bg-amber-300/80'
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <FoodItem
                    type={flying.type}
                    goVariant={flying.goVariant}
                    noGoVariant={flying.noGoVariant}
                    fruitVariant={flying.variant}
                    showLabel={false}
                    className="scale-90"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comical Super Burp Overlay (喷射彩色泡泡与超级大嗝) */}
          <AnimatePresence>{showBurp && <BurpEffect />}</AnimatePresence>

          {/* Full Screen Color Burst Transition Flash */}
          <AnimatePresence>
            {fullScreenFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.95, times: [0, 0.4, 0.6, 1] }}
                className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-tr from-amber-300 via-rose-400 to-cyan-300 backdrop-blur-md"
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
