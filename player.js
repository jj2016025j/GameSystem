class Player{
    constructor(name) {
      this.name = name;
      this.states = new States(this);
      this.backpack = new Backpack(this);
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
  
    GetHurt(amount) {
      return this.states.TakeDamage(amount);
    }
  
    Heal(amount) {
      return this.states.Healing(amount);
    }
  
    eatFood(food) {
      food.Effects(this.states);
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

    plant(seed,farmland) {
      farmland.plant(seed)
    }

    harvest(farmland) {
      farmland.harvest()
    }

    interactWithObject(object) {
      object.interactWithObject(this)
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

    //計算冷卻
    updateCooldowns() {
      this.skills.forEach(skill => skill.updateCooldown());
    }
  }
