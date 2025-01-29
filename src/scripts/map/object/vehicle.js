
// **交通工具 (Vehicle)**
class Vehicle extends MapObject {
    constructor({ id, name, description, quantity = 1, capacity = 4 }) {
        super({ id, name, description, quantity });
        this.capacity = capacity;
    }

    boardPassengers(passengers) {
        if (passengers <= this.capacity) {
            console.log(`成功登上 ${this.name}，乘客數: ${passengers}`);
        } else {
            console.log(`${this.name} 無法承載 ${passengers} 名乘客，最大容量: ${this.capacity}`);
        }
    }
}