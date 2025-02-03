import { CookieManager } from "./utils/cookieManager.js";
import { Player } from "./entity/creature/player/player.js";
import { MapManager } from "./map/MapManager.js";
import { NPCManager } from "./entity/creature/NPC/NPCManager.js";
// import { ShopManager } from "./shop/ShopManager.js";
// import { CreatureManager } from "./entity/creature/CreatureManager.js";
import { ObjectManager } from "./entity/Object/ObjectManager.js";
import { UIManager } from "./UI/UIManager.js";

export class GameSystem {
  constructor() {
    this.player = new Player(this); // 玩家資料
    this.mapManager = new MapManager(); // 玩家資料
    this.npcManager = new NPCManager();
    // this.shopManager = new ShopManager();
    // this.creatureManager = new CreatureManager();
    this.objectManager = new ObjectManager();
    this.currentLocation = this.player.location || "forest"; // 設定當前位置
    this.initializeGame();
  }

  // 初始化遊戲
  initializeGame() {
    // this.loadGameFromCookie();
    console.log("[系統] 初始化中...");
    UIManager.initialize(this); // 初始化 UI
    
    // // 定期保存遊戲進度
    // setInterval(() => this.saveGameToCookie(), 10000);

    // // 頁面關閉時保存遊戲進度
    // window.addEventListener("beforeunload", () => this.saveGameToCookie());
  }

  // 切換地圖
  switchMap(newLocation) {
    const mapRegion = this.mapManager.getMapRegionById(newLocation);
    if (!mapRegion) {
      console.warn(`⚠️ 地點 ${newLocation} 不存在`);
      return;
    }

    this.currentLocation = mapRegion.id; // ✅ 確保 `currentLocation` 是 ID
    console.log(`🔄 切換到地點: ${mapRegion.name}`);
    
    UIManager.updateAllUI(this); // ✅ 更新 UI
  }

  // 保存遊戲進度到 Cookie
  saveGameToCookie() {
    const gameData = {
      player: this.player.toJSON(),
      time: new Date().toISOString(),
    };
    CookieManager.setCookie("gameData", JSON.stringify(gameData));
    console.log("遊戲進度已保存到 Cookie。");
  }

  // 從 Cookie 加載遊戲進度
  loadGameFromCookie() {
    const savedData = CookieManager.getCookie("gameData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.player = Object.assign(new Player(), parsedData.player);
      console.log("遊戲進度從 Cookie 加載成功。");
    } else {
      console.log("未找到存檔，使用默認遊戲數據初始化。");
    }
  }
}
