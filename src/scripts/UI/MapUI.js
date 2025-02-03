export class MapUI {
  static initialize(gameSystem) {
    this.gameSystem = gameSystem; // ✅ 儲存 gameSystem 以便 switchMap
    this.update(gameSystem.mapManager.listAllRegions(), gameSystem.currentLocation);
    console.log("[地圖UI] 已初始化 🗺️");
  }

  static update(mapData, currentLocation) {
    const mapList = document.querySelector("#maps .list");
    if (!mapList) {
      console.error("❌ 找不到地圖列表元素");
      return;
    }

    mapList.innerHTML = "";

    mapData.forEach(location => {
      const li = document.createElement("li");
      li.textContent = `${location.name}`;
      // (${location.description})
      if (location.id === currentLocation) {
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
