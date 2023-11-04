class Status {
    constructor() {
        // 初始化玩家的基本屬性
        this.health = 100;//
        this.mana = 50;//
        this.level = 1;
        this.experience = 0;
        this.statusEffects = []; // 存儲狀態效果的列表
        this.isDead = false;

        this.saturation = 100;//
        this.mood = 100;//
        this.physicalStrength = 100;//
        this.isSleeping = false;
        this.lowHealth = false;
        this.lowSaturation = false;
        this.poorMood = false;
        this.lackOfPhysicalStrength = false;
        this.moodChangeValue = 5;
        this.stats = "Live";
    }

    setHealth(value) {
        this.health = Math.max(0, Math.min(100, value));
        if (this.health === 0) {
            this.death();
        }
    }

    setMana(value) {
        this.mana = Math.max(0, Math.min(100, value));
    }

    setSaturation(value) {
        this.saturation = Math.max(0, Math.min(100, value));
        if (this.saturation === 0) {
            this.health -= 20;
        }
    }

    setMood(value) {
        this.mood = Math.max(0, Math.min(100, value));
        if (this.mood === 0) {
            this.stats = "Disappeared";
        }
    }

    setPhysicalStrength(value) {
        this.physicalStrength = Math.max(0, Math.min(100, value));
        if (this.physicalStrength === 0) {
            this.stats = "Sleep";
        }
    }

    healthChange(player, value = 50) {
        this.setHealth(this.health + value);
        console.log(`${player} 的健康狀態提升了！`);
    }

    //變不健康


    //變餓

    //變飽

    takeBreak(player, value = 100) {
        this.setPhysicalStrength(this.physicalStrength + 100);
        console.log(`${player} 正在休息並恢復體力。`);
    }

    depletePower(player, value = 10) {
        this.setPhysicalStrength(this.physicalStrength - value);
        console.log(`${player} 逐漸耗盡體力...`);
    }

    moodChange(player, thing) {
        if (thing.isGood) {
            this.setMood(this.mood + this.moodChangeValue);
            console.log(`${player} 的心情變得更好了！`);
        } else if (!thing.isGood) {
            this.setMood(this.mood - this.moodChangeValue);
            console.log(`${player} 的心情變得不太好...`);
        }
    }

    death() {
        this.stats = "Dead";
        // 處理死亡相關的操作
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

    useMana(cost) {
        // 使用魔法值的方法
        if (!this.isDead) {
            if (this.mana >= cost) {
                this.mana -= cost;
                console.log("使用了 " + cost + " 魔法值");
            } else {
                console.log("魔法值不足");
            }
        } else {
            console.log("玩家已死亡，無法使用魔法");
        }
    }

    gainExperience(amount) {
        // 獲得經驗值的方法
        if (!this.isDead) {
            this.experience += amount;
            if (this.experience >= 100) {
                this.levelUp();
            }
        } else {
            console.log("玩家已死亡，無法獲得經驗值");
        }
    }

    levelUp() {
        // 升級角色的方法
        this.level += 1;
        this.experience = 0;
        this.health = 100; // 升級時恢復生命值
        this.mana = 50; // 升級時恢復魔法值
        this.isDead = false;
        console.log("玩家升級到 Level " + this.level);
    }

    addStatusEffect(effect) {
        // 添加狀態效果的方法
        if (!this.isDead) {
            this.statusEffects.push(effect);
            console.log("玩家受到 " + effect + " 效果的影響");
        } else {
            console.log("玩家已死亡，無法添加狀態效果");
        }
    }

    removeStatusEffect(effect) {
        // 移除狀態效果的方法
        if (!this.isDead) {
            const index = this.statusEffects.indexOf(effect);
            if (index !== -1) {
                this.statusEffects.splice(index, 1);
                console.log("玩家解除了 " + effect + " 效果");
            }
        } else {
            console.log("玩家已死亡，無法移除狀態效果");
        }
    }

    resurrect() {
        // 復活玩家的方法
        if (this.isDead) {
            this.isDead = false;
            this.health = 1; // 復活時恢復一點生命值
            console.log("玩家已復活");
        } else {
            console.log("玩家未死亡，無需復活");
        }
    }
}

// 創建玩家角色
const status1 = new Status();

// 測試玩家的屬性和狀態腳本
status1.takeDamage(20);
status1.useMana(10);
status1.gainExperience(50);
status1.addStatusEffect("毒");
status1.levelUp();
status1.removeStatusEffect("毒");
status1.resurrect(); // 測試復活方法

// 創建一個玩家屬性和狀態實例
const status2 = new Status();

// 測試功能
status2.healthChange("玩家1", 20);
status2.eatFood("玩家1", "蘋果");
status2.takeBreak("玩家1");
status2.depletePower("玩家1");
status2.moodChange("玩家1", { isGood: true });
status2.death();