import { GameObject } from "../GameObject.js";

export class MysticAltar extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
  }

  interact() {
    console.log(`🔮 你觸碰了 ${this.name}，感受到神秘的力量湧入體內！`);
  }
}
