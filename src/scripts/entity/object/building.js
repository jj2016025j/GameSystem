
// **建築物 (Building)**
class Building extends MapObject {
    constructor({ id, name, description, quantity = 1, functionType = "商店" }) {
        super({ id, name, description, quantity });
        this.functionType = functionType; // 建築功能，如商店、旅館等
    }

    enter() {
        console.log(`進入 ${this.name}，這是一個 ${this.functionType}。`);
    }
}