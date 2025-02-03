import { GameObject } from "../GameObject.js";

export class AncientStatue extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    console.log(`🗿 ${this.name} 似乎在注視著你，帶著神秘的表情...`);
  }
}
