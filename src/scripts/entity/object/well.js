class Well extends MapObject {
    constructor({ id, name, description, quantity, refillAmount = 10 }) {
      super({ id, name, description, quantity });
      this.refillAmount = refillAmount; // 補充量
    }
  
    interact(player) {
      console.log(`使用井 ${this.name}，補充了 ${this.refillAmount} 點水分。`);
      player.states.saturation = Math.min(
        player.states.maxSaturation,
        player.states.saturation + this.refillAmount
      );
    }
  }
  // **水井 (Well)** - 可補充水分
class Well extends MapObject {
  constructor({ id, name, description, quantity = 1, waterAmount = 100 }) {
      super({ id, name, description, quantity });
      this.waterAmount = waterAmount; // 水量
  }

  drawWater(amount) {
      if (this.waterAmount >= amount) {
          this.waterAmount -= amount;
          console.log(`從 ${this.name} 取出 ${amount} 喝水，剩餘水量: ${this.waterAmount}`);
      } else {
          console.log(`${this.name} 的水不夠用了!`);
      }
  }
}