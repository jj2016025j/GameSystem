import { SystemLog } from "../utils/SystemLog.js";

export class CreatureUI {
  static initialize(gameSystem) {
    SystemLog.addMessage("[生物 UI] 開始初始化");
    this.gameSystem = gameSystem;
    this.update();
    SystemLog.addMessage("[生物 UI] 已初始化 ✅");
  }

  // ✅ 更新 UI
  static update() {
    const mapRegion = this.gameSystem.currentLocation;
    if (!mapRegion || typeof mapRegion.listCreatures !== "function") {
      console.error("❌ 當前地圖數據異常，無法獲取生物");
      return;
    }

    this.creatures = mapRegion.listCreatures(this.gameSystem.creatureManager);
    this.render();
    SystemLog.addMessage(`[生物 UI] 更新 ${this.creatures.length} 種生物`);
  }

  // ✅ 渲染生物 UI
  static render() {
    const creatureList = document.querySelector("#creaturesList");
    if (!creatureList) {
      console.error("❌ 無法找到 #creaturesList，請確認 HTML 結構");
      return;
    }

    creatureList.innerHTML = ""; // 清空列表

    if (!this.creatures || this.creatures.length === 0) {
      creatureList.innerHTML = "<li>🌿 這個地點沒有生物</li>";
      return;
    }

    this.creatures.forEach(creature => {
      const li = document.createElement("li");
      li.textContent = `${creature.name} - ${creature.state.health} HP`;
      li.dataset.creatureId = creature.id; // 綁定 ID

      creatureList.appendChild(li);
    });
  }
}
