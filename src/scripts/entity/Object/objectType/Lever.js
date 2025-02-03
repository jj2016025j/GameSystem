import { GameObject } from "../GameObject.js";

export class Lever extends GameObject {
  constructor(props) {
    super({ ...props, isInteractable: true });
    this.isActivated = false;
  }

  interact() {
    this.isActivated = !this.isActivated;
    console.log(`🔄 ${this.name} ${this.isActivated ? "被啟動了！" : "被關閉了！"}`);
  }
}
