// 商店系統模組
import { DOMUtils } from "../utils/domUtils.js";

export class ShopSystem {
    static updateShopsList(shops) {
        DOMUtils.clearAndPopulateList(
            "#shopsList",
            shops,
            shop =>
                DOMUtils.createListItem(shop.name, [
                    DOMUtils.createButton("購買", () => ShopSystem.handleBuy(shop)),
                    DOMUtils.createButton("出售", () => ShopSystem.handleSell(shop))
                ])
        );
    }

    static handleBuy(shop) {
        console.log(`向 ${shop.name} 購買物品。`);
        // 在此添加購買邏輯，例如彈出購買窗口或直接進行購買。
    }

    static handleSell(shop) {
        console.log(`向 ${shop.name} 出售物品。`);
        // 在此添加出售邏輯，例如彈出出售窗口或直接進行出售。
    }
}
