import { DOMUtils } from "../utils/domUtils.js";

export class CreatureSystem {
  static updateCreaturesList(creatures) {
    DOMUtils.clearAndPopulateList(
      "#creaturesList",
      creatures.flatMap(creature =>
        Array(creature.quantity).fill(null).map((_, i) =>
          DOMUtils.createListItem(
            creature.name,
            [
              DOMUtils.createButton("攻擊", () => console.log(`攻擊 ${creature.name} (${i + 1})`)),
              DOMUtils.createButton("反擊", () => console.log(`${creature.name} (${i + 1}) 反擊`))
            ]
          )
        )
      )
    );
  }
}
