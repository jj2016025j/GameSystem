import { Entity } from "../Entity.js";
import { CreatureState } from "./CreatureState.js";
import { Inventory } from "../../Inventory/Inventory.js";

/**
 * 生物類別
 * - 怪物、動物、野生生物皆可繼承此類
 */
export class Creature extends Entity {
  constructor({ id, name, state = {}, inventory = {} }) {
    super({ id, name, state }); // ✅ 正確傳遞 state
    this.state = new CreatureState(this, state); // ✅ 使用 CreatureState
    this.inventory = new Inventory(this, inventory);
  }

  // ✅ 獲取生物資訊
  getCreatureInfo() {
    return this.getSerializableData();
  }

  // ✅ 獲取存檔格式的資料
  getSerializableData() {
    return {
      id: this.id,
      name: this.name,
      state: this.state.getSerializableData(),
      inventory: this.inventory.getSerializableData(),
    };
  }
}
