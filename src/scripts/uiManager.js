// uiManager.js

import { PlayerUI } from "./player/playerUI.js";
import { SkillUI } from "./skill/skillUI.js";
import { InventoryUI } from "./inventory/inventoryUI.js";
import { ShopUI } from "./shop/shopUI.js";
import { MapUI } from "./map/mapUI.js";
import { NPCUI } from "./map/npcUI.js";

export class UIManager {
  static initialize(gameSystem) {
    console.log("UI 開始初始化");

    if (!this.validateGameSystem(gameSystem)) {
      return;
    }

    // 初始化各種 UI 模塊
    try {
      PlayerUI.initialize(gameSystem.player);
      SkillUI.initialize(this.getSkillList(gameSystem));
      InventoryUI.initialize(gameSystem.player.inventory);

      if (gameSystem.mapData) {
        this.initializeMapRelatedUI(gameSystem.mapData);
      }
    } catch (error) {
      console.error("初始化 UI 時出錯：", error);
    }
  }

  static updateAllUI(gameSystem) {
    if (!this.validateGameSystem(gameSystem)) {
      return;
    }

    // 更新各種 UI 模塊
    try {
      PlayerUI.update(gameSystem.player);
      SkillUI.update(this.getSkillList(gameSystem));
      InventoryUI.update(gameSystem.player.inventory);

      if (gameSystem.mapData) {
        this.updateMapRelatedUI(gameSystem.mapData);
      }
    } catch (error) {
      console.error("更新 UI 時出錯：", error);
    }
  }

  // 驗證 GameSystem 是否正確初始化
  static validateGameSystem(gameSystem) {
    if (!gameSystem || !gameSystem.player) {
      console.error("GameSystem 尚未正確初始化，無法執行 UI 操作");
      return false;
    }
    return true;
  }

  // 獲取技能列表
  static getSkillList(gameSystem) {
    return Array.from(gameSystem.player.skillManager.unlockedSkills.values());
  }

  // 初始化與地圖相關的 UI
  static initializeMapRelatedUI(mapData) {
    MapUI.initialize(mapData);
    NPCUI.initialize(mapData.NPC || []);
    ShopUI.initialize(mapData.shops || []);
  }

  // 更新與地圖相關的 UI
  static updateMapRelatedUI(mapData) {
    MapUI.update(mapData);
    NPCUI.update(mapData.NPC || []);
    ShopUI.update(mapData.shops || []);
  }
}
