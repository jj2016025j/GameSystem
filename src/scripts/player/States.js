import { DefaultState } from "./defaultState.js";
import { EffectManager } from "./effectManager.js";

export class States {
    constructor(user, initialState, defaultState = DefaultState) {
        this.user = user;
        this.defaultState = defaultState;

        // 🔹 角色基礎屬性
        this.health = initialState.health ?? defaultState.MAX_HEALTH;
        this.mana = initialState.mana ?? defaultState.MAX_MANA;
        this.saturation = initialState.saturation ?? defaultState.MAX_SATURATION;
        this.experience = initialState.experience ?? 0;
        this.level = initialState.level ?? 1;
        this.state = initialState.state ?? defaultState.STATES.ALIVE;

        // 🔹 角色戰鬥屬性
        this.attackPower = 10; // 初始攻擊力
        this.defensePower = 5; // 初始防禦力
        this.strength = initialState.strength ?? 10; // 💪 加入力量屬性

        // 🔹 動態最大值
        this.maxHealth = defaultState.MAX_HEALTH;
        this.maxMana = defaultState.MAX_MANA;
        this.maxExperience = defaultState.MAX_EXPERIENCE;

        this.equippedItems = {};
        this.effectManager = new EffectManager(this, defaultState.AVAILABLE_EFFECTS);

        // 初始化預設效果
        this.initializeDefaultEffects();
    }

    // 🔹 初始化預設效果（例如：中毒、回血）
    initializeDefaultEffects() {
        this.defaultState.DEFAULT_EFFECTS.forEach(effect => {
            this.addEffect(effect.id);
        });
    }

    // 🔹 添加效果
    addEffect(effectId) {
        this.effectManager.addEffect(effectId);
        this.updateCombatStats(); // 更新戰鬥數值
    }

    // 🔹 更新所有效果
    updateEffects() {
        this.effectManager.updateEffects();
        this.updateCombatStats(); // 確保效果影響戰鬥數值
    }

    // 🔹 角色受到傷害（考慮防禦力）
    takeDamage(amount) {
        if (this.state !== this.defaultState.STATES.DEAD) {
            const reducedDamage = Math.max(1, amount - this.defensePower);
            this.health = Math.max(0, this.health - reducedDamage);
            console.log(`${this.user.name} 受到 ${reducedDamage} 點傷害`);
            if (this.health === 0) this.death();
        }
    }

    // 🔹 恢復生命值
    healing(amount) {
        if (this.state !== this.defaultState.STATES.DEAD) {
            this.health = Math.min(this.maxHealth, this.health + amount);
        }
    }

    // 🔹 獲取經驗值
    gainExperience(amount) {
        if (this.state !== this.defaultState.STATES.DEAD) {
            this.experience += amount;
            while (this.experience >= this.maxExperience) {
                this.levelUp();
            }
        }
    }

    // 🔹 角色升級
    levelUp() {
        this.level = Math.min(this.defaultState.MAX_LEVEL, this.level + 1);
        this.updateMaxStats();
        this.updateCombatStats(); // 重新計算戰鬥能力
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        this.experience -= this.maxExperience;
        console.log(`${this.user.name} 升級到等級 ${this.level}`);
    }

    // 🔹 更新角色屬性
    updateMaxStats() {
        this.maxHealth = Math.floor(this.maxHealth * 1.1);
        this.maxMana = Math.floor(this.maxMana * 1.1);
        this.maxExperience = Math.floor(this.maxExperience * 1.2); // 隨等級增加經驗需求
    }

    // 🔹 更新攻擊力與防禦力
    updateCombatStats() {
        let attackBonus = 0;
        let defenseBonus = 0;

        // 檢查裝備的武器
        if (this.equippedItems["Weapon"]) {
            attackBonus += this.defaultState.ITEMS[this.equippedItems["Weapon"]]?.attributes?.damage ?? 0;
        }

        // 檢查裝備的護甲
        if (this.equippedItems["Armor"]) {
            defenseBonus += this.defaultState.ITEMS[this.equippedItems["Armor"]]?.attributes?.defense ?? 0;
        }

        // 根據等級增加基礎攻擊力與防禦力
        this.attackPower = 10 + this.level * 2 + attackBonus;
        this.defensePower = 5 + this.level * 1.5 + defenseBonus;

        console.log(`更新戰鬥能力：攻擊力 ${this.attackPower}，防禦力 ${this.defensePower}`);
    }

    // 🔹 角色死亡
    death() {
        this.state = this.defaultState.STATES.DEAD;
        this.effectManager.removeAllEffects(); // ✅ 確保效果清空
        console.log(`${this.user.name} 已死亡`);
    }

    // 🔹 角色復活
    resurrect() {
        if (this.state === this.defaultState.STATES.DEAD) {
            this.state = this.defaultState.STATES.ALIVE;
            this.health = Math.floor(this.maxHealth * 0.5);
            this.mana = Math.floor(this.maxMana * 0.3);
            this.effectManager.removeAllEffects(); // ✅ 確保效果清空
            console.log(`${this.user.name} 已復活`);
        }
    }

    // 🔹 裝備物品（包含攻擊力與防禦力計算）
    equipItem(slot, itemName) {
        const itemData = this.defaultState.ITEMS[itemName];

        // 檢查物品是否存在
        if (!itemData) {
            console.log(`⚠️ 物品 ${itemName} 無法裝備，可能不存在`);
            return;
        }

        // 檢查物品是否為裝備類型
        if (!["Weapon", "Armor", "Tool"].includes(itemData.type)) {
            console.log(`⚠️ ${itemName} 不是可裝備的類型，無法裝備`);
            return;
        }

        // 檢查物品是否損壞
        if (itemData.attributes?.durability <= 0) {
            console.log(`⚠️ ${itemName} 已損壞，無法裝備`);
            return;
        }

        // 裝備物品
        this.equippedItems[slot] = itemName;
        console.log(`✅ ${slot} 裝備了 ${itemName}`);

        // 更新戰鬥屬性
        this.updateCombatStats();
    }
}
