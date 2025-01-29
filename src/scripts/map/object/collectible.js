
// **可採集物件 (Collectible)**
class Collectible extends MapObject {
    constructor({ id, name, description, quantity = 1, value = 10 }) {
        super({ id, name, description, quantity });
        this.value = value; // 物品價值
    }

    collect() {
        if (this.quantity > 0) {
            this.quantity -= 1;
            console.log(`收集了一個 ${this.name}，剩餘數量: ${this.quantity}`);
        } else {
            console.log(`${this.name} 已經被採集完了!`);
        }
    }
}