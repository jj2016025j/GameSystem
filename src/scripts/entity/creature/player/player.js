import { defaultPlayerData } from "./playerData.js";
import { Skill } from "../Skill/Skill.js";
import { EventManager } from "../../../utils/eventManager.js";
import { BehaviorManager } from "../../state/BehaviorManager.js";
import { Creature } from "../Creature.js";
import { CreatureState } from "../CreatureState.js";
import { Inventory } from "../../../Inventory/Inventory.js";
import { SystemLog } from "../../../utils/SystemLog.js";

/**
 * 玩家類別
 * - 繼承 Creature
 */
export class Player extends Creature {
    constructor(gameManager, initPlayerData = {}) {
        const playerData = { ...defaultPlayerData, ...initPlayerData };

        super({
            id: playerData.id || "fake_id",
            name: playerData.name,
            state: playerData.state,
            inventory: new Inventory(gameManager, playerData.inventory),
        });

        this.gameManager = gameManager;
        this.skillList = new Set(playerData.skillList); // ✅ 只存技能 ID

        this.events = new EventManager();
        this.behavior = new BehaviorManager(this, this.events);

        this.initializeEvents();
    }

    initializeEvents() {
        this.events.on("death", () => {
            SystemLog.addMessage(`💀 [死亡] ${this.name} 已死亡`);
        });

        this.events.on("move", ({ oldLocation, newLocation }) => {
            SystemLog.addMessage(`🚶 [移動] ${this.name} 從 ${oldLocation} 移動到 ${newLocation}`);
        });

        this.events.on("skillUsed", ({ skillId, target }) => {
            const skill = this.gameManager.skillManager.getSkillById(skillId);
            if (skill) {
                SystemLog.addMessage(`✨ [技能] ${this.name} 使用 ${skill.name} 對 ${target?.name || "未知目標"}`);
            } else {
                SystemLog.addMessage(`⚠️ 技能 ID ${skillId} 不存在`);
            }
        });
    }

    getSkillList() {
        return Array.from(this.skillList); // ✅ 只回傳技能 ID
    }

    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            state: this.state.getSerializableData(),
            inventory: this.inventory.getSerializableData(),
            skillList: this.getSkillList(),
        };
    }

    toJSON() {
        try {
            return this.getPlayerData();
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }
}
