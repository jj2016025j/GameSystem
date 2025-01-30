class MapManager {
    constructor(mapData = []) {
      this.mapRegions = new Map(mapData.map((region) => [region.id, new MapRegion(region)]));
    }
  
    getMapRegionById(id) {
      return this.mapRegions.get(id) || null;
    }
  
    listAllRegions() {
      return Array.from(this.mapRegions.values());
    }
    
  }
  