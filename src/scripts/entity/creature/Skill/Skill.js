import { skillsData } from "./skillsData.js";

export class Skill {
    constructor(player, skillList = new Map()) {
        this.player = player; // 關聯玩家實例
        this.availableSkills = new Map(skillsData.map(skill => [skill.id, skill])); // ✅ 將技能轉為 Map，提高查找效率
        this.unlockedSkills = new Map(skillList); // ✅ 直接使用 Map

        // 初始化所有技能冷卻時間
        this.unlockedSkills.forEach((skill, skillId) => {
            this.unlockedSkills.set(skillId, { ...skill, cooldownRemaining: 0 });
        });
    }

    // 🔹 是否已解鎖技能
    hasSkill(skillId) {
        return this.unlockedSkills.has(skillId);
    }

    // 🔹 解鎖技能
    learnSkill(skillId) {
        if (!this.availableSkills.has(skillId)) {
            console.log(`⚠️ 技能 ${skillId} 不存在`);
            return false;
        }
        if (this.hasSkill(skillId)) {
            console.log(`⚠️ 技能 ${this.availableSkills.get(skillId).name} 已經解鎖`);
            return false;
        }

        const skill = this.availableSkills.get(skillId);
        this.unlockedSkills.set(skillId, { ...skill, cooldownRemaining: 0 });
        console.log(`✅ 玩家解鎖技能：${skill.name}`);
        return true;
    }

    // 🔹 使用技能
    useSkill(skillId, target) {
        if (!this.hasSkill(skillId)) {
            console.log(`⚠️ 未解鎖技能：${skillId}`);
            return false;
        }

        const skill = this.unlockedSkills.get(skillId);

        if (skill.cooldownRemaining > 0) {
            console.log(`⏳ 技能 ${skill.name} 還在冷卻中，剩餘 ${skill.cooldownRemaining} 秒`);
            return false;
        }

        if (this.player.states.mana < skill.manaCost) {
            console.log(`❌ 魔力不足，無法使用 ${skill.name}`);
            return false;
        }

        // 消耗魔力並觸發技能效果
        this.player.states.mana -= skill.manaCost;
        console.log(`✨ 使用技能：${skill.name}`);
        this.applySkillEffect(skill, target);

        // 設置冷卻時間
        skill.cooldownRemaining = skill.cooldown;
        return true;
    }

    // 🔹 應用技能效果
    applySkillEffect(skill, target) {
        if (!skill.effects) return;

        Object.entries(skill.effects).forEach(([key, value]) => {
            switch (key) {
                case "damage":
                    if (target) {
                        target.states.takeDamage(value);
                        console.log(`🔥 對 ${target.name} 造成 ${value} 點傷害`);
                    }
                    break;
                case "heal":
                    this.player.states.healing(value);
                    console.log(`💖 回復 ${value} 點生命值`);
                    break;
                default:
                    console.log(`⚡ 未定義的技能效果：${key}`);
                    break;
            }
        });
    }

    // 🔹 更新技能冷卻時間
    updateCooldowns(deltaTime) {
        this.unlockedSkills.forEach((skill, skillId) => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - deltaTime);
            }
        });
    }

    // 🔹 查詢技能
    getSkill(skillId) {
        return this.unlockedSkills.get(skillId) || null;
    }

    // 🔹 列出所有已解鎖的技能
    listUnlockedSkills() {
        return Array.from(this.unlockedSkills.values()).map(skill => skill.name);
    }

    // 🔹 返回可序列化的數據
    getSerializableData() {
        return {
            unlockedSkills: Array.from(this.unlockedSkills.entries()).map(([id, skill]) => ({
                id,
                name: skill.name,
                level: skill.level || 1,
                cooldownRemaining: skill.cooldownRemaining,
            })),
        };
    }
}
