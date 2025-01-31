import { defaultPlayerData } from "./playerData.js";
import { Skill } from "../Skill/Skill.js";
import { EventManager } from "../../../utils/eventManager.js";
import { BehaviorManager } from "../behavior/behaviorManager.js"; // ✅ 確保 BehaviorManager 存在
import { Creature } from "../Creature.js";

export class Player extends Creature {
    constructor(gameManager, initPlayerData = {}) {
        // ✅ 先調用 super()
        const playerData = { ...defaultPlayerData, ...initPlayerData };
        super({
            id: playerData.id || "fake_id",
            name: playerData.name,
            location: playerData.location
        });

        this.gameManager = gameManager; // ✅ `super()` 之後再賦值

        this.skill = new Skill(this, playerData.skillList);

        // ✅ 事件管理
        this.events = new EventManager();

        // ✅ 行為管理
        this.behavior = new BehaviorManager(this, this.events);

        // ✅ 初始化事件
        this.initializeEvents();
    }

    // ✅ 修正錯誤：事件應該使用 `this` 而非 `player`
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

    // ✅ 修正 `getPlayerData()`，使用 `getSerializableData()`
    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            location: this.location,
            states: this.states.getSerializableData(), // ✅ 確保與存檔格式一致
            inventory: this.inventory.getSerializableData(),
            skills: this.skill.getSerializableData(),
        };
    }

    // ✅ 確保存檔 JSON 不會丟失關鍵資料
    toJSON() {
        try {
            return this.getPlayerData();
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }
}
