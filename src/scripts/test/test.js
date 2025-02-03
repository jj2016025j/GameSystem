import { EntityState } from "../BaseEntity/EntityState.js";

const entityState = new EntityState()
console.log(entityState)

import { BaseEntity } from "../BaseEntity/BaseEntity.js";

const entity = new BaseEntity({ id: "id", name: "name" })
console.log(entity)




// import { GameSystem } from "../gameSystem.js";

// import { Player } from "../player/player.js";
// const gameSystem = new GameSystem()
// const player = new Player(gameSystem, { name: "芙莉蓮", location: "冒險者公會" });
// console.log(JSON.stringify(player));
// // 移動
// player.moveTo("魔法森林");

// // 解鎖技能
// player.learnSkill("fireball");

// // 使用技能
// player.useSkill("fireball", { name: "哥布林", states: { takeDamage: () => {} } });

// // 更新
// player.update(1.0);

// // 查看玩家數據
// // console.log(player.getPlayerData());
// const playerStates = player.states
// const effectManager = playerStates.effectManager
// // console.log(effectManager.activeEffects)
// // 玩家獲得一個中毒效果
// effectManager.addEffect("PoisonEffect");

// // 每秒執行一次，應用所有效果
// setInterval(() => {
//   effectManager.updateEffects();
// }, 5000);

// // 示例: 互動不同的物件
// const testObjects = [
//   new TreasureChest({ id: "chest1", name: "寶箱", description: "藏有寶藏的寶箱" }),
//   new Well({ id: "well1", name: "井", description: "可用來補充水分" }),
//   new Building({ id: "inn1", name: "旅館", description: "可供旅人休息的地方" }),
//   new Collectible({ id: "herb1", name: "藥草", description: "可用來製作藥水", quantity: 5 }),
//   new FoodStall({ id: "snack1", name: "街頭小吃", description: "販賣當地特色美食", foodList: [{ name: "章魚燒", price: 15 }] }),
//   new Fountain({ id: "spring1", name: "泉水", description: "可恢復體力的泉水" }),
//   new Vehicle({ id: "boat1", name: "小船", description: "可用來渡河", capacity: 4 })
// ];

// // 測試互動
// testObjects[0].open();
// testObjects[1].drawWater(20);
// testObjects[2].enter();
// testObjects[3].collect();
// testObjects[4].buyFood("章魚燒");
// testObjects[5].restore();
// testObjects[6].boardPassengers(3);
