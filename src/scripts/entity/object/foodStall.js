
// **可食用的物件 (FoodStall)**
class FoodStall extends MapObject {
    constructor({ id, name, description, quantity = 1, foodList = [] }) {
        super({ id, name, description, quantity });
        this.foodList = foodList; // 可販賣的食物
    }

    buyFood(foodName) {
        const foodItem = this.foodList.find(food => food.name === foodName);
        if (foodItem) {
            console.log(`購買了一份 ${foodItem.name}，價格: ${foodItem.price}`);
        } else {
            console.log(`${this.name} 沒有賣 ${foodName}`);
        }
    }
}