class States {
    // 定义类的常量
    static MAX_HEALTH = 100;
    static MAX_MANA = 50;
    static MAX_SATURATION = 100;
    static MAX_MOOD = 100;
    static MAX_BODY_STRENGTH = 100;// 初始化玩家的基本屬性
    static MAX_LEVEL = 90;
    static DEAFULT_STATUS_EFFECTS = ["RestoreHealth","RestoreMana","BeginHungry","DepletePower"];


    constructor() {
        this._health = States.MAX_HEALTH;
        this._mana = States.MAX_MANA;
        this._saturation = States.MAX_SATURATION;
        this._mood = States.MAX_MOOD;
        this._bodyStrength = States.MAX_BODY_STRENGTH;
        this.statusEffects = States.DEAFULT_STATUS_EFFECTS; // 存儲狀態效果的列表
        this.experience = 0;
        this.MAX_EXPERIENC = 100;
        this.level = 1;

        this.isSleeping = false;
        this.lowHealth = false;
        this.lowSaturation = false;
        this.poorMood = false;
        this.lackOfPhysicalStrength = false;
        this.stats = "Live";
    }

    get health() {
        return this._health;
    }

    set health(value) {
        this._health = Math.max(0, Math.min(States.MAX_HEALTH, value));
        if (this.health === 0) {
            this.death();
        }
    }

    get mana() {
        return this._mana;
    }

    set mana(value) {
        this._mana = Math.max(0, Math.min(States.MAX_MANA, value));
    }

    get mood() {
        return this._mood;
    }

    set mood(value) {
        this._mood = Math.max(0, Math.min(States.MAX_MOOD, value));
        if (this.mood === 0) {
            this.stats = "Disappeared";
        }
    }

    get bodyStrength() {
        return this._physicalStrength;
    }

    set bodyStrength(value) {
        this._physicalStrength = Math.max(0, Math.min(States.MAX_PHYSICAL_STRENGTH, value));
        if (this.bodyStrength === 0) {
            this.stats = "Sleep";
        }    
    }
    
    get Saturation() {
        return this._saturation;
    }

    set Saturation(value) {
        this.saturation = Math.max(0, Math.min(States.MAX_SATURATION, value));
        if (this.bodyStrength === 0) {
            this.health -= 20;
        }    
    }
    takeDamage(damage) {
        // 玩家受到傷害時的處理
        if (!this.isDead) {
            this.health -= damage;
            if (this.health <= 0) {
                this.health = 0;
                this.isDead = true;
                console.log("玩家已死亡");
            }
        } else {
            console.log("玩家已死亡，無法再受到傷害");
        }
    }

    useMana(Skill) {
        // 使用魔法值的方法
        if (!this.stats === "Dead") {
            if (this.mana >= Skill.cost) {
                this.mana -= Skill.cost;
                console.log("使用了 " + Skill.cost + " 魔法值");
            } else {
                console.log("魔法值不足");
            }
        } else {
            console.log("玩家已死亡，無法使用魔法");
        }
    }

    gainExperience(amount) {
        // 獲得經驗值的方法
        if (!this.stats === "Dead") {
            this.experience += amount;
            while (this.experience >= this.MAX_EXPERIENC) {
                this.levelUp();
            }
        } else {
            console.log("玩家已死亡，無法獲得經驗值");
        }
    }

    levelUp() {
        // 升級角色的方法
        this.level += 1;
        this.health = 100; // 升級時恢復生命值
        this.mana = 50; // 升級時恢復魔法值
        this.saturation = 100; // 升級時恢復飲食值
        this.mood = 100; // 升級時恢復心情值
        this.bodyStrength = 100; // 升級時恢復物理力值
        this.experience -= this.MAX_EXPERIENC; // 每次獲得經驗值就減少 100                
        this.MAX_EXPERIENC *= 1.1; // 每次獲得經驗值就減少 100                
        console.log("玩家升級到 Level " + this.level);
    }

    addStatusEffect(effect) {
        // 添加狀態效果的方法
        if (!this.stats === "Dead") {
            this.statusEffects.push(effect);
            console.log("玩家受到 " + effect + " 效果的影響");
        } else {
            console.log("玩家已死亡，無法添加狀態效果");
        }
    }

    removeStatusEffect(effect) {
        // 移除狀態效果的方法
        if (!this.stats === "Dead") {
            const index = this.statusEffects.indexOf(effect);
            if (index !== -1) {
                this.statusEffects.splice(index, 1);
                console.log("玩家解除了 " + effect + " 效果");
            }
        } else {
            console.log("玩家已死亡，無法移除狀態效果");
        }
    }

    BringStatusEffect(statusEffects){
        //使每個效果分別對玩家造成影響
        for (const [index, effect] of Object.entries(statusEffects)) {
            console.log(effect);
            switch (effect) {
                case "RestoreHealth":
                    this.health += 1;
                    break;
                case "RestoreMana":
                    this.mana += 1;
                    break;
                case "BeginHungry":
                    this.saturation -= 1;
                    break;
                case "DepletePower":
                    this.physicalStrength -= 1;
                    break;
                case "Mood":
                    this.mood-= 1;
                    break;
                case "Fire":
                    this.health -= 8;
                    break;
                case "Poison":
                    this.health -= 3;
                    //傷害動畫
                    break;
                default:
                    console.log("未知效果");
                    break;
            }
        }
    }

    death() {
        this.stats = "Dead";
        this.statusEffects=[]
        // 處理死亡相關的操作
    }

    resurrect() {
        // 復活玩家的方法
        if (this.stats === "Dead") {
            this.stats === "Live";
            this.health = 10; // 復活時恢復十點生命值
            this.statusEffects = States.DEAFULT_STATUS_EFFECTS
            console.log("玩家已復活");
        } else {
            console.log("玩家未死亡，無需復活");
        }
    }

    Update(){
    //判斷是否死亡
    if (this.stats === "Dead") {
        }
        this.BringStatusEffect(this.statusEffects)
    }
}

// 創建玩家角色
const status1 = new States();
const status2 = new States();
setInterval(status1.Update.bind(status1), 1000); // 現在`this`在`Update`中指向`status1`
setInterval(status2.Update.bind(status2), 1000); // 現在`this`在`Update`中指向`status2`
// 測試玩家的屬性和狀態腳本
    //體力 飢餓 心情 魔力 血量
// status1.useMana(Skill)
status1.gainExperience(220)
status1.takeDamage(20);//攻擊
//受傷
//回血
status1.levelUp()
status1.addStatusEffect("Poison")
status1.BringStatusEffect(status1.statusEffects)
status1.removeStatusEffect("Poison")
status1.BringStatusEffect(status1.statusEffects)
status1.death()
status1.resurrect() 
console.log(status1)
console.log(status2)