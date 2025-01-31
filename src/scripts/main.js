import { GameSystem } from "/src/scripts/gameSystem.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Main開始初始化");
  const gameSystem = new GameSystem(); // 初始化遊戲系統
  gameSystem.initializeGame(); // 開始遊戲
});
