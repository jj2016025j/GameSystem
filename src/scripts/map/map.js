class Map {
    constructor({ id, name, description, npcIds = [], shopIds = [], objectIds = [] }) {
      this.id = id; // 地圖區域 ID
      this.name = name; // 地圖名稱
      this.description = description; // 地圖描述
      this.npcIds = npcIds; // 此地圖的 NPC ID 列表
      this.shopIds = shopIds; // 此地圖的商店 ID 列表
      this.objectIds = objectIds; // 此地圖上的物件（例如寶箱、井等）
    }
  
    listNPCs(npcManager) {
      return this.npcIds.map((id) => npcManager.getNPCById(id));
    }
  
    listShops(shopManager) {
      return this.shopIds.map((id) => shopManager.getShopById(id));
    }

    listObjects(objectManager) {
      return this.objectIds.map((id) => objectManager.getObjectById(id));
    }
  }
  