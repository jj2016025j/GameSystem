export class MapUI {
  static initialize(gameSystem) {
    this.gameSystem = gameSystem; // ✅ 儲存 gameSystem 以便 switchMap
    this.mapManager = gameSystem.mapManager; // ✅ 儲存 gameSystem 以便 switchMap
    this.mapData = this.mapManager.listAllRegions(); // ✅ 儲存 gameSystem 以便 switchMap
    this.currentLocation = gameSystem.currentLocation; // ✅ 儲存 gameSystem 以便 switchMap
    this.update();
    console.log("[地圖UI] 已初始化 🗺️");
  }

  static update() {
    if (!Array.isArray(this.mapData)) {
        console.error("❌ `mapData` 不是有效的陣列:", this.mapData);
        return;
    }

    const mapList = document.querySelector("#maps .list");
    if (!mapList) {
      console.error("❌ 找不到地圖列表元素");
      return;
    }

    mapList.innerHTML = "";

    this.mapData.forEach(location => {
      const li = document.createElement("li");
      li.textContent = `${location.name}`;
      // (${location.description})
      if (location.id === this.currentLocation) {
        li.classList.add("current-location");
      }

      const button = document.createElement("button");
      button.textContent = "前往";
      button.addEventListener("click", () => this.gameSystem.switchMap(location.id)); // ✅ 修正 switchMap 的調用

      li.appendChild(button);
      mapList.appendChild(li);
    });
  }
}
