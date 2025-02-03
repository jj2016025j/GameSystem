import { MapRegion } from "./MapRegion.js";
import { defaultMapData } from "./mapData.js";

export class MapManager {
  constructor(insertMapData = []) {
    // 確保 insertMapData 是陣列，防止 undefined 出錯
    const combinedMapData = [...defaultMapData, ...(Array.isArray(insertMapData) ? insertMapData : [])];

    // ✅ 使用 new Map() 而不是 new MapRegion()
    this.mapRegions = new Map(
      combinedMapData.map(region => [region.id, new MapRegion(region)])
    );
  }

  getMapRegionById(id) {
    return this.mapRegions.get(id) || null;
  }

  listAllRegions() {
    return [...this.mapRegions.values()]; // 確保回傳陣列
  }

  // ✅ 提取獲取當前地圖 NPC 的邏輯
  getNPCsInLocation(currentLocation, npcManager) {
    const currentMap = this.getMapRegionById(currentLocation);
    return currentMap ? currentMap.listNPCs(npcManager) : [];
  }
}