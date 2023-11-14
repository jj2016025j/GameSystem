//extends 繼承
function testBackpackRemoveItemsSuccess() {
  const backpack = new Backpack();
  backpack.AddItems([{ name: 'apple', quantity: 5 }, { name: 'banana', quantity: 3 }]);
  backpack.removeItems([{ name: 'apple', quantity: 2 }, { name: 'banana', quantity: 1 }]);
  const condition = backpack.hasItem('apple', 3) && backpack.hasItem('banana', 2);
  logTestResult("testBackpackRemoveItems", condition);
}

function testBackpackUseItemsSuccess() {
  const backpack = new Backpack();
  backpack.AddItems([{ name: 'potion', quantity: 5 }, { name: 'elixir', quantity: 2 }]);
  const useCondition = backpack.useItems([{ name: 'potion', quantity: 3 }, { name: 'elixir', quantity: 1 }]);
  const condition = useCondition && backpack.hasItem('potion', 2) && backpack.hasItem('elixir', 1);
  logTestResult("testBackpackUseItems", condition);
}

function testBackpackRemoveItemsFailure() {
  const backpack = new Backpack();
  backpack.AddItems([{ name: 'apple', quantity: 2 }]);
  const removeCondition = backpack.removeItems([{ name: 'apple', quantity: 3 }]); // 尝试移除更多的苹果
  const condition = !removeCondition && backpack.hasItem('apple', 2);
  logTestResult("testBackpackRemoveItemsFailure", condition);
}

function testBackpackUseItemsFailure() {
  const backpack = new Backpack();
  backpack.AddItems([{ name: 'potion', quantity: 1 }]);
  const useCondition = backpack.useItems([{ name: 'potion', quantity: 2 }]); // 尝试使用更多的药水
  const condition = !useCondition && backpack.hasItem('potion', 1);
  logTestResult("testBackpackUseItemsFailure", condition);
}

// 测试出售物品方法成功的情况
function testBackpackSellItemsSuccess() {
  const buyer = new Backpack();
  const seller = new Backpack();

  // 设置场景
  seller.AddItems([{ name: 'apple', quantity: 10 }]);
  buyer.gold = 50;

  // 买家尝试购买苹果
  const sold = seller.sellItems(buyer, [{ name: 'apple', quantity: 5 }], { 'apple': 2 });

  // 断言
  const testPassed = sold &&
                     buyer.hasItem('apple', 5) &&
                     seller.hasItem('apple', 5) &&
                     buyer.gold === 40 &&
                     seller.gold === 10;

  logTestResult("testBackpackSellItemsSuccess", testPassed);
}

// 测试出售物品方法失败的情况（例如卖家没有足够的物品）
function testBackpackSellItemsFailure() {
  const buyer = new Backpack();
  const seller = new Backpack();

  // 设置场景
  buyer.gold = 50;
  seller.AddItems([{ name: 'apple', quantity: 3 }]);

  // 买家尝试购买更多的苹果，但是卖家没有足够的库存
  const sold = seller.sellItems(buyer, [{ name: 'apple', quantity: 5 }], { 'apple': 2 });

  // 断言
  const testPassed = !sold &&
                     !buyer.hasItem('apple', 1) &&
                     seller.hasItem('apple', 3) &&
                     buyer.gold === 50 &&
                     seller.gold === 0;

  logTestResult("testBackpackSellItemsFailure", testPassed);
}
// 其他测试函数的调整类似，确保它们使用 addItem 和 removeItem

  // 测试购买物品方法成功的情况
function testBackpackBuyItemsSuccess() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    seller.AddItems({ 'apple': 10 });
    buyer.gold = 50; // 假设买家有50货币单位
  
    // 每项物品的价格
    const pricePerItem = { 'apple': 2 };
  
    // 买家尝试以每个2货币单位的价格购买5个苹果
    buyer.buyItems(seller, [{ name: 'apple', quantity: 5 }], pricePerItem);
  
    // 检查买家和卖家的状态，确定是否符合预期
    const condition = buyer.items['apple'] === 5 &&
                      seller.items['apple'] === 5 &&
                      buyer.gold === 40 &&
                      seller.gold === 10;
    
    logTestResult("testBackpackBuyItemsSuccess", condition);
  }
  
  // 测试购买物品方法失败的情况（例如买家没有足够的钱）
  function testBackpackBuyItemsFailure() {
    const buyer = new Backpack();
    const seller = new Backpack();
  
    // 设置场景
    seller.AddItems({ 'apple': 10 });
    buyer.gold = 5; // 买家只有5货币单位
  
    // 每项物品的价格
    const pricePerItem = { 'apple': 2 };
  
    // 买家尝试购买5个苹果，但是钱不够
    buyer.buyItems(seller, { 'apple': 5 }, pricePerItem);
  
    // 检查买家和卖家的状态，确定是否符合预期
    const condition = buyer.items['apple'] === undefined &&
                      seller.items['apple'] === 10 &&
                      buyer.gold === 5 &&
                      seller.gold === 0;
    
    logTestResult("testBackpackBuyItemsFailure", condition);
  }

  function testPlayerAcquireItemSuccess() {
    const player = new Player("Buyer");
    player.acquireItems([{ name: 'sword', quantity: 1 }]);
  
    const testPassed = player.backpack.hasItem('sword', 1);
    logTestResult("testPlayerAcquireItemSuccess", testPassed);
}

function testPlayerAcquireItemFailure() {
    const player = new Player("Buyer");
    // 假设我们的 Backpack 类不允许添加数量为负的物品
    player.acquireItems([{ name: 'sword', quantity: -1 }]);
  
    const testPassed = !player.backpack.hasItem('sword', 1);
    logTestResult("testPlayerAcquireItemFailure", testPassed);
}

function testPlayerRemoveItemsSuccess() {
    const player = new Player("Buyer");
    player.acquireItems([{ name: 'shield', quantity: 2 }]);
    player.removeItems([{ name: 'shield', quantity: 1 }]);
  
    const testPassed = player.backpack.hasItem('shield', 1);
    logTestResult("testPlayerRemoveItemsSuccess", testPassed);
}

function testPlayerRemoveItemsFailure() {
    const player = new Player("Buyer");
    player.acquireItems([{ name: 'shield', quantity: 1 }]);
    player.removeItems([{ name: 'shield', quantity: 2 }]); // 尝试移除更多的物品
  
    const testPassed = !player.backpack.hasItem('shield', 0);
    logTestResult("testPlayerRemoveItemsFailure", testPassed);
}
  
function testPlayerUseItemSuccess() {
  const player = new Player("Buyer");
  player.backpack.AddItems([{ name: 'potion', quantity: 3 }]);
  const useResult = player.backpack.useItems([{ name: 'potion', quantity: 1 }]);

  const testPassed = useResult && player.backpack.hasItem('potion', 2);
  logTestResult("testPlayerUseItemSuccess", testPassed);
}

function testPlayerUseItemFailure() {
  const player = new Player("Buyer");
  player.backpack.AddItems([{ name: 'potion', quantity: 1 }]);
  player.backpack.useItems([{ name: 'potion', quantity: 1 }]); // 第一次使用成功
  const useResult = player.backpack.useItems([{ name: 'potion', quantity: 1 }]); // 尝试使用没有的物品

  const testPassed = !useResult && !player.backpack.hasItem('potion', 1);
  logTestResult("testPlayerUseItemFailure", testPassed);
}

function testPlayerBuyItemsSuccess() {
  const buyer = new Player("Buyer");
  const seller = new Player("Seller");
      
  seller.backpack.AddItems([{ name: 'apple', quantity: 10 }]);
  buyer.backpack.gold = 50;
  
  const testPassed = buyer.backpack.buyItems(seller.backpack, [{ name: 'apple', quantity: 5 }], { 'apple': 2 }) &&
                    buyer.backpack.hasItem('apple', 5) &&
                    seller.backpack.hasItem('apple', 5) &&
                    buyer.backpack.gold === 40 &&
                    seller.backpack.gold === 10;
                    
  logTestResult("testPlayerBuyItemsSuccess", testPassed);
}
  
function testPlayerBuyItemsFailure() {
  const buyer = new Player("Buyer");
  const seller = new Player("Seller");
  seller.acquireItems([{ name: 'apple', quantity: 10 }]);
  buyer.backpack.gold = 5; // 不够购买

  const testPassed = !buyer.buyItems(seller, [{ name: 'apple', quantity: 5 }], { 'apple': 2 }) &&
                     !buyer.backpack.hasItem('apple', 1) &&
                     seller.backpack.hasItem('apple', 10) &&
                     buyer.backpack.gold === 5;

  logTestResult("testPlayerBuyItemsFailure", testPassed);
}

function testPlayerSellItemsSuccess() {
  const buyer = new Player("Buyer");
  const seller = new Player("Seller");
  seller.acquireItems([{ name: 'orange', quantity: 10 }]);
  buyer.backpack.gold = 50;

  const testPassed = seller.sellItems(buyer, [{ name: 'orange', quantity: 5 }], { 'orange': 3 }) &&
                     buyer.backpack.hasItem('orange', 5) &&
                     seller.backpack.hasItem('orange', 5) &&
                     buyer.backpack.gold === 35 &&
                     seller.backpack.gold === 15;

  logTestResult("testPlayerSellItemsSuccess", testPassed);
}

function testPlayerSellItemsFailure() {
  const buyer = new Player("Buyer");
  const seller = new Player("Seller");
  seller.acquireItems([{ name: 'orange', quantity: 2 }]);
  buyer.backpack.gold = 50;

  // 尝试卖出更多的物品，应该失败
  const testPassed = !seller.sellItems(buyer, [{ name: 'orange', quantity: 5 }], { 'orange': 3 }) &&
                     !buyer.backpack.hasItem('orange', 1) &&
                     seller.backpack.hasItem('orange', 2) &&
                     seller.backpack.gold === 0;

  logTestResult("testPlayerSellItemsFailure", testPassed);
}

function logTestResult(testName, condition) {
    if (condition) {
        console.log(`%c${testName} 通过。`, "color: green");
    } else {
        console.log(`%c${testName} 失败！`, "color: red");
    }
}

function runTest(testFunction) {
  try {
      testFunction();
  } catch (error) {
      console.error(`在测试 '${testFunction.name}' 中发生错误: ${error}`);
  }
}


if(true){
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
}else{
  // 继续运行其他测试...
  // 在測試中也包含失敗的情况
  const tests = [
    testBackpackRemoveItemsSuccess,
    testBackpackRemoveItemsFailure,
    testBackpackUseItemsSuccess,
    testBackpackUseItemsFailure,
    testBackpackBuyItemsSuccess,
    testBackpackBuyItemsFailure,
    testBackpackSellItemsSuccess,
    testBackpackSellItemsFailure,
    
    testPlayerAcquireItemSuccess,
    testPlayerAcquireItemFailure,
    testPlayerRemoveItemsSuccess,
    testPlayerRemoveItemsFailure,
    testPlayerUseItemSuccess,
    testPlayerUseItemFailure,
    testPlayerBuyItemsSuccess,
    testPlayerBuyItemsFailure,
    testPlayerSellItemsSuccess,
    testPlayerSellItemsFailure,
  ];

  for (const test of tests) {
    runTest(test);
  }
}


// console.log(playerA); // To see the player object's status after the interactions

//something happening...
let playerA = new Player("芙寧娜");
// playerA.acquireItems("Sword");
// playerA.acquireSkill("Fireball");
// playerA.GetHurt(20);

// playerA.Heal(10);
// console.log(playerA);

// 創建兩名玩家
let player1 = new Player("夏洛蒂");
let player2 = new Player("Alice");
let farmland = new FarmLand("大草地")
let testobject = new GameObject("寶箱")
let player = new Player("芙寧娜");

  backpack = [
    {
      id: 'sword',
      name: '劍',
    },
    {
      id: 'shield',
      name: '盾牌',
    },
    {
      id: 'potion',
      name: '藥水',
    },
  ]

// player = {
//   name: '芙寧娜',
//   health: 10,
//   mana: 10,
//   level: 10,
//   gold: 500,

//   skills: [
//     {
//       id: 'fireball',
//       name: '火球術',
//     },
//     {
//       id: 'heal',
//       name: '治療術',
//     },
//     {
//       id: 'stealth',
//       name: '隱身術',
//     },
//   ],
// };

const items = [
  {
    "name": "Apple",
    "value": 5, // 假设的价值
    "description": "A juicy red apple.",
    "quantity": 10 // 假设用户有10个苹果
  },
  {
    "name": "Poison",
    "value": 15, // 假设的价值
    "description": "A dangerous poison.",
    "quantity": 2 // 假设用户有2份毒药
  },
  {
    "name": "Magic Potion",
    "value": 25, // 假设的价值
    "description": "Restores 50 points of mana.",
    "quantity": 5 // 假设用户有5瓶魔法药水
  },
  {
    "name": "Life Potion",
    "value": 30, // 假设的价值
    "description": "Restores 50 points of health.",
    "quantity": 3 // 假设用户有3瓶生命药水
  },
  {
    "name": "Experience Potion",
    "value": 40, // 假设的价值
    "description": "Grants 50 experience points.",
    "quantity": 4 // 假设用户有4瓶经验药水
  },
  {
    "name": "Strength Potion",
    "value": 35, // 假设的价值
    "description": "Increases strength by 50.",
    "quantity": 1 // 假设用户有1瓶力量药水
  }
]


console.log(player1);
console.log(player2);

// 測試功能
player1.acquireItems(items)
player1.plant("小麥",farmland);
player1.harvest(farmland);

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

player.addSkill("冰凍術")
player.acquireItems(items) 

console.log(player); // 芙寧娜

UpdatePlayerInfo()
UpdateBackpackList()
UpdateSkillsList()
UpdateObjectsList()