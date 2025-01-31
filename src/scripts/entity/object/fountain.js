
// **噴泉 (Fountain)** - 可恢復體力
class Fountain extends MapObject {
    constructor({ id, name, description, quantity = 1, restoreAmount = 10 }) {
        super({ id, name, description, quantity });
        this.restoreAmount = restoreAmount;
    }

    restore() {
        console.log(`${this.name} 的水讓你恢復了 ${this.restoreAmount} 點體力!`);
    }
}