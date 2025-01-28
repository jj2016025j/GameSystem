import { PlayerData } from "./playerData.js";
import { States } from "../player/States.js";
import { Backpack } from "../backpack/backpack.js";

// 定義 Player 類別
export class Player {
    constructor() {
        this.name = PlayerData.name;
        this.id = "";
        this.states = new States(this, PlayerData.states);
        this.backpack = new Backpack(this, PlayerData.backpack);
        this.time = new Date().toISOString();
        this.skillList = [...PlayerData.skillList];
        this.location = PlayerData.location || "Unknown";
    }

    death() {
        console.log(`${this.name} 已死亡`);
        GameSystem.death(this);
    }
}