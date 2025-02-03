import { GameObject } from "../GameObject.js";

export class Tree extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    console.log(`🌳 你觸摸了 ${this.name}，感受到一股平靜的自然氣息。`);
  }
}
