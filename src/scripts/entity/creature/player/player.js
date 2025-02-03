import { defaultPlayerData } from "./playerData.js";
import { Skill } from "../Skill/Skill.js";
import { EventManager } from "../../../utils/eventManager.js";
import { BehaviorManager } from "../../state/BehaviorManager.js";
import { Creature } from "../Creature.js";
import { CreatureState } from "../CreatureState.js";

/**
 * 玩家類別
 * - 繼承 Creature
 */
export class Player extends Creature {
    constructor(gameManager, initPlayerData = {}) {
        const playerData = { ...defaultPlayerData, ...initPlayerData };

        // ✅ 先呼叫 super()，確保 state & inventory 正確初始化
        super({
            id: playerData.id || "fake_id",
            name: playerData.name,
            state: playerData.state, // ✅ 修正傳遞 state
            inventory: playerData.inventory,
        });

        this.gameManager = gameManager; // ✅ `super()` 之後再賦值

        // ✅ 使用 Skill
        this.state = new CreatureState(this, this.state); // ✅ 使用 CreatureState
        this.skillList = new Skill(this, playerData.skillList);

        // ✅ 初始化事件管理
        this.events = new EventManager();
        this.behavior = new BehaviorManager(this, this.events);

        // ✅ 初始化事件監聽
        this.initializeEvents();
    }

    // ✅ 修正事件監聽
    initializeEvents() {
        this.events.on("death", () => {
            console.log(`💀 [死亡] ${this.name} 已死亡`);
        });

        this.events.on("move", ({ oldLocation, newLocation }) => {
            console.log(`🚶 [移動] ${this.name} 從 ${oldLocation} 移動到 ${newLocation}`);
        });

        this.events.on("skillUsed", ({ skill, target }) => {
            const targetName = target?.name ?? "未知目標";
            console.log(`✨ [技能] ${this.name} 使用 ${skill.name} 對 ${targetName}`);
        });
    }

    // ✅ 取得玩家存檔資料
    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            state: this.state.getSerializableData(), // ✅ 確保與存檔格式一致
            inventory: this.inventory.getSerializableData(),
            skillList: this.skillList.getSerializableData(),
        };
    }

    // ✅ 確保存檔 JSON 正確
    toJSON() {
        try {
            return this.getPlayerData();
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }
}
