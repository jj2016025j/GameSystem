export class PlayerUI {
  static initialize(player) {
    if (!player) {
      console.error("Player 未正確初始化");
      return;
    }

    console.log("[玩家UI] 開始初始化");
    this.update(player);
    this.addEventListeners(player);
    console.log("[玩家UI] 初始化完成 ✅");
  }

  static update(player) {
    const { state } = player;

    if (!state) {
      console.error("玩家狀態不存在，無法更新 UI");
      return;
    }

    try {
      document.querySelector("#player-name").textContent = player.name;
      document.querySelector("#player-health").textContent = `${state.health}/${state.maxHealth}`;
      document.querySelector("#player-mana").textContent = `${state.mana}/${state.maxMana}`;
      document.querySelector("#player-exp").textContent = `${state.experience}/${state.maxExperience}`;
      document.querySelector("#player-level").textContent = state.level;
      document.querySelector("#player-gold").textContent = player.inventory.gold;
      document.querySelector("#player-states").textContent = state.currentState; // 修正為 `currentState`
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
          player.inventory.addMoney(randomGold);
          this.update(player);
          console.log(`增加金錢：${randomGold}`);
        },
      }, {
        id: "removeGoldButton", // 消耗金錢按鈕
        handler: () => {
          const randomGold = Math.floor(Math.random() * 30) + 1; // 隨機消耗 1-30 金幣
          if (player.inventory.checkMoney(randomGold)) { // 修改方法名稱
            player.inventory.removeMoney(randomGold);
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
            player.state.healing(randomHealthChange);
          } else {
            player.state.takeDamage(-randomHealthChange);
          }
          this.update(player);
          console.log(`血量隨機變動：${randomHealthChange}`);
        },
      },
      {
        id: "randomManaButton",
        handler: () => {
          const randomManaChange = Math.floor(Math.random() * 20) - 10;
          player.state.mana = Math.max(0, Math.min(player.state.maxMana, player.state.mana + randomManaChange));
          this.update(player);
          console.log(`魔力隨機變動：${randomManaChange}`);
        },
      },
      {
        id: "randomExpButton",
        handler: () => {
          const randomExp = Math.floor(Math.random() * 50);
          player.state.gainExperience(randomExp);
          this.update(player);
          console.log(`經驗值隨機增加：${randomExp}`);
        },
      },
      {
        id: "levelUpButton",
        handler: () => {
          player.state.levelUp();
          this.update(player);
          console.log("升級成功");
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
          player.state.addEffect("PoisonEffect");
          this.update(player);
          console.log("中毒效果已添加");
        },
      },
      {
        id: "cleanseButton",
        handler: () => {
          player.state.removeEffect("PoisonEffect");
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
