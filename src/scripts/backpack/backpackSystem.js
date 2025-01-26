import { DOMUtils } from "../utils/domUtils.js";

// 背包系統模組
export class BackpackSystem {
  constructor(player) {
    this.player = player;
  }

  updateBackpackList() {
    DOMUtils.clearAndPopulateList(
      "#backpackList",
      Array.from(this.player.backpack.items.entries()),
      ([name, quantity]) => DOMUtils.createListItem(`${name} (x${quantity})`)
    );
  }

  addItemToBackpack(name, quantity) {
    this.player.backpack.addItems({ [name]: quantity });
    this.updateBackpackList();
    console.log(`Added ${quantity}x ${name} to backpack.`);
  }

  removeItemFromBackpack(name, quantity) {
    if (this.player.backpack.hasItem(name, quantity)) {
      this.player.backpack.removeItems({ [name]: quantity });
      this.updateBackpackList();
      console.log(`Removed ${quantity}x ${name} from backpack.`);
    } else {
      console.log(`Not enough ${name} in backpack to remove.`);
    }
  }
}
