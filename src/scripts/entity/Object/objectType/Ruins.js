import { GameObject } from "../GameObject.js";
import { SystemLog } from "../../../utils/SystemLog.js";

export class Ruins extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: false });
  }

  interact() {
    SystemLog.addMessage(`🏛️ 你探索了 ${this.name}，裡面似乎隱藏著未知的秘密...`);
  }
}
