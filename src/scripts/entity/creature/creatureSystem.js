import { DOMUtils } from "../utils/domUtils.js";
import { SystemLog } from "../utils/SystemLog.js";

export class CreatureSystem {
  static updateCreaturesList(creatures) {
    DOMUtils.clearAndPopulateList(
      "#creaturesList",
      creatures.flatMap(creature =>
        Array(creature.quantity).fill(null).map((_, i) =>
          DOMUtils.createListItem(
            creature.name,
            [
              DOMUtils.createButton("攻擊", () => SystemLog.addMessage(`攻擊 ${creature.name} (${i + 1})`)),
              DOMUtils.createButton("反擊", () => SystemLog.addMessage(`${creature.name} (${i + 1}) 反擊`))
            ]
          )
        )
      )
    );
  }
}
