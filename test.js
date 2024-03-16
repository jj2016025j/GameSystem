//以下是主要程式碼
function Main(){
    function Start(){
      console.log("Initialization something...")
    }
    function Update(){
      console.log("Update data..."+i)
    }
    function End(){
      console.log("It's over...")
    }
    Start()
    for(i=1;i<=5;i++){
      Update()
    }
    End()

    // You can add interactive features or event listeners to your items here
    document.addEventListener('DOMContentLoaded', (event) => {
        const items = document.querySelectorAll('.interactive-item');

        items.forEach(item => {
            item.addEventListener('click', () => {
                alert('您點擊了: ' + item.textContent);
            });
        });
    });

    document.addEventListener('DOMContentLoaded', (event) => {
        const creatures = document.querySelectorAll('.interactive-object-list li');
        creatures.forEach(creature => {
            creature.addEventListener('click', () => {
              const description = creature.getAttribute('data-description');
              alert(creature.textContent + '：' + description);
            });
          });
        const creatures2 = document.querySelectorAll('.interactive-creature-list li');
        creatures2.forEach(creature => {
            creature.addEventListener('click', () => {
              const description = creature.getAttribute('data-description');
              alert(creature.textContent + '：' + description);
            });
          });
        const creatures3 = document.querySelectorAll('.npc-list li');
        creatures3.forEach(creature => {
            creature.addEventListener('click', () => {
              const description = creature.getAttribute('data-description');
              alert(creature.textContent + '：' + description);
            });
          });
        const creatures4 = document.querySelectorAll('.shop-list li');
        creatures4.forEach(creature => {
            creature.addEventListener('click', () => {
              const description = creature.getAttribute('data-description');
              alert(creature.textContent + '：' + description);
            });
          });
      });
}
  
  class Player{
    constructor(name) {
      this.name = name;
      this.backpack = new Backpack();
      this.skills = new Skills();
      this.status = new Status();
  
      // 這裡將各種功能系統作為組合引入
      this.chatSystem = new ChatSystem(this);
      this.objectInteraction = new ObjectInteraction(this);
      this.shopSystem = new ShopSystem(this);
      this.eventSystem = new EventSystem(this);
      this.questSystem = new QuestSystem(this);
      this.notificationSystem = new NotificationSystem(this);
      this.inventorySystem = new InventorySystem(this);
    }
  
    // 玩家取得物品，加入到背包
    acquireItem(item) {
      this.backpack.addItem(item);
      // console.log("interactive with bag")
    }
  
    // 玩家使用物品，從背包中移除
    useItem(item) {
      this.backpack.removeItem(item);
      // console.log("interactive with bag")
    }
  
    acquireSkill(skill) {
      this.skills.addSkill(skill);
      // console.log("interactive with skill")
    }
  
    getHurt(amount) {
      this.status.reduceHealth(amount);
    }
  
    heal(amount) {
      this.status.restoreHealth(amount);
    }
  
    interactWithItem(item) {
      this.inventorySystem.interact(item);
    }
  
    sendMessage(message) {
      this.chatSystem.send(message);
    }
  }
  
  // 定義背包類別
  class Backpack {
    constructor() {
      this.items = []; // 初始化為空的物品列表
    }
  
    // 加入物品到背包
    addItem(item) {
      this.items.push(item);
    }
  
    // 從背包中移除物品
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
          this.items.splice(index, 1);
      }
    }
  }
  
  class Skills {
    constructor() {
      this.skillList = [];
    }
  
    addSkill(skill) {
      this.skillList.push(skill);
    }
  
    useSkill(skill) {
      // 假設使用技能後就從列表中移除
      const index = this.skillList.indexOf(skill);
      if (index > -1) {
          this.skillList.splice(index, 1);
      }
    }
  }
  
  class Status {
    constructor() {
      this.health = 100; // 假設初始生命值為100
      this.mana = 100;  // 假設初始魔法值為100
      // 可以加入更多狀態，例如攻擊力、防禦力等
    }
  
    reduceHealth(amount) {
      this.health -= amount;
    }
  
    restoreHealth(amount) {
      this.health += amount;
    }
  
    // ... 更多狀態的方法
  }
  
  class ChatSystem {
    constructor(player) {
      this.player = player;
    }
  
    send(message) {
      console.log(message)
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

  // Test
  Main();
  let playerA = new Player("Alice");
  playerA.acquireItem("Sword");
  playerA.acquireSkill("Fireball");
  playerA.getHurt(20);
  playerA.heal(10);
  playerA.sendMessage("Hello!");
  
  console.log(playerA); // To see the player object's status after the interactions
  
// 可互動物件列表：
// 寶箱（可能包含金幣、武器、藥水等）
// 井（可以取水或許願）
// 書架（獲取故事資訊或學習新技能）
// 石碑（閱讀歷史或獲得任務）
// 門（需要鑰匙或解謎才能打開）
// 炼金桌（製作藥水或魔法物品）
// 武器架（獲取或更換武器）
// 傳送門（快速移動到其他地點）
// 可互動生物列表：
// 森林精靈（給予魔法能量或資訊）
// 野生動物（例如鹿、兔子，可以狩獵或馴養）
// 水中生物（例如魚，可以釣魚）
// 龍（可能是敵人或盟友，或是坐騎）
// NPC列表：
// 村莊長老（提供資訊或任務）
// 旅館老闆（提供住宿和補給）
// 教練（教授新技能或升級技能）
// 孩子（有時提供小任務或秘密資訊）
// 治安官或騎士（在某些情境中可能是友好的，或可能是阻礙）
// 巫師或魔法師（提供魔法物品或任務）
// 商店列表：
// 武器店（買賣武器）
// 藥草店（買賣藥水、藥草）
// 書店（購買魔法書或書籍）
// 寵物店（購買或賣出寵物）
// 旅館（租房休息，恢復生命值和魔法值）
// 道具店（買賣各種遊戲道具）