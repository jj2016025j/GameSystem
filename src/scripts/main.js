import { GameSystem } from "./gameSystem.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameSystem = new GameSystem(); // 初始化遊戲系統
  gameSystem.initializeGame(); // 開始遊戲
});
