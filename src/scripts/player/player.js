import { PlayerData } from "../data/data.js";
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

    acquireItems(items) {
        return this.backpack.addItems(items);
    }

    removeItems(items) {
        return this.backpack.removeItems(items);
    }

    useItems(item) {
        return this.backpack.useItems(item);
    }

    buyItems(seller, itemsToBuy, pricePerItem, isShop = false) {
        return this.backpack.buyItems(seller.backpack, itemsToBuy, pricePerItem, isShop);
    }

    sellItems(buyer, itemsToSell, pricePerItem, isShop = false) {
        return this.backpack.sellItems(buyer.backpack, itemsToSell, pricePerItem, isShop);
    }

    useSkill(skillName) {
        const skill = this.skillList.find(s => s.name === skillName);
        if (skill) {
            console.log(`${this.name} 正在使用技能: ${skillName}`);
            // 技能使用邏輯可以在這裡擴展
        } else {
            console.log(`${this.name} 未學會技能 ${skillName}`);
        }
    }

    addSkill(skillListToAdd) {
        const skills = Array.isArray(skillListToAdd)
            ? skillListToAdd
            : Object.entries(skillListToAdd).map(([name, description]) => ({ name, description }));

        skills.forEach(skill => {
            if (!this.skillList.some(s => s.name === skill.name)) {
                this.skillList.push({ ...skill });
            }
        });
    }

    attack(target) {
        return target.getHurt(10);
    }

    getHurt(amount) {
        return this.states.takeDamage(amount);
    }

    heal(amount) {
        return this.states.healing(amount);
    }

    death() {
        console.log(`${this.name} 已死亡`);
        GameSystem.death(this);
    }
}