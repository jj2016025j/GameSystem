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
  