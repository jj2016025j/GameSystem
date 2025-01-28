// defaultState.js - 存放靜態數據

export const DefaultState = {
  ...MaxStats,
  AVAILABLE_EFFECTS: AvailableEffects, // 可用效果
  DEFAULT_EFFECTS: DefaultEffects,    // 預設效果
  STATES: States,
};

export const MaxStats = {
  MAX_HEALTH: 100,
  MAX_MANA: 100,
  MAX_SATURATION: 100, // 飽食度上限
  HUNGER_THRESHOLD: 20, // 飢餓狀態門檻值
  HUNGER_DAMAGE: 5, // 飢餓扣血量
  MAX_LEVEL: 90,
  MAX_EXPERIENCE: 100,
};

export const DefaultEffects = [
  // 預設效果，比如玩家初始擁有的效果
  { id: "RestoreHealth", duration: null }, // 回復效果無限持續
];

export const States = {
  ALIVE: "存活",
  DEAD: "死亡",
};

export const AvailableEffects = [
  {
    id: "RestoreHealth",
    name: "回復",
    description: "每秒回復少量生命值",
    impact: { health: +5 },
    duration: null, // 無限持續（直到效果被移除）
  },
  {
    id: "BeginHungry",
    name: "飢餓",
    description: "飽食度低於門檻值時每秒扣血",
    impact: null, // 這個效果由 `States` 自己處理
    duration: null, 
  },
  {
    id: "PoisonEffect",
    name: "中毒",
    description: "持續降低生命值",
    impact: { health: -3 },
    duration: 10, 
  },
  {
    id: "SpeedBoost",
    name: "速度提升",
    description: "移動速度加快",
    impact: { speed: +10 },
    duration: 5, 
  },
  {
    id: "Slow",
    name: "減速",
    description: "降低移動速度",
    impact: { speed: -10 },
    duration: 5,
  },
  {
    id: "AttackBoost",
    name: "攻擊力提升",
    description: "增加攻擊力",
    impact: { attack: +5 },
    duration: 10,
  },
  {
    id: "DefenseBoost",
    name: "防禦力提升",
    description: "增加防禦力",
    impact: { defense: +5 },
    duration: 10,
  },
  {
    id: "Stun",
    name: "暈眩",
    description: "無法移動或攻擊",
    impact: { canMove: false, canAttack: false },
    duration: 3, 
  },
  {
    id: "Bleeding",
    name: "流血",
    description: "持續流失生命值",
    impact: { health: -2 },
    duration: 7,
  },
  {
    id: "Burn",
    name: "灼燒",
    description: "受到火焰傷害",
    impact: { health: -4 },
    duration: 5,
  },
  {
    id: "Regeneration",
    name: "快速回復",
    description: "生命值快速恢復",
    impact: { health: +10 },
    duration: 5,
  },
  {
    id: "BrokenWeaponEffect",
    name: "武器損壞",
    description: "無法使用武器",
    impact: { canAttack: false },
    duration: null, // 無限持續，直到換新武器
  },
  {
    id: "Invincibility",
    name: "無敵",
    description: "短時間內不受傷害",
    impact: { invincible: true },
    duration: 3, 
  },
  {
    id: "ManaRegen",
    name: "魔力回復",
    description: "每秒恢復魔力",
    impact: { mana: +5 },
    duration: 8,
  },
  {
    id: "ManaDrain",
    name: "魔力枯竭",
    description: "持續降低魔力",
    impact: { mana: -5 },
    duration: 8,
  },
];
