// playerData.js - 玩家初始化數據

export const defaultPlayerData = {
  name: "芙莉蓮",
  state: getDefaultPlayerState(),
  inventory: getDefaultPlayerInventory(),
  skillList: getDefaultPlayerSkills(),
  location: "古林", // ✅ 初始地點
};

// ✅ 初始化玩家狀態
function getDefaultPlayerState() {
  return {
    health: 100,
    maxHealth: 100, 
    mana: 50,
    maxMana: 50,
    level: 1,
    experience: 0,
    maxExperience: 100, 
    alive: true,
    attackPower: 10,
    defensePower: 5,
  };
}

// ✅ 初始化玩家背包
function getDefaultPlayerInventory() {
  return {
    items: new Map([
      ["Sword", { id: "Sword", quantity: 2 }],
      ["Shield", { id: "Shield", quantity: 1 }],
    ]), 
    gold: 100,
  };
}

// ✅ 初始化玩家技能
function getDefaultPlayerSkills() {
  return new Map([
    ["Fireball", { id: "Fireball", level: 1, cooldown: 5, manaCost: 10, effects: { damage: 20 } }],
    ["Heal", { id: "Heal", level: 1, cooldown: 3, manaCost: 5, effects: { heal: 15 } }],
  ]); 
}
