class Player{
    constructor(name) {
      this.name = name;
      this.status = new Status();
      this.backpack = new Backpack();
      this.skills = new Skills();
      this.target = []
  
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
      this.backpack.useItem(this, item);
      // console.log("interactive with bag")
    }

    acquireSkill(skill) {
      this.skills.addSkill(skill);
      // console.log("interactive with skill")
    }

    attack(target){
      target.getHurt(10)
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

    
    addItemsToInventory(itemsToAdd) {
      this.inventory.addItems(itemsToAdd);
    };

    removeItemsFromInventory(itemsToRemove) {
      if (itemsToRemove) {
          for (let entry of Object.entries(itemsToRemove)) {
              this.inventory.removeItem(entry[0], entry[1]);
          }
      }
    };

    // 其它方法依此类推...

    getSkillByName(skillName) {
      return this.skills.find(s => s.name === skillName);
    };

    // JavaScript不支持泛型方法，所以这里我们用skillName代替
    useSkill(skillName) {
      let skill = this.getSkillByName(skillName);
      if (skill) {
          skill.execute(this);
      } else {
          console.log(`${this.name} 没有学会技能 ${skillName}`);
      }
    };
  }
  