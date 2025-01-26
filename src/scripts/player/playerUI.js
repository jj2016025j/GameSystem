export class PlayerUI {
    static initialize(player) {
      update(player)
      console.log("玩家 UI 已初始化");
    }
  
    static update(player) {
      document.querySelector("#player-name").textContent = player.name;
      document.querySelector("#player-health").textContent = player.states.health;
      document.querySelector("#player-mana").textContent = player.states.mana;
      document.querySelector("#player-level").textContent = player.states.level;
      document.querySelector("#player-gold").textContent = player.backpack.gold;
      document.querySelector("#player-location").textContent = player.location;
      document.querySelector("#player-states").textContent = player.states.state;
    }
  }
  