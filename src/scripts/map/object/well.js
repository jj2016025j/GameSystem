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
  