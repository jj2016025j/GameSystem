class Player{
    constructor(name) {
      this.name = name;
      this.status = new Status();
      this.backpack = new Backpack(this.name);
      this.skills = new Skills();
      this.target = []
  
      // 這裡將各種功能系統作為組合引入
      this.chatSystem = new ChatSystem(this);
      this.objectInteraction = new ObjectInteraction(this);
      this.shopSystem = new ShopSystem(this);
      this.eventSystem = new EventSystem(this);
      this.questSystem = new QuestSystem(this);
      this.notificationSystem = new NotificationSystem(this);
    }
  
    // 玩家取得物品，加入到背包
    acquireItems(items) {
      return this.backpack.addItems(items);
    }

    removeItems(items) {
      return this.backpack.removeItems(items);
    };

    // 玩家使用物品，從背包中移除
    useItems(item) {
      return this.backpack.useItems(item);
    }

    buyItems(seller, itemsToBuy, pricePerItem){
      return this.backpack.buyItems(seller.backpack, itemsToBuy, pricePerItem);
    }

    sellItems(buyer, itemsToSell, pricePerItem) {
      return this.backpack.sellItems(buyer.backpack, itemsToSell, pricePerItem)
    }

    acquireSkill(skill) {
      return this.skills.addSkill(skill);
      // console.log("interactive with skill")
    }

    attack(target){
      return target.getHurt(10)
    }
  
    getHurt(amount) {
      return this.status.reduceHealth(amount);
    }
  
    heal(amount) {
      return this.status.restoreHealth(amount);
    }
  
    eatFood(player, food) {
      food.eatFood(player);
      console.log(`${player} 吃了 ${food}！`);
    }

    interactWithItem(item) {
      this.inventorySystem.interact(item);
    }
  
    sendMessage(message) {
      this.chatSystem.send(this, message);
    } 
    
    addItemsToInventory(itemsToAdd) {
      this.Backpack.addItems(itemsToAdd);
    };

    plant(seed) {
      // 简化逻辑：立即种植并记录时间
      console.log(`${this.name} 正在种植 ${seed}`);
      if (!this.plantedSeeds) {
          this.plantedSeeds = {};
      }
      const currentTime = new Date().getTime();
      this.plantedSeeds[seed] = currentTime;
    }

    harvest() {
        console.log(`${this.name} 正在收割`);
        // 假设所有作物都是立即成熟的
        for (let seed in this.plantedSeeds) {
            console.log(`${this.name} 收获了 ${seed}`);
        }
        this.plantedSeeds = {}; // 清空种植记录
    }

    interactWithObject(object) {
      // 與物件互動的方法
      console.log(`${this.name} 正在与 ${object} 互动`);
      // 示例：如果互动的是宝箱，尝试打开
      if (object.type === "chest") {
          object.open(this);
      }
  }

    getSkillByName(skillName) {
      return this.skills.find(s => s.name === skillName);
    };

    // JavaScript不支持泛型方法，所以这里我们用skillName代替
    useSkill(skillName) {
      let skill = this.getSkillByName(skillName);
      if (skill) {
          // 使用技能的方法
          console.log(this.name + "正在使用技能：" + skill);
          // 在這裡添加使用技能的邏輯
          skill.execute(this);
      } else {
          console.log(`${this.name} 没有学会技能 ${skillName}`);
      }
    };
  }
