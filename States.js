class States {
    // 定义类的常量
    static MAX_HEALTH = 100;
    static MAX_MANA = 100;
    static MAX_SATURATION = 100;
    static MAX_MOOD = 100;
    static MAX_BODY_STRENGTH = 100;// 初始化玩家的基本屬性
    static MAX_LEVEL = 90;
    static DEFAULT_STATES_EFFECTS = ["RestoreHealth","RestoreMana","BeginHungry","DepletePower","PoisonEffect"];


    constructor(user) {
        this.user = user
        this._health = States.MAX_HEALTH;
        this._mana = States.MAX_MANA;
        this._saturation = States.MAX_SATURATION;
        this._mood = States.MAX_MOOD;
        this._bodyStrength = States.MAX_BODY_STRENGTH;
        this._statesEffects = States.DEFAULT_STATES_EFFECTS; // 存儲狀態效果的列表
        this._experience = 0;
        this.MAX_EXPERIENCE = 100;
        this._level = 1;

        this.isSleeping = false;
        this.lowHealth = false;
        this.lowSaturation = false;
        this.poorMood = false;
        this.lackOfPhysicalStrength = false;
        this.states = "Live";
    }

    get health() {
        return this._health;
    }

    set health(value) {
        this._health = Math.max(0, Math.min(States.MAX_HEALTH, value));
        if (this.health === 0 && this.states != "Death") {
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
            this.states = "Disappeared";
        }
    }

    get bodyStrength() {
        return this._bodyStrength;
    }

    set bodyStrength(value) {
        this._bodyStrength = Math.max(0, Math.min(States.MAX_PHYSICAL_STRENGTH, value));
        if (this.bodyStrength === 0) {
            this.states = "Sleep";
        }    
    }
    
    get saturation() {
        return this._saturation;
    }

    set saturation(value) {
        this._saturation = Math.max(0, Math.min(States.MAX_SATURATION, value));
        if (this.saturation === 0) {
            this.health -= 20;
        }    
    }

    get level(){
        return this._level;
    }

    set level(value){
        this._level = Math.max(0, Math.min(States.MAX_LEVEL, value));
    }

    TakeDamage(damage) {
        // 玩家受到傷害時的處理
        if (this.states != "Death") {
            this.health -= damage;
        } 
        else {
            console.log(this.user.name + "已死亡，無法再受到傷害");
        }
    }

    Healing(restoreHealth){
        if (this.states != "Death") {
            this.health += restoreHealth;
        } 
        else {
            console.log(this.user.name + "已死亡，無法再受到治癒");
        }

    }

    UseMana(Skill) {
        // 使用魔法值的方法
        if (this.states != "Dead") {
            if (this.mana >= Skill.cost) {
                this.mana -= Skill.cost;
                console.log(this.user.name + "使用了 " + Skill.cost + " 魔法值");
            } else {
                console.log(this.user.name + "魔法值不足");
            }
        } else {
            console.log(this.user.name + "已死亡，無法使用魔法");
        }
    }

    gainExperience(amount) {
        // 獲得經驗值的方法
        if (this.states != "Dead") {
            this.experience += amount;
            while (this.experience >= this.MAX_EXPERIENCE) {
                this.levelUp();
            }
        } else {
            console.log(this.user.name + "已死亡，無法獲得經驗值");
        }
    }

    levelUp() {
        // 升級角色的方法
        this.level += 1;
        this.health = States.MAX_HEALTH; // 升級時恢復生命值
        this.mana = States.MAX_MANA; // 升級時恢復魔法值
        this.saturation = States.MAX_SATURATION; // 升級時恢復飲食值
        this.mood = States.MAX_MOOD; // 升級時恢復心情值
        this.bodyStrength = States.MAX_BODY_STRENGTH; // 升級時恢復物理力值
        this._statesEffects = States.DEFAULT_STATES_EFFECTS; // 升級時恢復狀態效果
        this.experience -= this.MAX_EXPERIENCE; // 每次獲得經驗值就減少 100                
        this.MAX_EXPERIENCE *= 1.1; // 每次獲得經驗值就減少 100                
        console.log(this.user.name + "升級到 Level " + this.level);
        this.resurrect()
    }

    addStatusEffect(effect) {//加上效果時間
        // 添加狀態效果的方法
        if (this.states != "Dead") {
            this._statesEffects.push(effect);
            console.log(this.user.name + "受到 " + effect + " 效果的影響");
        } else {
            console.log(this.user.name + "已死亡，無法添加狀態效果");
        }
    }

    removeStatusEffect(effect) {
        // 移除狀態效果的方法
        if (this.states != "Dead") {
            const index = this._statesEffects.indexOf(effect);
            if (index !== -1) {
                this._statesEffects.splice(index, 1);
                console.log(this.user.name + "解除了 " + effect + " 效果");
            }
        } else {
            console.log(this.user.name + "已死亡，無法移除狀態效果");
        }
    }

    BringStatusEffect(){
        //使每個效果分別對玩家造成影響
        if (this._statesEffects) {
            for (const effect of this._statesEffects) {
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
                    case "PoisonEffect":
                        this.health -= 3;
                        break;
                    case "Sleeping":
                        this.physicalStrength += 5;
                        if(this.states!="Sleep")
                            removeStatusEffect("Sleeping")
                        break;
                    case " ":
                        break;
                    default:
                        console.log("未知效果: " + effect);
                        break;
            }}
        }else {
            console.error('statesEffects is undefined or null');
        }
    }
    //死亡時歸零
    death() {
        this.states = "Dead";
        this._statesEffects={}
        console.log(this.user.name + "死亡");
        // 處理死亡相關的操作
    }

    //復活時全滿
    resurrect() {
        // 復活玩家的方法
        if (this.states === "Dead") {
            this.states = "Live";
            this.health = 10; // 復活時恢復十點生命值
            this._statesEffects = States.DEFAULT_STATES_EFFECTS
            console.log(this.user.name + "已復活");
        } else {
            console.log(this.user.name + "未死亡，無需復活");
        }
    }

    Update(){
        //判斷是否死亡
        console.log(this); // 调试输出，检查 this 指向
        if (!this._statesEffects) {
            console.error('States 实例中找不到 _statesEffects 属性。');
            return; // 如果找不到 _statesEffects，提前退出函数
            }
        if (this.states === "Dead"){
            return;
        }
        else if (this.states === "Disappeared"){
            death()
            return;
        }
        else if (this.states === "Sleep")
            this.addStatusEffect("Sleeping");
        
        this.BringStatusEffect()
    }
}