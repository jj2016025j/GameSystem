// 生物類別
class Creature {
    constructor({ id, name, description = "", quantity = 1, specialAttributes = {} }) {
      this.id = id; // 唯一 ID
      this.name = name; // 生物名稱
      this.description = description; // 生物描述
      this.quantity = quantity; // 數量
      this.specialAttributes = specialAttributes; // 特殊屬性（如攻擊力、防禦力等）
    }
  
    // 方法：返回生物的完整描述
    getDetails() {
      return `${this.name} (數量: ${this.quantity}) - ${this.description}`;
    }
  
    // 方法：更新數量
    updateQuantity(amount) {
      this.quantity = Math.max(0, this.quantity + amount);
    }
  }
  
  