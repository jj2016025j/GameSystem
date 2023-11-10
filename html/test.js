//extends 繼承
class Skills {
  constructor() {
    this.skillList = [];
  }

  addSkill(skill) {
    this.skillList.push(skill);
  }

  useSkill(skill) {
    if (!this.skillList.includes(skill)) {
        console.log(`${this.name}使用了技能 ${skill.name}`);
    }
  }

  learnSkill(skill) {
    if (!this.skillList.includes(skill)) {
        this.skillList.push(skill);
    } else {
        console.log(`${this.name}已经学会了技能 ${skill.name}`);
    }
  };

  unlearnSkill(skill) {
    let index = this.skillList.indexOf(skill);
    if (index !== -1) {
        this.skillList.splice(index, 1);
        console.log(`技能 ${skill} 被遗忘了`);
    }
  };
}

class ChatSystem {
  constructor(player) {
    this.player = player;
  }

  send(message) {
    console.log(message)
  }

  send(sender, message) {
    console.log(`${sender.name}: ${message}`);
    // 实际的聊天系统会有复杂的逻辑来发送消息到服务器或者直接到其他玩家
  }
  // ... 其他聊天相關方法
}

// Define the supporting classes

class ObjectInteraction {
  constructor(player) {
    this.player = player;
  }
  // ... other methods
}

class ShopSystem {
  constructor(player) {
    this.player = player;
  }
  // ... other methods
}

class EventSystem {
  constructor(player) {
      this.player = player;
  }
  // ... other methods
}

class QuestSystem {
  constructor(player) {
      this.player = player;
  }
  // ... other methods
}

class NotificationSystem {
  constructor(player) {
      this.player = player;
  }
  // ... other methods
}

class InventorySystem {
  constructor(player) {
      this.player = player;
  }
  // ... other methods
}

// (Backpack, Skills, Status, ChatSystem, Player ... remain the same)
// 假设你的 Backpack 类定义已经存在

function testBackpackAddItemsSuccess() {
    const backpack = new Backpack();
    backpack.addItems({ 'apple': 5, 'banana': 3 });
    const condition = backpack.items['apple'] === 5 && backpack.items['banana'] === 3;
    logTestResult("testBackpackAddItems", condition);
  }
  
  function testBackpackRemoveItemsSuccess() {
    const backpack = new Backpack();
    backpack.addItems({ 'apple': 5, 'banana': 3 });
    backpack.removeItems({ 'apple': 2, 'banana': 1 });
    const condition = backpack.items['apple'] === 3 && backpack.items['banana'] === 2;
    logTestResult("testBackpackRemoveItems", condition);
  }
  
  function testBackpackUseItemsSuccess() {
    const backpack = new Backpack();
    backpack.addItems({ 'potion': 5, 'elixir': 2 });
    backpack.useItems({ 'potion': 3, 'elixir': 1 });
    const condition = backpack.items['potion'] === 2 && backpack.items['elixir'] === 1;
    logTestResult("testBackpackUseItems", condition);
  }
  
  function testBackpackRemoveItemsFailure() {
    const backpack = new Backpack();
    backpack.addItems({ 'apple': 2 });
    backpack.removeItems({ 'apple': 3 }); // 尝试移除更多的苹果
    const condition = backpack.items['apple'] === 2 && !backpack.items['banana'];
    logTestResult("testBackpackRemoveItemsFailure", condition);
  }
  
  function testBackpackUseItemsFailure() {
    const backpack = new Backpack();
    backpack.addItems({ 'potion': 1 });
    backpack.useItems({ 'potion': 2 }); // 尝试使用更多的药水
    const condition = backpack.items['potion'] === 1 && !backpack.items['elixir'];
    logTestResult("testBackpackUseItemsFailure", condition);
  }

// 测试出售物品方法成功的情况
function testBackpackSellItemsSuccess() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    seller.addItems({ 'apple': 10 });
    buyer.money = 50;
  
    // 买家尝试以每个2货币单位的价格购买5个苹果
    seller.sellItems(buyer, { 'apple': 5 }, { 'apple': 2 });
  
    // 断言
    const testPassed = buyer.items['apple'] === 5 &&
                       seller.items['apple'] === 5 &&
                       buyer.money === 40 &&
                       seller.money === 10;
  
    logTestResult("testBackpackSellItemsSuccess", testPassed);
  }
  
  // 测试出售物品方法失败的情况（例如卖家没有足够的物品）
  function testBackpackSellItemsFailure() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    buyer.money = 50;
    seller.addItems({ 'apple': 3 });
  
    // 买家尝试购买更多的苹果，但是卖家没有足够的库存
    const sold = seller.sellItems(buyer, { 'apple': 5 }, { 'apple': 2 });
  
    // 断言
    const testPassed = !sold &&
                       buyer.items['apple'] === undefined &&
                       seller.items['apple'] === 3 &&
                       buyer.money === 50 &&
                       seller.money === 0;
  
    logTestResult("testBackpackSellItemsFailure", testPassed);
  }
  
  // 测试购买物品方法成功的情况
function testBackpackBuyItemsSuccess() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    seller.addItems({ 'apple': 10 });
    buyer.money = 50; // 假设买家有50货币单位
  
    // 每项物品的价格
    const pricePerItem = { 'apple': 2 };
  
    // 买家尝试以每个2货币单位的价格购买5个苹果
    buyer.buyItems(seller, { 'apple': 5 }, pricePerItem);
  
    // 检查买家和卖家的状态，确定是否符合预期
    const condition = buyer.items['apple'] === 5 &&
                      seller.items['apple'] === 5 &&
                      buyer.money === 40 &&
                      seller.money === 10;
    
    logTestResult("testBackpackBuyItemsSuccess", condition);
  }
  
  // 测试购买物品方法失败的情况（例如买家没有足够的钱）
  function testBackpackBuyItemsFailure() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    seller.addItems({ 'apple': 10 });
    buyer.money = 5; // 买家只有5货币单位
  
    // 每项物品的价格
    const pricePerItem = { 'apple': 2 };
  
    // 买家尝试购买5个苹果，但是钱不够
    buyer.buyItems(seller, { 'apple': 5 }, pricePerItem);
  
    // 检查买家和卖家的状态，确定是否符合预期
    const condition = buyer.items['apple'] === undefined &&
                      seller.items['apple'] === 10 &&
                      buyer.money === 5 &&
                      seller.money === 0;
    
    logTestResult("testBackpackBuyItemsFailure", condition);
  }

function testPlayerAcquireItemSuccess() {
    const player = new Player("Buyer");
    player.acquireItems({ 'sword': 1 });
  
    const testPassed = player.backpack.items['sword'] === 1;
    logTestResult("testPlayerAcquireItemSuccess", testPassed);
  }
  
  function testPlayerAcquireItemFailure() {
    const player = new Player("Buyer");
    // 假设我们的 Backpack 类不允许添加数量为负的物品
    player.acquireItems({ 'sword': -1 });
  
    const testPassed = player.backpack.items['sword'] === undefined;
    logTestResult("testPlayerAcquireItemFailure", testPassed);
  }
  
  function testPlayerRemoveItemsSuccess() {
    const player = new Player("Buyer");
    player.acquireItems({ 'shield': 2 });
    player.removeItems({ 'shield': 1 });
  
    const testPassed = player.backpack.items['shield'] === 1;
    logTestResult("testPlayerRemoveItemsSuccess", testPassed);
  }
  
  function testPlayerRemoveItemsFailure() {
    const player = new Player("Buyer");
    player.acquireItems({ 'shield': 1 });
    player.removeItems({ 'shield': 2 }); // 尝试移除更多的物品
  
    const testPassed = player.backpack.items['shield'] === 1;
    logTestResult("testPlayerRemoveItemsFailure", testPassed);
  }
  
  function testPlayerUseItemSuccess() {
    const player = new Player("Buyer");
    player.acquireItems({ 'potion': 3 });
    const useResult = player.useItems({ 'potion': 1 });
  
    const testPassed = useResult && player.backpack.items['potion'] === 2;
    logTestResult("testPlayerUseItemSuccess", testPassed);
  }
  
  function testPlayerUseItemFailure() {
    const player = new Player("Buyer");
    player.acquireItems({ 'potion': 1 });
    player.useItems({ 'potion': 1 }); // 第一次使用成功
    const useResult = player.useItems({ 'potion': 1 }); // 尝试使用没有的物品
  
    const testPassed = !useResult && player.backpack.items['potion'] === undefined;
    logTestResult("testPlayerUseItemFailure", testPassed);
  }
  

function testPlayerBuyItemsSuccess() {
    const buyer = new Player("Buyer");
    const seller = new Player("Seller");
        
    seller.acquireItems({ 'apple': 10 });
    buyer.backpack.money = 50;
    
    const testPassed = buyer.buyItems(seller, { 'apple': 5 }, { 'apple': 2 }) &&
                      buyer.backpack.items['apple'] === 5 &&
                      seller.backpack.items['apple'] === 5 &&
                      buyer.backpack.money === 40;
                      
    logTestResult("testPlayerBuyItemsSuccess", testPassed);
  }
  
  function testPlayerBuyItemsFailure() {
    const buyer = new Player("Buyer");
    const seller = new Player("Seller");
    seller.acquireItems({ 'apple': 10 });
    buyer.backpack.money = 5; // 不够购买
    
    const testPassed = !buyer.buyItems(seller, { 'apple': 5 }, { 'apple': 2 }) &&
                      typeof buyer.backpack.items['apple'] === 'undefined' &&
                      seller.backpack.items['apple'] === 10 &&
                      buyer.backpack.money === 5;
                      
    logTestResult("testPlayerBuyItemsFailure", testPassed);
  }

  function testPlayerSellItemsSuccess() {
    const buyer = new Player("Buyer");
    const seller = new Player("Seller");
    seller.acquireItems({ 'orange': 10 });
    buyer.backpack.money = 50;
    
    const testPassed = seller.sellItems(buyer, { 'orange': 5 }, { 'orange': 3 }) &&
                      buyer.backpack.items['orange'] === 5 &&
                      seller.backpack.items['orange'] === 5 &&
                      seller.backpack.money === 15;
                      
    logTestResult("testPlayerSellItemsSuccess", testPassed);
}

  // 测试出售物品方法成功的情况
  function testPlayerSellItemsSuccess() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    buyer.money = 50;
    seller.addItems({ 'apple': 10 });
  
    // 买家尝试购买苹果
    const sold = seller.sellItems(buyer, { 'apple': 5 }, { 'apple': 2 });
  
    // 断言
    const testPassed = sold &&
                       buyer.items['apple'] === 5 &&
                       seller.items['apple'] === 5 &&
                       buyer.money === 40 &&
                       seller.money === 10;
  
    logTestResult("testPlayerSellItemsSuccess", testPassed);
  }

function testPlayerSellItemsFailure() {
  const buyer = new Player("Buyer");
  const seller = new Player("Seller");
  seller.acquireItems({ 'orange': 2 });
  buyer.backpack.money = 50;

  // 尝试卖出更多的物品，应该失败
  const testPassed = !seller.sellItems(buyer, { 'orange': 5 }, { 'orange': 3 }) &&
                    buyer.backpack.items['orange'] === undefined &&
                    seller.backpack.items['orange'] === 2 &&
                    seller.backpack.money === 0;

  logTestResult("testPlayerSellItemsFailure", testPassed);
}

function logTestResult(testName, condition) {
    if (condition) {
        console.log(`%c${testName} 通过。`, "color: green");
    } else {
        console.log(`%c${testName} 失败！`, "color: red");
    }
}



// 在测试中也包含失败的情况
testBackpackAddItemsSuccess();
testBackpackRemoveItemsSuccess();
testBackpackRemoveItemsFailure();
testBackpackUseItemsSuccess();
testBackpackUseItemsFailure();
testBackpackBuyItemsSuccess();
testBackpackBuyItemsFailure();
testBackpackSellItemsSuccess();
testBackpackSellItemsFailure();

testPlayerAcquireItemSuccess();
testPlayerAcquireItemFailure();
testPlayerRemoveItemsSuccess();
testPlayerRemoveItemsFailure();
testPlayerUseItemSuccess();
testPlayerUseItemFailure();
testPlayerBuyItemsSuccess();
testPlayerBuyItemsFailure();
testPlayerSellItemsSuccess();
testPlayerSellItemsFailure();


// console.log(playerA); // To see the player object's status after the interactions

//something happening...
const items = {
  "Apple": {
    "name": "Apple",
    "value": 5, // 假设的价值
    "description": "A juicy red apple.",
    "quantity": 10 // 假设用户有10个苹果
  },
  "Poison": {
    "name": "Poison",
    "value": 15, // 假设的价值
    "description": "A dangerous poison.",
    "quantity": 2 // 假设用户有2份毒药
  },
  "MagicPotion": {
    "name": "Magic Potion",
    "value": 25, // 假设的价值
    "description": "Restores 50 points of mana.",
    "quantity": 5 // 假设用户有5瓶魔法药水
  },
  "LifePotion": {
    "name": "Life Potion",
    "value": 30, // 假设的价值
    "description": "Restores 50 points of health.",
    "quantity": 3 // 假设用户有3瓶生命药水
  },
  "ExperiencePotion": {
    "name": "Experience Potion",
    "value": 40, // 假设的价值
    "description": "Grants 50 experience points.",
    "quantity": 4 // 假设用户有4瓶经验药水
  },
  "StrengthPotion": {
    "name": "Strength Potion",
    "value": 35, // 假设的价值
    "description": "Increases strength by 50.",
    "quantity": 1 // 假设用户有1瓶力量药水
  }
}

class FarmLand{
  constructor(name) {
    this.name = name;
    this.plantedSeeds = {};
  }
  plant(seed){
    // 简化逻辑：立即种植并记录时间
    console.log(`${this.name} 正在被种植 ${seed}`);
    if (!this.plantedSeeds) {
        this.plantedSeeds = {};
    }
    const currentTime = new Date().getTime();
    this.plantedSeeds[seed] = currentTime;
  }

  harvest() {
    console.log(`${this.name} 正在被收割`);
    // 假设所有作物都是立即成熟的
    for (let seed in this.plantedSeeds) {
        console.log(`從${this.name} 收获了 ${seed}`);
    }
    this.plantedSeeds = {}; // 清空种植记录
  }
}

class GameObject{
  constructor(name, description) {
    this.name = name;
    this.description = description
  }
  interactWithObject(user) {
    console.log(`${user} 正在与 ${this.name} 互动`);
  }
}

let playerA = new Player("芙寧娜");
// playerA.acquireItems("Sword");
// playerA.acquireSkill("Fireball");
// playerA.GetHurt(20);

// playerA.Heal(10);
// console.log(playerA);

// 創建兩名玩家
let player1 = new Player("夏洛蒂");
console.log(player1);
let player2 = new Player("Alice");
console.log(player2);

// 測試功能
player1.acquireItems(items)
let farmland = new FarmLand("大草地")
player1.plant("小麥",farmland);
player1.harvest(farmland);
let testobject = new GameObject("寶箱")

console.log(player1.states.user)
player1.interactWithObject(testobject);
// player1.useSkill("火球術");
player1.buyItems(player2, "蘋果", 5);
player1.sellItems(player2, "魔法藥水", 3);
player1.useItems(items)

// playerA.sendMessage("Hello!");

// 創建玩家角色
// if (playerA.states instanceof States) {
//   setInterval(playerA.states.Update.bind(playerA.states), 1000);
// } else {
//   console.error('playerA.states 不是 States 的一个实例');
// }// 測試玩家的屬性和狀態腳本
    //體力 飢餓 心情 魔力 血量
// playerA.states.useMana(Skill)
playerA.states.gainExperience(220)
console.log(playerA.states)

playerA.states.TakeDamage(20);//攻擊
//受傷
//回血
playerA.states.levelUp()
console.log(playerA.states)

playerA.states.addStatusEffect("Poison")
playerA.states.BringStatusEffect(playerA.states.statusEffects)
playerA.states.removeStatusEffect("Poison")
playerA.states.BringStatusEffect(playerA.states.statusEffects)
playerA.states.death()
playerA.states.resurrect() 
console.log(playerA.states)
playerA.states.Update
playerA.states.death()

