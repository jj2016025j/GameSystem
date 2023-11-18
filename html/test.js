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
    const 托馬 = new Player("Buyer");
    托馬.acquireItems([{ name: 'sword', quantity: 1 }]);
  
    const testPassed = 托馬.backpack.hasItem('sword', 1);
    logTestResult("testPlayerAcquireItemSuccess", testPassed);
}

function testPlayerAcquireItemFailure() {
    const 托馬 = new Player("Buyer");
    // 假设我们的 Backpack 类不允许添加数量为负的物品
    托馬.acquireItems([{ name: 'sword', quantity: -1 }]);
  
    const testPassed = !托馬.backpack.hasItem('sword', 1);
    logTestResult("testPlayerAcquireItemFailure", testPassed);
}

function testPlayerRemoveItemsSuccess() {
    const 托馬 = new Player("Buyer");
    托馬.acquireItems([{ name: 'shield', quantity: 2 }]);
    托馬.removeItems([{ name: 'shield', quantity: 1 }]);
  
    const testPassed = 托馬.backpack.hasItem('shield', 1);
    logTestResult("testPlayerRemoveItemsSuccess", testPassed);
}

function testPlayerRemoveItemsFailure() {
    const 托馬 = new Player("Buyer");
    托馬.acquireItems([{ name: 'shield', quantity: 1 }]);
    托馬.removeItems([{ name: 'shield', quantity: 2 }]); // 尝试移除更多的物品
  
    const testPassed = !托馬.backpack.hasItem('shield', 0);
    logTestResult("testPlayerRemoveItemsFailure", testPassed);
}
  
function testPlayerUseItemSuccess() {
  const 托馬 = new Player("Buyer");
  托馬.backpack.AddItems([{ name: 'potion', quantity: 3 }]);
  const useResult = 托馬.backpack.useItems([{ name: 'potion', quantity: 1 }]);

  const testPassed = useResult && 托馬.backpack.hasItem('potion', 2);
  logTestResult("testPlayerUseItemSuccess", testPassed);
}

function testPlayerUseItemFailure() {
  const 托馬 = new Player("Buyer");
  托馬.backpack.AddItems([{ name: 'potion', quantity: 1 }]);
  托馬.backpack.useItems([{ name: 'potion', quantity: 1 }]); // 第一次使用成功
  const useResult = 托馬.backpack.useItems([{ name: 'potion', quantity: 1 }]); // 尝试使用没有的物品

  const testPassed = !useResult && !托馬.backpack.hasItem('potion', 1);
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

function BackpackTest(){
    let 夏洛蒂 = new Player("夏洛蒂");
    let 霄宮 = new Player("霄宮");
    夏洛蒂.acquireItems(items)
    夏洛蒂.buyItems(霄宮, "蘋果", 5);
    夏洛蒂.sellItems(霄宮, "魔法藥水", 3);
    夏洛蒂.useItems(items)
}

function StatesTest(){
    let 芙寧娜 = new Player("芙寧娜");
    芙寧娜.states.TakeDamage(20);//攻擊
    芙寧娜.GetHurt(40)//受傷
    芙寧娜.Heal(20)//回血
    芙寧娜.states.gainExperience(220)
    芙寧娜.states.levelUp()
    芙寧娜.states.addStatusEffect("Poison")
    芙寧娜.states.BringStatusEffect(芙寧娜.states.statusEffects)
    芙寧娜.states.removeStatusEffect("Poison")
    芙寧娜.states.BringStatusEffect(芙寧娜.states.statusEffects)
    芙寧娜.states.death()
    芙寧娜.states.resurrect() 
    芙寧娜.states.Update()
    芙寧娜.states.death()
}

function SkillTest(){
    let 托馬 = new Player("托馬");
    托馬.addSkill("冰凍術")
    托馬.addSkill(skills)
    托馬.useSkill("火球術");
}

function FarmTest(){
    let 夏洛蒂 = new Player("夏洛蒂");
    let farmland = new FarmLand("大草地")
    夏洛蒂.plant("小麥",farmland);
    夏洛蒂.harvest(farmland);
}

function BoxTest(){
    let 夏洛蒂 = new Player("夏洛蒂");
    let testobject = new GameObject("寶箱")
    夏洛蒂.interactWithObject(testobject);
}

function AllTest(){
  BackpackTest()
  StatesTest()
  SkillTest()
  FarmTest()
  BoxTest()
}

// if(false){
//   testPlayerAcquireItemSuccess();
//   testPlayerAcquireItemFailure();
//   testPlayerRemoveItemsSuccess();
//   testPlayerRemoveItemsFailure();
//   testPlayerUseItemSuccess();
//   testPlayerUseItemFailure();
//   testPlayerBuyItemsSuccess();
//   testPlayerBuyItemsFailure();
//   testPlayerSellItemsSuccess();
//   testPlayerSellItemsFailure();
// }else{
//   const tests = [
//     testBackpackRemoveItemsSuccess,
//     testBackpackRemoveItemsFailure,
//     testBackpackUseItemsSuccess,
//     testBackpackUseItemsFailure,
//     testBackpackBuyItemsSuccess,
//     testBackpackBuyItemsFailure,
//     testBackpackSellItemsSuccess,
//     testBackpackSellItemsFailure,
    
//     testPlayerAcquireItemSuccess,
//     testPlayerAcquireItemFailure,
//     testPlayerRemoveItemsSuccess,
//     testPlayerRemoveItemsFailure,
//     testPlayerUseItemSuccess,
//     testPlayerUseItemFailure,
//     testPlayerBuyItemsSuccess,
//     testPlayerBuyItemsFailure,
//     testPlayerSellItemsSuccess,
//     testPlayerSellItemsFailure,
//   ];

//   for (const test of tests) {
//     runTest(test);
//   }
// }
let playerName = "夏洛蒂"
let player = new Player(playerName);
player.acquireItems(items)
player.addSkill(skills)

document.addEventListener("DOMContentLoaded", () => {
  // AllTest()
  UpdatePlayerInfo()
  UpdateBackpackList()
  UpdateSkillsList()
  firstUpdateMap()
})

