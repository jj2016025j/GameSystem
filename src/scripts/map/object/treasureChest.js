class TreasureChest extends MapObject {
    constructor({ id, name, description, quantity, rewards = [] }) {
      super({ id, name, description, quantity });
      this.rewards = rewards; // 獎勵列表
      this.isOpened = false; // 是否已開啟
    }
  
    interact() {
      if (this.isOpened) {
        console.log(`寶箱 ${this.name} 已被打開，裡面空無一物。`);
        return;
      }
  
      this.isOpened = true;
      console.log(`打開了寶箱 ${this.name}，獲得了:`);
      this.rewards.forEach((reward) => {
        console.log(`- ${reward.quantity} x ${reward.name}`);
      });
    }
  }
  
// **寶箱 (TreasureChest)** - 可開啟獲取物品
class TreasureChest extends MapObject {
  constructor({ id, name, description, quantity = 1, contents = [] }) {
      super({ id, name, description, quantity });
      this.contents = contents; // 寶箱內的物品
      this.isOpened = false; // 是否已開啟
  }

  open() {
      if (this.isOpened) {
          console.log(`${this.name} 已經被打開過了，裡面沒有東西了。`);
      } else {
          this.isOpened = true;
          console.log(`打開 ${this.name}，獲得物品:`, this.contents);
      }
  }
}
