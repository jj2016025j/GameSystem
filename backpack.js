  // 定義背包類別
  class Backpack {
    constructor() {
      this.money = 0; // 初始化為0
      this.items = []; // 初始化為空的物品列表
    }
  
    // 加入物品到背包
    addItem(item) {
      this.items.push(item);
    }

    useItem(this, item){
      if(removeItem(item)){
        console.log("used "+item.name)
      }
    }
  
    // 從背包中移除物品
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index > -1) {
          this.items.splice(index, 1);
          return true;
      }
    }
  }

  class item{
    constructor() {
      this.name = "test name";
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

