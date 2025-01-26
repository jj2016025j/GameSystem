// 定義 States 類別
export class States {
    constructor(user, initialState) {
        this.user = user;
        this.health = initialState.health;
        this.mana = initialState.mana;
        this.saturation = initialState.saturation || 100;
        this.mood = initialState.mood || 100;
        this.bodyStrength = initialState.bodyStrength || 100;
        this.effects = [...initialState.effects || []];
        this.experience = 0;
        this.level = initialState.level || 1;
        this.state = initialState.state;
    }

    takeDamage(amount) {
        if (this.state !== "死亡") {
            this.health = Math.max(0, this.health - amount);
            if (this.health === 0) this.death();
        }
    }

    healing(amount) {
        if (this.state !== "死亡") {
            this.health = Math.min(States.MAX_HEALTH, this.health + amount);
        }
    }

    gainExperience(amount) {
        if (this.state !== "死亡") {
            this.experience += amount;
            while (this.experience >= 100) {
                this.levelUp();
            }
        }
    }

    levelUp() {
        this.level = Math.min(States.MAX_LEVEL, this.level + 1);
        this.health = States.MAX_HEALTH;
        this.mana = States.MAX_MANA;
        this.saturation = States.MAX_SATURATION;
        this.mood = States.MAX_MOOD;
        this.bodyStrength = States.MAX_BODY_STRENGTH;
        this.effects = [...States.DEFAULT_EFFECTS];
        this.experience = this.experience - 100;
        console.log(`${this.user.name} 升級到 Level ${this.level}`);
    }

    addEffect(effect) {
        if (!this.effects.includes(effect)) {
            this.effects.push(effect);
        }
    }

    removeEffect(effect) {
        this.effects = this.effects.filter(e => e !== effect);
    }

    death() {
        this.state = "死亡";
        this.effects = [];
        console.log(`${this.user.name} 已死亡`);
    }

    resurrect() {
        if (this.state === "死亡") {
            this.state = "Live";
            this.health = 10;
            this.effects = [...States.DEFAULT_EFFECTS];
            console.log(`${this.user.name} 已復活`);
        }
    }

    update() {
        if (this.state === "死亡") return;

        this.effects.forEach(effect => {
            switch (effect) {
                case "RestoreHealth":
                    this.health = Math.min(States.MAX_HEALTH, this.health + 1);
                    break;
                case "BeginHungry":
                    this.saturation = Math.max(0, this.saturation - 1);
                    if (this.saturation === 0) this.takeDamage(20);
                    break;
                case "PoisonEffect":
                    this.takeDamage(3);
                    break;
                default:
                    console.log(`未知效果: ${effect}`);
            }
        });
    }
}