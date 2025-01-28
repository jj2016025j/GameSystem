import { skillsData } from "./skillsData.js";

export class SkillManager {
    constructor(player, skillList = []) {
        this.player = player; // 關聯玩家實例
        this.availableSkills = skillsData; // 所有可用技能的列表
        this.unlockedSkills = new Map(
            skillList.map(skill => [skill.id, { ...skill }])
        ); // 玩家已解鎖的技能 {skillId: {skillData, cooldown}}
    }

    // 解鎖技能
    learnSkill(skillId) {
        const skill = this.availableSkills.find(s => s.id === skillId);
        if (!skill) {
            console.log(`⚠️ 技能 ${skillId} 不存在`);
            return;
        }
        if (this.unlockedSkills.has(skillId)) {
            console.log(`⚠️ 技能 ${skill.name} 已經解鎖`);
            return;
        }
        this.unlockedSkills.set(skillId, { ...skill, cooldownRemaining: 0 });
        console.log(`✅ 玩家解鎖技能：${skill.name}`);
    }

    // 使用技能
    useSkill(skillId, target) {
        if (!this.unlockedSkills.has(skillId)) {
            console.log(`⚠️ 未解鎖技能：${skillId}`);
            return;
        }
        const skill = this.unlockedSkills.get(skillId);

        // 檢查冷卻時間
        if (skill.cooldownRemaining > 0) {
            console.log(`⏳ 技能 ${skill.name} 還在冷卻中，剩餘 ${skill.cooldownRemaining} 秒`);
            return;
        }

        // 檢查資源（如魔力）
        if (this.player.states.mana < skill.manaCost) {
            console.log(`❌ 魔力不足，無法使用 ${skill.name}`);
            return;
        }

        // 消耗資源並觸發技能效果
        this.player.states.mana -= skill.manaCost;
        console.log(`✨ 使用技能：${skill.name}`);
        this.applySkillEffect(skill, target);

        // 開始冷卻
        skill.cooldownRemaining = skill.cooldown;
    }

    // 應用技能效果
    applySkillEffect(skill, target) {
        if (skill.effects) {
            Object.entries(skill.effects).forEach(([key, value]) => {
                if (key === "damage" && target) {
                    target.states.takeDamage(value);
                    console.log(`🔥 對 ${target.name} 造成 ${value} 點傷害`);
                } else if (key === "heal") {
                    this.player.states.healing(value);
                    console.log(`💖 回復 ${value} 點生命值`);
                } else {
                    console.log(`⚡ 未定義的技能效果：${key}`);
                }
            });
        }
    }

    // 更新技能冷卻時間
    updateCooldowns(deltaTime) {
        this.unlockedSkills.forEach(skill => {
            if (skill.cooldownRemaining > 0) {
                skill.cooldownRemaining = Math.max(0, skill.cooldownRemaining - deltaTime);
            }
        });
    }

    // 查詢技能
    getSkill(skillId) {
        return this.unlockedSkills.get(skillId) || null;
    }

    // 列出所有解鎖的技能
    listUnlockedSkills() {
        return Array.from(this.unlockedSkills.values()).map(skill => skill.name);
    }

    // 返回可序列化的數據
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
