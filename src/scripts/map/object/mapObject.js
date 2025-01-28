class MapObject {
    constructor({ id, name, description, quantity = 1 }) {
      this.id = id; // 唯一識別碼
      this.name = name; // 物件名稱
      this.description = description; // 物件描述
      this.quantity = quantity; // 數量
    }
  
    interact() {
      console.log(`與物件 ${this.name} 進行互動: ${this.description}`);
    }
  }
  