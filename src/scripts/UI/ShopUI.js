import { SystemLog } from "../utils/SystemLog.js";

export class ShopUI {
    static initialize(gameSystem) {
        SystemLog.addMessage("[商店UI] 開始初始化");
        this.gameSystem = gameSystem;
        this.update();
        SystemLog.addMessage("[商店UI] 已初始化 ✅");
    }

    // ✅ 更新商店 UI（當玩家移動時自動更新）
    static update() {
        const mapRegion = this.gameSystem.currentLocation;
        if (!mapRegion || typeof mapRegion.listShops !== "function") {
            console.error("❌ 當前地圖數據異常，無法獲取商店");
            return;
        }

        this.shops = mapRegion.listShops(this.gameSystem.shopManager);
        this.render();
        SystemLog.addMessage(`[商店UI] 更新 ${this.shops.length} 間商店`);
    }

    // ✅ 渲染商店 UI，直接列出所有商品
    static render() {
        const shopList = document.querySelector("#shopsList");
        if (!shopList) {
            console.error("❌ 無法找到 #shopsList，請確認 HTML 結構");
            return;
        }

        shopList.innerHTML = ""; // 清空列表

        if (!this.shops || this.shops.length === 0) {
            shopList.innerHTML = "<li>🛒 這個地點沒有商店</li>";
            return;
        }

        this.shops.forEach(shop => {
            const shopContainer = document.createElement("li");
            shopContainer.textContent = `🏬 ${shop.name}`;

            const itemList = document.createElement("ul");
            itemList.classList.add("shop-item-list"); // 添加 class 以便樣式調整

            // ✅ 取得商店內的物品列表
            shop.inventory.getItems().forEach(item => {
                const itemLi = document.createElement("li");
                itemLi.textContent = `${item.name} - 💰 ${item.price} 金幣`;
                itemList.appendChild(itemLi);
            });

            shopContainer.appendChild(itemList);
            shopList.appendChild(shopContainer);
        });
    }
}
