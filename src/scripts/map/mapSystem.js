import { NPCSystem } from "./npcSystem.js";
import { CreatureSystem } from "./creatureSystem.js";
import { ObjectSystem } from "./objectSystem.js";
import { ShopSystem } from "../shop/shopSystem.js";

export class MapSystem {
  // static updateMapUI(locationData) {
  //   NPCSystem.updateNPCList(locationData.NPC);
  //   CreatureSystem.updateCreaturesList(locationData.creatures);
  //   ObjectSystem.updateObjectsList(locationData.objects);
  //   ShopSystem.updateShopsList(locationData.shops);
  // }

  static initializeMap(mapData, currentLocation) {
    const mapList = document.querySelector("#mapsList");
    mapList.innerHTML = mapData
      .map(map => `<li>${map.name} <button onclick="MapSystem.updateMap('${map.name}')">前往</button></li>`)
      .join("");

    const initialLocation = mapData.find(map => map.name === currentLocation);
    if (initialLocation) this.updateMapUI(initialLocation);

    console.log(`當前位置: ${currentLocation}`);
  }

  static switchMap(newLocation) {
    console.log(`切換到地點: ${newLocation}`);
    // 更新遊戲資料的邏輯
  }
}
