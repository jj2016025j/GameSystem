import { Entity } from "../entity.js";

export class GameObject extends Entity {
  constructor({ id, name, description, quantity = 1 }) {
    super({ id, name });
    this.description = description; // 物件描述
    this.quantity = quantity; // 數量
  }

  interact() {
    console.log(`與物件 ${this.name} 進行互動: ${this.description}`);
  }
}

//   // 地圖數據轉換
// const createObjects = (objects) => {
//   return objects.map(obj => {
//       switch (obj.type) {
//           case "TreasureChest":
//               return new TreasureChest({ ...obj, contents: ["金幣", "道具"] });
//           case "Well":
//               return new Well({ ...obj, waterAmount: 100 });
//           case "Building":
//               return new Building({ ...obj });
//           case "Collectible":
//               return new Collectible({ ...obj, value: 50 });
//           case "FoodStall":
//               return new FoodStall({ ...obj, foodList: [{ name: "肉串", price: 20 }, { name: "湯麵", price: 30 }] });
//           case "Fountain":
//               return new Fountain({ ...obj, restoreAmount: 10 });
//           case "Vehicle":
//               return new Vehicle({ ...obj, capacity: 10 });
//           default:
//               return new GameObject(obj);
//       }
//   });
// };

// // 轉換地圖數據
// const processedMapData = mapData.map(map => ({
//   ...map,
//   objects: createGameObjects(map.objects)
// }));

// console.log(processedMapData);
