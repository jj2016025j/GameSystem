import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Rock extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    SystemLog.addMessage(`🪨 ${this.name} 是一塊普通的石頭，沒有什麼特別的地方。`);
  }
}
