import { EntityState } from "./entityState.js";

export class CreatureState extends EntityState {
    constructor(entity, stateConfig = {}) {
        super(entity, stateConfig);

        // 🔹 生物專屬屬性
        this.level = stateConfig.level ?? 1;
        this.experience = stateConfig.experience ?? 0;
        this.attackPower = stateConfig.attackPower ?? 10;
        this.defensePower = stateConfig.defensePower ?? 5;
        this.maxExperience = stateConfig.maxExperience ?? 100;
        this.maxLevel = stateConfig.maxLevel ?? 100;
    }

    // 🔹 獲取經驗值
    gainExperience(amount) {
        if (!this.alive) return;
        this.experience += amount;
        while (this.experience >= this.maxExperience) {
            this.levelUp();
        }
    }

    // 🔹 升級
    levelUp() {
        if (this.level >= this.maxLevel) return;
        this.level += 1;
        this.experience = 0;
        this.maxHealth = Math.floor(this.maxHealth * 1.1);
        this.maxMana = Math.floor(this.maxMana * 1.1);
        this.maxExperience = Math.floor(this.maxExperience * 1.2);
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        console.log(`${this.entity.name} 升級到等級 ${this.level}`);
    }

    // 🔹 受傷（計算防禦力）
    takeDamage(amount) {
        if (!this.alive) return;
        const reducedDamage = Math.max(1, amount - this.defensePower);
        super.takeDamage(reducedDamage);
    }

    // 🔹 獲取序列化數據
    getSerializableData() {
        return {
            ...super.getSerializableData(),
            level: this.level,
            experience: this.experience,
            attackPower: this.attackPower,
            defensePower: this.defensePower,
            maxExperience: this.maxExperience
        };
    }
}
