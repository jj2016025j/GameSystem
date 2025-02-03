import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Lever extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.isActivated = false;
  }

  interact() {
    this.isActivated = !this.isActivated;
    SystemLog.addMessage(`🔄 ${this.name} ${this.isActivated ? "被啟動了！" : "被關閉了！"}`);
  }
}
