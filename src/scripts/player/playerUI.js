export class PlayerUI {
  static initialize(player) {
    this.update(player);
    this.addEventListeners(player);
    console.log("玩家 UI 已初始化");
  }

  static update(player) {
    const { defaultState } = player.states;
    document.querySelector("#player-name").textContent = player.name;
    document.querySelector("#player-health").textContent = `${player.states.health}/${defaultState.MAX_HEALTH}`;
    document.querySelector("#player-mana").textContent = `${player.states.mana}/${defaultState.MAX_MANA}`;
    document.querySelector("#player-exp").textContent = `${player.states.experience}/${defaultState.MAX_EXPERIENCE}`;
    document.querySelector("#player-level").textContent = player.states.level;
    document.querySelector("#player-gold").textContent = player.backpack.gold;
    document.querySelector("#player-location").textContent = player.location;
    document.querySelector("#player-states").textContent = player.states.state;
  }

  static addEventListeners(player) {
    document.getElementById("randomHealthButton").addEventListener("click", () => {
      const randomHealthChange = Math.floor(Math.random() * 20) - 10;
      player.states.takeDamage(randomHealthChange < 0 ? -randomHealthChange : 0);
      player.states.healing(randomHealthChange > 0 ? randomHealthChange : 0);
      this.update(player);
      console.log(`血量隨機變動：${randomHealthChange}`);
    });

    document.getElementById("randomManaButton").addEventListener("click", () => {
      const randomManaChange = Math.floor(Math.random() * 20) - 10;
      player.states.mana = Math.min(
        States.MAX_MANA,
        Math.max(0, player.states.mana + randomManaChange)
      );
      this.update(player);
      console.log(`魔力隨機變動：${randomManaChange}`);
    });

    document.getElementById("randomExpButton").addEventListener("click", () => {
      const randomExp = Math.floor(Math.random() * 50);
      player.states.gainExperience(randomExp);
      this.update(player);
      console.log(`經驗值隨機增加：${randomExp}`);
    });

    document.getElementById("levelUpButton").addEventListener("click", () => {
      player.states.levelUp();
      this.update(player);
      console.log("升級成功");
    });

    document.getElementById("resetLevelButton").addEventListener("click", () => {
      player.states.level = 1;
      player.states.experience = 0;
      player.states.health = States.MAX_HEALTH;
      player.states.mana = States.MAX_MANA;
      this.update(player);
      console.log("重置到一等");
    });

    document.getElementById("randomLocationButton").addEventListener("click", () => {
      const locations = ["古林", "城鎮", "沙漠", "雪山"];
      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      player.location = randomLocation;
      this.update(player);
      console.log(`隨機位置變動：${randomLocation}`);
    });

    document.getElementById("poisonButton").addEventListener("click", () => {
      player.states.addEffect("PoisonEffect");
      this.update(player);
      console.log("中毒效果已添加");
    });

    document.getElementById("cleanseButton").addEventListener("click", () => {
      player.states.removeEffect("PoisonEffect");
      this.update(player);
      console.log("中毒效果已移除");
    });

    document.getElementById("saveGameButton").addEventListener("click", () => {
      gameSystem.saveGameToCookie();
      console.log("遊戲進度已儲存");
    });

    document.getElementById("loadGameButton").addEventListener("click", () => {
      gameSystem.loadGameFromCookie();
      this.update(gameSystem.player);
      console.log("遊戲進度已載入");
    });
  }
}
