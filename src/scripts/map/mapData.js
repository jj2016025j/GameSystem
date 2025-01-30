// 地圖數據
export const mapData = [
  {
    id: "forest",
    name: "古林",
    description: "探索古老的森林",
    npcIds: ["elder", "innkeeper"],
    shopIds: ["weaponShop", "herbShop"],
    creatureIds: ["forestSpirit", "wildAnimal"],
    objects: [
      { id: "chest1", type: "TreasureChest", name: "寶箱", quantity: 3, description: "在森林中可以找到寶箱，可能包含金幣或寶藏。" },
      { id: "well1", type: "Well", name: "井", quantity: 1, description: "可以用來補充水分的井。" }
    ]
  },
  {
    id: "coralSea",
    name: "珊瑚海",
    description: "在這裡與海洋生物共游",
    npcIds: ["fisherman", "divingCoach"],
    shopIds: ["divingShop", "seafoodShop"],
    creatureIds: ["seaDragon"],
    objects: [
      { id: "chest2", type: "TreasureChest", name: "寶箱", quantity: 1, description: "隱藏在海洋中的寶箱，可能藏有珍貴物品。" },
      { id: "coral1", type: "Collectible", name: "珊瑚", quantity: 2, description: "美麗且珍貴的珊瑚。" }
    ]
  },
  {
    id: "city",
    name: "城市",
    description: "在繁華的城市中購物",
    npcIds: ["merchant", "tourist"],
    shopIds: ["clothingShop", "electronicsShop"],
    creatureIds: ["pigeon", "strayCat"],
    objects: [
      { id: "mall1", type: "Building", name: "購物中心", quantity: 2, description: "現代化的購物中心，提供各種商品。" },
      { id: "snack1", type: "FoodStall", name: "街頭小吃", quantity: 1, description: "地方特色小吃，深受遊客喜愛。" }
    ]
  },
  {
    id: "polar",
    name: "極地",
    description: "在冰冷的極地中生存",
    npcIds: ["scientist", "explorer"],
    shopIds: ["supplyStation", "gearShop"],
    creatureIds: ["polarBear", "seal"],
    objects: [
      { id: "glacier1", type: "Landmark", name: "冰川", quantity: 1, description: "巨大的冰川，覆蓋著厚厚的冰雪。" },
      { id: "ship1", type: "Vehicle", name: "破冰船", quantity: 1, description: "用於在冰層中開路的強大船隻。" }
    ]
  },
  {
    id: "rainforest",
    name: "雨林",
    description: "在熱帶雨林中尋找寶藏",
    npcIds: ["native", "archaeologist", "mysteryMerchant"],
    shopIds: ["craftShop", "campingShop"],
    creatureIds: ["tropicalBird", "python"],
    objects: [
      { id: "ruins1", type: "Landmark", name: "古代遺跡", quantity: 1, description: "隱藏在雨林深處的古代文明遺跡。" },
      { id: "plant1", type: "Plant", name: "熱帶植物", quantity: 2, description: "繁茂且充滿生機的熱帶植物。" }
    ]
  },
  {
    id: "mistForest",
    name: "迷霧森林",
    description: "在迷霧中探索未知",
    npcIds: ["hermit", "lostTraveler"],
    shopIds: ["herbShop", "travelShop"],
    creatureIds: ["ghostWolf", "forestElf"],
    objects: [
      { id: "tree1", type: "Landmark", name: "古樹", quantity: 1, description: "迷霧森林中的古老巨樹，高聳入雲。" },
      { id: "spring1", type: "Fountain", name: "迷霧之泉", quantity: 1, description: "清澈的泉水，常年被濃霧環繞。" }
    ]
  }
];
