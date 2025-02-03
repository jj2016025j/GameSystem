// **水井 (Well)** - 可補充水分

import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Well extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.waterAmount = props.waterAmount || 100;
  }

  interact() {
    if (this.waterAmount > 0) {
      this.waterAmount -= 10;
      SystemLog.addMessage(`💧 你從 ${this.name} 取水，剩餘水量: ${this.waterAmount}`);
    } else {
      SystemLog.addMessage(`💧 ${this.name} 的水已經乾涸了！`);
    }
  }
}
