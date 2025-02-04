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

  getDefaultRegion() {
    return this.mapRegions.values().next().value || null; // ✅ 預設回傳第一個地圖
  }

  getMapRegionById(id) {
    return this.mapRegions.get(id) || null;
  }

  listAllRegions() {
    return [...this.mapRegions.values()]; // 確保回傳陣列
  }
}