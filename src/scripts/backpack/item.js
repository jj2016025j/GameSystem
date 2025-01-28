// 抽象基類：Item
class Item {
    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.value = data.value;
        this.description = data.description;
        this.quantity = data.quantity;
        this.attributes = data.attributes || {};
    }

    use(states) {
        console.log(`${this.name} 無法直接使用。`);
    }

    equip(states) {
        console.log(`${this.name} 無法裝備。`);
    }

    applyEffect(effectHandler) {
        console.log(`${this.name} 無法直接使用。`);
    }
}

// 食物類別
class Food extends Item {
    use(states) {
        AttributeHandler.apply(this.attributes, states);
        console.log(`使用了食物：${this.name}`);
    }
}

// 藥水類別
class Potion extends Item {
    use(states) {
        AttributeHandler.apply(this.attributes, states); // ✅ 應用一次性影響
        if (this.attributes.effect) {
            states.effectManager.addEffect(this.attributes.effect); // ✅ 交給 EffectManager 處理
        }
        console.log(`使用了 ${this.name}`);
    }
}

// 武器類別
class Weapon extends Item {
    equip(states) {
        if (!this.isBroken()) {
            states.equipItem("Weapon", this.id);
            console.log(`⚔️ ${states.user.name} 裝備了 ${this.name}`);
        } else {
            console.log(`⚠️ ${this.name} 已損壞，無法裝備`);
        }
    }

    use(states) {
        if (!this.isBroken()) {
            this.attributes.durability -= 1;
            console.log(`🗡️ 使用了 ${this.name}，耐久度剩餘 ${this.attributes.durability}`);
            
            if (this.isBroken()) {
                console.log(`⚠️ ${this.name} 已經損壞！`);
                states.equipItem("Weapon", null); // 自動卸下損壞的武器
            }
        } else {
            console.log(`⚠️ ${this.name} 已損壞，無法使用`);
        }
    }

    isBroken() {
        return this.attributes.durability <= 0;
    }

    repair(amount) {
        this.attributes.durability += amount;
        console.log(`🔧 修復了 ${this.name}，耐久度增加 ${amount}，現在為 ${this.attributes.durability}`);
    }
}

  
// 工具類別
class Tool extends Item {
    equip(states) {
        if (!this.isBroken()) {
            states.equipItem("Tool", this.id);
            console.log(`🛠️ ${states.user.name} 裝備了工具 ${this.name}`);
        } else {
            console.log(`⚠️ ${this.name} 已損壞，無法裝備`);
        }
    }

    use(states) {
        if (!this.isBroken()) {
            this.attributes.durability -= 1;
            console.log(`🔨 使用了 ${this.name}，耐久度剩餘 ${this.attributes.durability}`);
            
            if (this.isBroken()) {
                console.log(`⚠️ ${this.name} 已損壞，無法繼續使用`);
            }
        } else {
            console.log(`⚠️ ${this.name} 已損壞，無法使用`);
        }
    }

    isBroken() {
        return this.attributes.durability <= 0;
    }

    repair(amount) {
        this.attributes.durability += amount;
        console.log(`🔧 修復了工具 ${this.name}，耐久度增加 ${amount}，現在為 ${this.attributes.durability}`);
    }
}

