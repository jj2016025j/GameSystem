export class PlayerUI {
  static initialize(player) {
    if (!player) {
      console.error("Player 未正確初始化");
      return;
    }

    console.log("開始初始化玩家 UI");
    this.update(player);
    this.addEventListeners(player);
    console.log("玩家 UI 已初始化");
  }

  static update(player) {
    const { states } = player;

    if (!states) {
      console.error("玩家狀態不存在，無法更新 UI");
      return;
    }

    try {
      document.querySelector("#player-name").textContent = player.name;
      document.querySelector("#player-health").textContent = `${states.health}/${states.maxHealth}`;
      document.querySelector("#player-mana").textContent = `${states.mana}/${states.maxMana}`;
      document.querySelector("#player-exp").textContent = `${states.experience}/${states.maxExperience}`;
      document.querySelector("#player-level").textContent = states.level;
      document.querySelector("#player-gold").textContent = player.backpack.gold;
      document.querySelector("#player-location").textContent = player.location;
      document.querySelector("#player-states").textContent = states.currentState; // 修正為 `currentState`
    } catch (err) {
      console.error("更新玩家 UI 時出錯:", err);
    }
  }

  static addEventListeners(player) {
    const buttonConfigs = [
      {
        id: "addGoldButton", // 新增金錢按鈕
        handler: () => {
          const randomGold = Math.floor(Math.random() * 50) + 1; // 隨機增加 1-50 金幣
          player.backpack.addMoney(randomGold);
          this.update(player);
          console.log(`增加金錢：${randomGold}`);
        },
      },{
        id: "removeGoldButton", // 消耗金錢按鈕
        handler: () => {
          const randomGold = Math.floor(Math.random() * 30) + 1; // 隨機消耗 1-30 金幣
          if (player.backpack.checkMoney(randomGold)) { // 修改方法名稱
            player.backpack.removeMoney(randomGold);
            this.update(player);
            console.log(`消耗金錢：${randomGold}`);
          } else {
            console.log(`金幣不足，無法消耗 ${randomGold}`);
          }
        },
      },      
      {
        id: "randomHealthButton",
        handler: () => {
          const randomHealthChange = Math.floor(Math.random() * 20) - 10;
          if (randomHealthChange > 0) {
            player.states.healing(randomHealthChange);
          } else {
            player.states.takeDamage(-randomHealthChange);
          }
          this.update(player);
          console.log(`血量隨機變動：${randomHealthChange}`);
        },
      },
      {
        id: "randomManaButton",
        handler: () => {
          const randomManaChange = Math.floor(Math.random() * 20) - 10;
          player.states.mana = Math.max(0, Math.min(player.states.maxMana, player.states.mana + randomManaChange));
          this.update(player);
          console.log(`魔力隨機變動：${randomManaChange}`);
        },
      },
      {
        id: "randomExpButton",
        handler: () => {
          const randomExp = Math.floor(Math.random() * 50);
          player.states.gainExperience(randomExp);
          this.update(player);
          console.log(`經驗值隨機增加：${randomExp}`);
        },
      },
      {
        id: "levelUpButton",
        handler: () => {
          player.states.levelUp();
          this.update(player);
          console.log("升級成功");
        },
      },
      {
        id: "resetLevelButton",
        handler: () => {
          player.states.resetLevel();
          this.update(player);
          console.log("重置到一等");
        },
      },
      {
        id: "randomLocationButton",
        handler: () => {
          const locations = ["古林", "城鎮", "沙漠", "雪山"];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          player.location = randomLocation;
          this.update(player);
          console.log(`隨機位置變動：${randomLocation}`);
        },
      },
      {
        id: "poisonButton",
        handler: () => {
          player.states.addEffect("PoisonEffect");
          this.update(player);
          console.log("中毒效果已添加");
        },
      },
      {
        id: "cleanseButton",
        handler: () => {
          player.states.removeEffect("PoisonEffect");
          this.update(player);
          console.log("中毒效果已移除");
        },
      },
      {
        id: "saveGameButton",
        handler: () => {
          gameSystem.saveGameToCookie();
          console.log("遊戲進度已儲存");
        },
      },
      {
        id: "loadGameButton",
        handler: () => {
          gameSystem.loadGameFromCookie();
          this.update(gameSystem.player);
          console.log("遊戲進度已載入");
        },
      },
    ];

    buttonConfigs.forEach(({ id, handler }) => {
      const button = document.getElementById(id);
      if (button) {
        button.addEventListener("click", handler);
      } else {
        console.warn(`按鈕 ${id} 未找到`);
      }
    });
  }
}
