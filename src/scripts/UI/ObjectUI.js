import { SystemLog } from "../utils/SystemLog.js";

export class ObjectUI {
    static initialize(gameSystem) {
        SystemLog.addMessage("[物件UI] 開始初始化");
        this.gameSystem = gameSystem;
        this.update();
        SystemLog.addMessage("[物件UI] 已初始化 ✅");
    }

    // ✅ 更新場景物件列表
    static update() {
        const mapRegion = this.gameSystem.currentLocation;
        if (!mapRegion || typeof mapRegion.listObjects !== "function") {
            console.error("❌ 當前地圖數據異常，無法獲取物件");
            return;
        }

        this.objects = mapRegion.listObjects(this.gameSystem.objectManager);
        this.render();
        SystemLog.addMessage(`[物件UI] 更新 ${this.objects.length} 個物件`);
    }

    // ✅ 渲染場景物件
    static render() {
        const objectList = document.querySelector("#objectsList");
        if (!objectList) {
            console.error("❌ 無法找到 #objectList，請確認 HTML 結構");
            return;
        }

        objectList.innerHTML = "";

        if (!this.objects || this.objects.length === 0) {
            objectList.innerHTML = "<li>🏞️ 這個地點沒有特殊物件</li>";
            return;
        }

        this.objects.forEach(object => {
            const li = document.createElement("li");
            li.textContent = object.name;
            li.dataset.objectId = object.id;

            const interactButton = document.createElement("button");
            interactButton.textContent = "互動";
            interactButton.classList.add("interact-button");
            interactButton.dataset.objectId = object.id;

            li.appendChild(interactButton);
            objectList.appendChild(li);
        });
    }

    static interact(objectId) {
        const object = this.objects.find(o => o.id === objectId);
        if (!object) {
            console.error(`❌ 找不到物件 ID: ${objectId}`);
            return;
        }

        object.interact();
    }
}

// ✅ 事件委派
document.addEventListener("click", (event) => {
    if (event.target.matches(".interact-button")) {
        const objectId = event.target.dataset.objectId;
        ObjectUI.interact(objectId);
    }
});
