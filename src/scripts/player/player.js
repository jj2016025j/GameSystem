import { defaultPlayerData } from "./playerData.js";
import { StatesManager } from "./state/statesManager.js";
import { BackpackManager } from "../backpack/backpackManager.js";
import { SkillManager } from "../skill/skillManager.js";
import { EventEmitter } from "../utils/eventEmitter.js";

export class Player {
    constructor(gameManager, initPlayerData = {}) {
        this.gameManager = gameManager;

        // 初始化基礎屬性
        // console.log(initPlayerData)
        // console.log(defaultPlayerData)
        const playerData = { ...defaultPlayerData, ...initPlayerData };
        console.log(playerData.skillList)
        this.name = playerData.name;
        this.id = defaultPlayerData.id || "fake_id";
        this.time = new Date().toISOString();
        this.location = defaultPlayerData.location;

        // 模塊化管理
        this.states = new StatesManager(this, playerData.states);
        this.backpack = new BackpackManager(this, playerData.backpack);
        this.skillManager = new SkillManager(this, playerData.skillList);
        // console.log(this.states)
        // console.log(this.backpack)
        console.log(this.skillManager)

        // 事件管理
        this.eventEmitter = new EventEmitter();
        this.initializeEvents();
    }

    // 初始化事件
    initializeEvents() {
        this.eventEmitter.on("death", ({ player }) => {
            console.log(`💀 ${player.name} 已死亡`);
        });

        this.eventEmitter.on("move", ({ player, oldLocation, newLocation }) => {
            console.log(`🚶 ${player.name} 從 ${oldLocation} 移動到 ${newLocation}`);
        });

        this.eventEmitter.on("skillUsed", ({ skill, target }) => {
            console.log(`✨ 使用技能 ${skill.name} 對 ${target?.name || "目標"}`);
        });
    }

    // 動態註冊/移除事件監聽器
    on(eventName, handler) {
        this.eventEmitter.on(eventName, handler);
    }

    off(eventName, handler) {
        this.eventEmitter.off(eventName, handler);
    }

    // 觸發事件
    triggerEvent(eventName, payload) {
        try {
            this.eventEmitter.emit(eventName, { player: this, ...payload });
        } catch (err) {
            console.error(`⚠️ 觸發事件 ${eventName} 時發生錯誤: ${err.message}`);
        }
    }

    // 玩家死亡
    death() {
        if (this.states.state === "DEAD") {
            console.log(`⚠️ ${this.name} 已經是死亡狀態`);
            return;
        }
        this.states.state = "DEAD";
        this.triggerEvent("death");
    }

    // 移動到新位置
    moveTo(newLocation) {
        if (newLocation !== this.location) {
            const oldLocation = this.location;
            this.location = newLocation;
            this.triggerEvent("move", { oldLocation, newLocation });
        } else {
            console.log(`⚠️ ${this.name} 已經在 ${newLocation}`);
        }
    }

    // 解鎖技能
    learnSkill(skillId) {
        const success = this.skillManager.learnSkill(skillId);
        if (success) {
            console.log(`🎉 ${this.name} 解鎖新技能：${skillId}`);
        }
    }

    // 使用技能
    useSkill(skillId, target) {
        const skill = this.skillManager.useSkill(skillId, target);
        if (skill) {
            this.triggerEvent("skillUsed", { skill, target });
        }
    }

    // 更新玩家狀態
    update(deltaTime) {
        this.skillManager.updateCooldowns(deltaTime);
        if (typeof this.states.update === "function") {
            this.states.update(deltaTime);
        }
    }

    // 快速設置玩家位置
    setLocation(newLocation) {
        this.location = newLocation;
        console.log(`📍 ${this.name} 的位置設置為 ${newLocation}`);
    }

    // 獲取玩家基礎數據（調試用）
    getPlayerData() {
        return {
            name: this.name,
            id: this.id,
            location: this.location,
            states: this.states.getState(),
            backpack: this.backpack.getItems(),
            skills: this.skillManager.listUnlockedSkills(),
        };
    }

    toJSON() {
        try {
            const statesData = this.states?.getSerializableData ? this.states.getSerializableData() : null;
            const backpackData = this.backpack?.getSerializableData ? this.backpack.getSerializableData() : null;
            const skillsData = this.skillManager?.getSerializableData ? this.skillManager.getSerializableData() : null;

            return {
                name: this.name,
                id: this.id,
                location: this.location,
                states: statesData,
                backpack: backpackData,
                skills: skillsData,
            };
        } catch (err) {
            console.error("序列化錯誤:", err);
            return null;
        }
    }

}
