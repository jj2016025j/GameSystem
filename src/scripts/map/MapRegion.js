export class MapRegion {
  constructor({ id, name, description, npcIds = [], shopIds = [], creatureIds = [], objectIds = [] }) {
      this.id = id; // 地圖區域 ID
      this.name = name; // 地圖名稱
      this.description = description; // 地圖描述
      this.npcIds = npcIds; // 此地圖的 NPC ID 列表
      this.shopIds = shopIds; // 此地圖的商店 ID 列表
      this.creatureIds = creatureIds; // 此地圖的生物 ID 列表
      this.objectIds = objectIds; // 此地圖上的物件（如寶箱、井）
  }

  // 🔹 列出此區域的 NPC
  listNPCs(npcManager) {
    return this.npcIds.map((id) => npcManager.getNPCById(id)).filter(npc => npc !== null);
  }

  // 🔹 列出此區域的商店
  listShops(shopManager) {
      return this.shopIds.map((id) => shopManager.getShopById(id));
  }

  // 🔹 列出此區域的生物
  listCreatures(creatureManager) {
      return this.creatureIds.map((id) => creatureManager.getCreatureById(id));
  }

  // 🔹 列出此區域的物件
  listObjects(objectManager) {
      return this.objectIds.map((id) => objectManager.getObjectById(id));
  }
}
