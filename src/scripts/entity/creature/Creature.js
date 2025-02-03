import { BaseEntity } from "../BaseEntity.js";
import { CreatureState } from "./CreatureState.js";
import { Inventory } from "../../Inventory/Inventory.js";

/**
 * 生物類別
 * - 怪物、動物、野生生物皆可繼承此類
 */
export class Creature extends BaseEntity {
  constructor({ id, name, state = {}, inventory = {} }) {
    super({ id, name, state }); // ✅ 正確傳遞 state
    this.state = new CreatureState(this, state); // ✅ 使用 CreatureState
    this.inventory = inventory instanceof Inventory 
        ? inventory // ✅ 若已經是 Inventory，直接使用
        : new Inventory(inventory); // ✅ 否則重新建立
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
