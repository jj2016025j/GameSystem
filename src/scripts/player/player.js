import { defaultPlayerData } from "./playerData.js";
import { StatesManager } from "./state/statesManager.js";
import { BackpackManager } from "../backpack/backpackManager.js";
import { SkillManager } from "../skill/skill.js";
import { EventManager } from "../utils/eventManager.js";
import { usePlayerStore } from "../store/playerStore.js";

export class Player {
    constructor(gameManager, initPlayerData = {}) {
        this.gameManager = gameManager;

        // 初始化基礎屬性
        const playerData = { ...defaultPlayerData, ...initPlayerData };

        this.store = usePlayerStore(); // Vuex / Pinia 狀態管理
        this.store.setPlayerData(playerData);

        this.name = playerData.name;
        this.id = defaultPlayerData.id || "fake_id";
        this.time = new Date().toISOString();
        this.location = defaultPlayerData.location;

        // 模塊化管理
        this.states = new StatesManager(this, playerData.states);
        this.backpack = new BackpackManager(this, playerData.backpack);
        this.skill = new SkillManager(this, playerData.skillList);

        // ✅ 事件管理
        this.events = new EventManager();

        // ✅ 行為管理
        this.behavior = new BehaviorManager(this, this.events);
    }

    // 初始化事件
    initializeEvents() {
        this.events.on("death", ({ player }) => {
            console.log(`💀 [死亡] ${player.name} 已死亡`);
        });

        this.events.on("move", ({ player, oldLocation, newLocation }) => {
            console.log(`🚶 [移動] ${player.name} 從 ${oldLocation} 移動到 ${newLocation}`);
        });

        this.events.on("skillUsed", ({ skill, target }) => {
            const targetName = target?.name ?? "未知目標";
            console.log(`✨ [技能] ${player.name} 使用 ${skill.name} 對 ${targetName}`);
        });
    }


    // 獲取玩家基礎數據（調試用）
    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            location: this.location,
            states: this.states.getState(),
            backpack: this.backpack.getItems(),
            skills: this.skill.listUnlockedSkills(),
        };
    }

    toJSON() {
        try {
            return {
                name: this.name,
                id: this.id,
                location: this.location,
                states: this.states?.getSerializableData(),
                inventory: this.inventory?.getSerializableData(),
                skills: this.skill?.getSerializableData(),
            };
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }

}
