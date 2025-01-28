// uiManager.js

import { PlayerUI } from "./player/playerUI.js";
import { SkillUI } from "./skill/skillUI.js";
import { BackpackUI } from "./backpack/backpackUI.js";
import { ShopUI } from "./shop/shopUI.js";
import { MapUI } from "./map/mapUI.js";
import { NPCUI } from "./map/npcUI.js";

export class UIManager {
  static initialize(gameSystem) {
    console.log("UI 開始初始化");

    if (!gameSystem || !gameSystem.player || !gameSystem.staticData) {
      console.error("GameSystem 尚未完全初始化，無法啟動 UI");
      return;
    }
    PlayerUI.initialize(gameSystem.player);
    SkillUI.initialize(gameSystem.player.skillList); // 更新技能 UI
    BackpackUI.initialize(gameSystem.player.backpack);
    if (gameSystem.mapData) {
      MapUI.initialize(gameSystem.mapData);
      NPCUI.initialize(gameSystem.mapData.NPC);
      ShopUI.initialize(gameSystem.mapData.shops);
    }
    this.updateAllUI(gameSystem);
  }

  static updateAllUI(gameSystem) {
    if (!gameSystem || !gameSystem.player) {
      console.error("GameSystem 尚未正確初始化，無法更新 UI");
      return;
    }
    try {
      PlayerUI.update(gameSystem.player);
      SkillUI.update(gameSystem.player.skillList); // 更新技能 UI
      BackpackUI.update(gameSystem.player.backpack);
      if (gameSystem.mapData) {
        MapUI.update(gameSystem.mapData);
        NPCUI.update(gameSystem.mapData.NPC);
        ShopUI.update(gameSystem.mapData.shops);
      }
    } catch (error) {
      console.error("更新 UI 時出錯：", error);
    }
  }
}
