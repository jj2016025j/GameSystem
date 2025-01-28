import { GameSystem } from "../gameSystem.js";

import { Player } from "../player/player.js";
const gameSystem = new GameSystem()
const player = new Player(gameSystem, { name: "芙莉蓮", location: "冒險者公會" });
console.log(JSON.stringify(player)); 
// 移動
player.moveTo("魔法森林");

// 解鎖技能
player.learnSkill("fireball");

// 使用技能
player.useSkill("fireball", { name: "哥布林", states: { takeDamage: () => {} } });

// 更新
player.update(1.0);

// 查看玩家數據
// console.log(player.getPlayerData());
const playerStates = player.states
const effectManager = playerStates.effectManager
// console.log(effectManager.activeEffects)
// 玩家獲得一個中毒效果
effectManager.addEffect("PoisonEffect");

// 每秒執行一次，應用所有效果
setInterval(() => {
  effectManager.updateEffects();
}, 5000);
