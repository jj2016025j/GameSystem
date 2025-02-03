// uiManager.js

import { PlayerUI } from "./PlayerUI.js";
import { SkillUI } from "./SkillUI.js";
import { InventoryUI } from "./InventoryUI.js";
import { MapUI } from "./MapUI.js";
// import { ShopUI } from "./ShopUI.js";
import { NPCUI } from "./NPCUI.js";

export class UIManager {
  static initialize(gameSystem) {
    console.log("[系統] UI 開始初始化");

    if (!this.validateGameSystem(gameSystem)) {
      return;
    }

    // 初始化各種 UI 模塊
    try {
      PlayerUI.initialize(gameSystem.player);
      SkillUI.initialize(this.getSkillList(gameSystem.player));
      InventoryUI.initialize(gameSystem.player.inventory);

      MapUI.initialize(gameSystem);
      const currentMap = gameSystem.mapManager.getMapRegionById(gameSystem.currentLocation);
      const npcsInLocation = currentMap ? currentMap.listNPCs(gameSystem.npcManager) : [];
      NPCUI.initialize(npcsInLocation);
      // ShopUI.initialize(mapData.shops);
      } catch (error) {
      console.error("初始化 UI 時出錯：", error);
    }    
    console.log("[系統] UI 初始化完成 ✅");
  }

  static updateAllUI(gameSystem) {
    if (!this.validateGameSystem(gameSystem)) {
      return;
    }

    try {
      PlayerUI.update(gameSystem.player);
      SkillUI.update(this.getSkillList(gameSystem.player));
      InventoryUI.update(gameSystem.player.inventory);

      MapUI.update(gameSystem);
      
      // ✅ 獲取當前地圖的 NPC 並更新 UI
      const currentMap = gameSystem.mapManager.getMapRegionById(gameSystem.currentLocation);
      const npcsInLocation = currentMap ? currentMap.listNPCs(gameSystem.npcManager) : [];
      NPCUI.update(npcsInLocation);

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
  static getSkillList(player) {
    return Array.from(player.skillList.unlockedSkills.values());
  }
}
