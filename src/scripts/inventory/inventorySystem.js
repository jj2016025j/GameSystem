import { DOMUtils } from "../utils/domUtils.js";
import { SystemLog } from "./utils/SystemLog.js";

// 背包系統模組
export class InventorySystem {
  constructor(player) {
    this.player = player;
  }

  updateInventoryList() {
    DOMUtils.clearAndPopulateList(
      "#inventoryList",
      Array.from(this.player.inventory.items.entries()),
      ([name, quantity]) => DOMUtils.createListItem(`${name} (x${quantity})`)
    );
  }

  addItemToInventory(name, quantity) {
    this.player.inventory.addItems({ [name]: quantity });
    this.updateInventoryList();
    SystemLog.addMessage(`Added ${quantity}x ${name} to inventory.`);
  }

  removeItemFromInventory(name, quantity) {
    if (this.player.inventory.hasItem(name, quantity)) {
      this.player.inventory.removeItems({ [name]: quantity });
      this.updateInventoryList();
      SystemLog.addMessage(`Removed ${quantity}x ${name} from inventory.`);
    } else {
      SystemLog.addMessage(`Not enough ${name} in inventory to remove.`);
    }
  }
}
