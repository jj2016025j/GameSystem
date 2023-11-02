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
  