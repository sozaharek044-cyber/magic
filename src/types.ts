export type GameMode = 'start' | 'playing' | 'beast_transition' | 'victory' | 'gameover';

export type BeastId = 'jelly' | 'dragon' | 'cloud';

export interface BeastConfig {
  id: BeastId;
  name: string;
  vipRank: string;
  title: string;
  maxStomach: number; // e.g. 5
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  favoriteFood: string;
  description: string;
}

export type ItemType = 'fruit' | 'pepper';

export type GoFoodVariant = 'pudding' | 'donut' | 'strawberry' | 'diamond' | 'jelly' | 'blueberry';
export type NoGoFoodVariant = 'exploding_chili' | 'stinky_sock';

export interface StreamItem {
  id: string;
  type: ItemType; // 'fruit' = Go, 'pepper' = No-Go
  goVariant?: GoFoodVariant;
  noGoVariant?: NoGoFoodVariant;
  // Progress along horizontal conveyor belt: 0 = left entrance (0%), 100 = right exit (100%)
  progress: number;
  laneY?: number;
  speed: number;
  scale: number;
  fruitVariant?: 0 | 1 | 2 | 3;
  isSwiped: boolean;
  hasExitedSafe?: boolean;
}

export type TutorialState = 'none' | 'first_fruit' | 'first_pepper';

export type BeastExpression = 'idle' | 'happy' | 'hiccup' | 'phew' | 'dizzy' | 'full_burst';

