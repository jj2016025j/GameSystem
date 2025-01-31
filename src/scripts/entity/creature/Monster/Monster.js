import { CreatureState } from "./creatureState.js";

export class Monster {
    constructor(monsterData = {}) {
        this.name = monsterData.name ?? "未知怪物";
        this.id = monsterData.id ?? "monster_id";

        // 🔹 使用 CreatureState 管理狀態
        this.state = new CreatureState(this, monsterData.states);
    }

    attack(target) {
        if (!target.state.alive) {
            console.log(`${target.name} 已死亡，無法攻擊`);
            return;
        }
        console.log(`${this.name} 攻擊 ${target.name}`);
        target.state.takeDamage(this.state.attackPower);
    }
}
