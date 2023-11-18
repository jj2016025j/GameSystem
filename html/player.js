class Player{
    constructor(name) {
      this.name = name;
      this.id = ""
      this.states = new States(this);
      this.backpack = new Backpack(this);
      this.time = new Date().toISOString(); // 生成ISO 8601格式的时间戳
      this.skillList = [];
      this.targets = []
      this.location = currentGameData.location
  
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
      return this.backpack.AddItems(items);
    }

    removeItems(items) {
      return this.backpack.removeItems(items);
    };

    // 玩家使用物品，從背包中移除
    useItems(item) {
      return this.backpack.useItems(item);
    }

    buyItems(seller, itemsToBuy, pricePerItem, isShop=false){
      return this.backpack.buyItems(seller.backpack, itemsToBuy, pricePerItem, isShop);
    }

    sellItems(buyer, itemsToSell, pricePerItem, isShop=false) {
      return this.backpack.sellItems(buyer.backpack, itemsToSell, pricePerItem, isShop)
    }

    addSkill(skillListToAdd) {
      const skills = Array.isArray(skillListToAdd) ? skillListToAdd : Object.entries(skillListToAdd).map(([name, description]) => ({ name, description }));

      skills.forEach(skill=> {
        const existingSkill = this.skillList.find(i => i.name === skill.name);
        if (!existingSkill) {
          // 如果不存在，添加新技能
          this.skillList.push({...skill});
        }
      });
    }

    attack(target){
      return target.GetHurt(10)
    }
  
    GetHurt(amount) {
      console.log(this);
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
      this.Backpack.AddItems(itemsToAdd);
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
        console.log(this.name + "正在使用技能：" + skillName);

      // let skill = this.getSkillByName(skillName);
      // if (skill) {
      //     // 使用技能的方法
      //     console.log(this.name + "正在使用技能：" + skill);
      //     // 在這裡添加使用技能的邏輯
      //     skill.execute(this);
      // } else {
      //     console.log(`${this.name} 没有学会技能 ${skillName}`);
      // }
    };

    //計算冷卻
    updateCooldowns() {
      this.skills.forEach(skill => skill.updateCooldown());
    }

    death(){
      GameSystem.death(this)
    }
  }
