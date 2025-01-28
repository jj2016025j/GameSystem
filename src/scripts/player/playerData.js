// playerData.js - 玩家初始化數據
import { DefaultState } from "./defaultState.js";

export const PlayerData = {
  name: "芙莉蓮",
  states: initializePlayerStates(),
  backpack: initializePlayerBackpack(),
  skillList: initializePlayerSkills(),
  location: initializePlayerLocation(),
};

// 初始化玩家狀態
function initializePlayerStates() {
  return {
    health: DefaultState.MAX_HEALTH,
    mana: DefaultState.MAX_MANA,
    level: 1,
    state: DefaultState.STATES.ALIVE,
  };
}

// 初始化玩家背包
function initializePlayerBackpack() {
  return {
    items: [
      { name: "劍", quantity: 2 },
      { name: "盾牌", quantity: 1 },
    ],
    gold: 100,
  };
}

// 初始化玩家技能
function initializePlayerSkills() {
  return [
    { name: "火球術" },
    { name: "治療術" },
  ];
}

// 初始化玩家位置
function initializePlayerLocation() {
  return "古林";
}
