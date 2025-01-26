// data.js - 存放靜態數據
export const PlayerData = {
  name: "芙莉蓮",
  states: {
    health: 100,
    mana: 50,
    level: 1,
    state: "存活"
  },
  backpack: {
    items: [
      { name: "劍", quantity: 2 },
      { name: "盾牌", quantity: 1 },
    ],
    gold: 100,
  },
  location: "古林",
  skillList: [{ name: "火球術" }, { name: "治療術" }],
};

export const initialStateConfig = {
  MAX_HEALTH: 100,
  MAX_MANA: 100,
  MAX_SATURATION: 100,
  MAX_MOOD: 100,
  MAX_BODY_STRENGTH: 100,
  MAX_LEVEL: 90,
  DEFAULT_EFFECTS: [
    "RestoreHealth",
    "RestoreMana",
    "BeginHungry",
    "DepletePower",
    "PoisonEffect",
  ],
};
