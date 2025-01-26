import { CookieManager } from "./utils/cookieManager.js";
import { Player } from "./player/player.js";
import { BackpackSystem } from "./backpack/backpackSystem.js";
import { MapSystem } from "./map/mapSystem.js";
import { UIManager } from "./uiManager.js";
import { staticData } from "./data/staticData.js";

export class GameSystem {
  constructor() {
    this.staticData = staticData; // 靜態資料
    this.player = new Player(); // 玩家資料
    this.backpackSystem = new BackpackSystem(this.player); // 背包系統
  }

  // 初始化遊戲
  initializeGame() {
    this.loadGameFromCookie();
    UIManager.initialize(this); // 初始化 UI

    // 定期保存遊戲進度
    setInterval(() => this.saveGameToCookie(), 10000);

    // 頁面關閉時保存遊戲進度
    window.addEventListener("beforeunload", () => this.saveGameToCookie());
  }

  // 保存遊戲進度到 Cookie
  saveGameToCookie() {
    const gameData = {
      player: this.player,
      backpack: this.player.backpack,
      location: this.player.location,
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
      this.player.backpack = Object.assign(this.player.backpack, parsedData.backpack);
      this.player.location = parsedData.location;
      console.log("遊戲進度從 Cookie 加載成功。");
    } else {
      console.log("未找到存檔，使用默認遊戲數據初始化。");
    }
  }
}
