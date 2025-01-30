class FarmLand{
    constructor(name) {
      this.name = name;
      this.plantedSeeds = {};
    }
    plant(seed){
      // 简化逻辑：立即种植并记录时间
      console.log(`${this.name} 正在被种植 ${seed}`);
      if (!this.plantedSeeds) {
          this.plantedSeeds = {};
      }
      const currentTime = new Date().getTime();
      this.plantedSeeds[seed] = currentTime;
    }
  
    harvest() {
      console.log(`${this.name} 正在被收割`);
      // 假设所有作物都是立即成熟的
      for (let seed in this.plantedSeeds) {
          console.log(`從${this.name} 收获了 ${seed}`);
      }
      this.plantedSeeds = {}; // 清空种植记录
    }
  }
  
  class GameObject{
    constructor(name, description) {
      this.name = name;
      this.description = description
    }
    interactWithObject(user) {
      console.log(`${user} 正在与 ${this.name} 互动`);
    }
  }