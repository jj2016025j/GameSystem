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
  
  // 生物數據
  export const creatureData = [
    new Creature({ id: "forestSpirit", name: "森林精靈", description: "森林中的神秘守護者", quantity: 1 }),
    new Creature({ id: "wildAnimal", name: "野生動物", description: "危險的野生生物", quantity: 2 }),
    new Creature({ id: "seaDragon", name: "海龍", description: "海洋中最大的傳說生物", quantity: 1, specialAttributes: { strength: 50 } }),
    new Creature({ id: "pigeon", name: "城市鴿子", description: "生活在城市中的和平象徵", quantity: 1 }),
    new Creature({ id: "strayCat", name: "流浪貓", description: "城市街道上的神秘居民", quantity: 3 }),
    new Creature({ id: "polarBear", name: "北極熊", description: "極地的強大掠食者", quantity: 2 }),
    new Creature({ id: "seal", name: "海豹", description: "極地的溫順生物", quantity: 1 }),
    new Creature({ id: "tropicalBird", name: "熱帶鳥類", description: "五彩繽紛的熱帶鳥類", quantity: 1 }),
    new Creature({ id: "python", name: "蟒蛇", description: "雨林中的危險捕食者", quantity: 3 }),
    new Creature({ id: "ghostWolf", name: "幽靈狼", description: "迷霧森林中的幽靈般生物", quantity: 2 }),
    new Creature({ id: "forestElf", name: "森林精靈", description: "迷霧森林中的守護者", quantity: 1 })
  ];
  