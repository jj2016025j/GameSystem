// **噴泉 (Fountain)** - 可恢復體力
import { GameObject } from "../GameObject.js";

export class Fountain extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.restoreAmount = props.restoreAmount || 10;
  }

  interact() {
    console.log(`⛲ ${this.name} 的水讓你恢復了 ${this.restoreAmount} 點體力！`);
  }
}
