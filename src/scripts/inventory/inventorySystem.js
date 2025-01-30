import { DOMUtils } from "../utils/domUtils.js";

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
    console.log(`Added ${quantity}x ${name} to inventory.`);
  }

  removeItemFromInventory(name, quantity) {
    if (this.player.inventory.hasItem(name, quantity)) {
      this.player.inventory.removeItems({ [name]: quantity });
      this.updateInventoryList();
      console.log(`Removed ${quantity}x ${name} from inventory.`);
    } else {
      console.log(`Not enough ${name} in inventory to remove.`);
    }
  }
}
