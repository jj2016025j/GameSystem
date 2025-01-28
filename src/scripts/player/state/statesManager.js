import { DefaultState } from "./defaultState.js";
import { EffectManager } from "./effectManager.js";
import { States } from "./states.js";

export class StatesManager {
    constructor(player, initialState = {}, defaultState = DefaultState) {
        this.player = player;
        this.initialState = initialState;
        this.defaultState = defaultState;

        // 🔹 角色基礎屬性
        this.health = initialState.health ?? defaultState.MAX_HEALTH;
        this.mana = initialState.mana ?? defaultState.MAX_MANA;
        this.saturation = initialState.saturation ?? defaultState.MAX_SATURATION;
        this.experience = initialState.experience ?? 0;
        this.level = initialState.level ?? 1;
        this.state = initialState.state ?? States.ALIVE;

        // 🔹 角色戰鬥屬性
        this.attackPower = initialState.attackPower ?? defaultState.ATTACKPOWER; // 初始攻擊力
        this.defensePower = initialState.defensePower ?? defaultState.DEFENSEPOWER; // 初始防禦力
        this.strength = initialState.strength ?? defaultState.STRENGTH; // 💪 加入力量屬性

        // 🔹 動態最大值
        this.maxHealth = initialState.maxHealth ?? defaultState.MAX_HEALTH;
        this.maxMana = initialState.maxMana ?? defaultState.MAX_MANA;
        this.maxExperience = initialState.maxExperience ?? defaultState.MAX_EXPERIENCE;

        // 🔹 初始化裝備與效果
        this.equippedItems = {};
        this.effectManager = new EffectManager(this, initialState.effectManager ?? defaultState.DEFAULT_EFFECTS);

        // 🔹 初始化預設效果
        this.initializeDefaultEffects();
    }

    // 🔹 初始化預設效果（例如：中毒、回血）
    initializeDefaultEffects() {
        this.effectManager.activeEffects.forEach(effect => {
            this.addEffect(effect.id);
        });
    }

    // 🔹 添加效果
    addEffect(effectId) {
        this.effectManager.addEffect(effectId);
        this.updateCombatStats(); // 更新戰鬥數值
    }

    removeEffect(effectId) {
        if (this.effectManager) {
            this.effectManager.removeEffect(effectId);
        } else {
            console.error("EffectManager 未正確初始化");
        }
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
            console.log(`${this.player.name} 受到 ${reducedDamage} 點傷害`);
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
    levelUp(test = false) {
        this.level = Math.min(this.defaultState.MAX_LEVEL, this.level + 1);
        if (test)
            this.experience -= this.maxExperience;
        else
            this.experience = 0
        this.updateMaxStats();
        this.updateCombatStats(); // 重新計算戰鬥能力
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        console.log(`${this.player.name} 升級到等級 ${this.level}`);
    }
    
    resetLevel() {
        this.level = 1; // 重置等級為 1
        this.experience = 0; // 重置經驗值為 0
        this.health = this.defaultState.MAX_HEALTH; // 重置生命值為最大值
        this.mana = this.defaultState.MAX_MANA; // 重置魔力值為最大值
        this.maxHealth = this.defaultState.MAX_HEALTH; // 重置最大生命值
        this.maxMana = this.defaultState.MAX_MANA; // 重置最大魔力值
        this.maxExperience = this.defaultState.MAX_EXPERIENCE; // 重置升級所需經驗
        this.attackPower = this.defaultState.ATTACKPOWER; // 重置攻擊力
        this.defensePower = this.defaultState.DEFENSEPOWER; // 重置防禦力
        this.strength = this.defaultState.STRENGTH; // 重置力量屬性
        this.equippedItems = {}; // 清空裝備
        this.effectManager.removeAllEffects(); // 清空所有效果
    
        console.log(`${this.player.name} 的等級已重置`);
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
        this.attackPower += attackBonus;
        this.defensePower += defenseBonus;

        // console.log(`更新戰鬥能力：攻擊力 ${this.attackPower}，防禦力 ${this.defensePower}`);
    }

    // 🔹 角色死亡
    death() {
        this.state = this.defaultState.STATES.DEAD;
        this.effectManager.removeAllEffects(); // ✅ 確保效果清空
        console.log(`${this.player.name} 已死亡`);
    }

    // 🔹 角色復活
    resurrect() {
        if (this.state === this.defaultState.STATES.DEAD) {
            this.state = this.defaultState.STATES.ALIVE;
            this.health = Math.floor(this.maxHealth * 0.5);
            this.mana = Math.floor(this.maxMana * 0.3);
            this.effectManager.removeAllEffects(); // ✅ 確保效果清空
            console.log(`${this.player.name} 已復活`);
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

    // 新增 getSerializableData 方法
    getSerializableData() {
        return {
            health: this.health,
            mana: this.mana,
            level: this.level,
            state: this.state,
            maxHealth: this.maxHealth,
            maxMana: this.maxMana,
            attackPower: this.attackPower,
            defensePower: this.defensePower,
        };
    }
}
