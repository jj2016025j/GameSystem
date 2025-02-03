import { GameObject } from "../GameObject.js";

export class Ruins extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    console.log(`🏛️ 你探索了 ${this.name}，裡面似乎隱藏著未知的秘密...`);
  }
}
