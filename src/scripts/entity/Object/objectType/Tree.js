import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Tree extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    SystemLog.addMessage(`🌳 你觸摸了 ${this.name}，感受到一股平靜的自然氣息。`);
  }
}
