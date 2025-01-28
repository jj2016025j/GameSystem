// playerData.js - 玩家初始化數據
import { States } from "./state/states.js";

// 玩家初始化數據
export const defaultPlayerData = {
  name: "芙莉蓮",
  states: initializePlayerStates(),
  backpack: initializePlayerBackpack(),
  skillList: initializePlayerSkills(),
  location: "古林", // 初始化位置
};

// 初始化玩家狀態
function initializePlayerStates() {
  return {
    health: 100,
    mana: 50,
    level: 1,
    experience: 0,
    state: States.ALIVE,
    attackPower: 10, // 初始攻擊力
    defensePower: 5, // 初始防禦力
  };
}

// 初始化玩家背包
function initializePlayerBackpack() {
  return {
    items: [
      { id: "Sword", name: "劍", quantity: 2 },
      { id: "Shield", name: "盾牌", quantity: 1 },
    ],
    gold: 100, // 初始金幣
  };
}

// 初始化玩家技能
function initializePlayerSkills() {
  return [
    {
      id: "Fireball",
      name: "火球術",
      description: "發射火焰球攻擊敵人。",
      manaCost: 20,
      cooldown: 5,
    },
    {
      id: "Heal",
      name: "治療術",
      description: "回復生命值。",
      manaCost: 15,
      cooldown: 3,
    },
  ];
}
