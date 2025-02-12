// **噴泉 (Fountain)** - 可恢復體力
import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Fountain extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.restoreAmount = props.restoreAmount || 10;
  }

  interact() {
    SystemLog.addMessage(`⛲ ${this.name} 的水讓你恢復了 ${this.restoreAmount} 點體力！`);
  }
}
