// defaultState.js - 存放靜態數據

import { States } from "./states.js";

export const DefaultEffects = [
  // 預設效果，比如玩家初始擁有的效果
  {
    id: "RestoreHealth",
    name: "回復",
    description: "每秒回復少量生命值",
    impact: { health: +5 },
    duration: null, // 無限持續（直到效果被移除）
  },
];

export const DefaultState = {
  MAX_HEALTH: 100,
  MAX_MANA: 50,
  MAX_SATURATION: 100, // 飽食度上限
  MAX_LEVEL: 99,
  MAX_EXPERIENCE: 100,
  HUNGER_THRESHOLD: 20, // 飢餓狀態門檻值
  HUNGER_DAMAGE: 5, // 飢餓扣血量
  DEFAULT_EFFECTS: DefaultEffects,    // 預設效果
  STATES: States,
};
