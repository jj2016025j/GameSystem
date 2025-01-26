// 商店類別
class Shop {
    constructor(name) {
        this.name = name;
        this.backpack = new Backpack(this);
    }

    buyItems(seller, inputItems, priceMap) {
        const itemsToBuy = Array.isArray(inputItems)
            ? inputItems
            : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

        const totalPrice = this.backpack.calculateTotalPrice(itemsToBuy, priceMap);
        if (!this.backpack.hasMoney(totalPrice)) {
            console.log("購買失敗：金額不足。");
            return false;
        }

        const allAvailable = itemsToBuy.every(({ name, quantity }) => seller.backpack.hasItem(name, quantity));
        if (!allAvailable) {
            console.log("購買失敗：賣家物品不足。");
            return false;
        }

        this.backpack.transferItems(seller.backpack, this.backpack, itemsToBuy);
        this.backpack.gold -= totalPrice;
        seller.backpack.gold += totalPrice;

        console.log(`${this.name} 成功購買物品。`);
        return true;
    }

    sellItems(buyer, inputItems, priceMap) {
        const itemsToSell = Array.isArray(inputItems)
            ? inputItems
            : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

        const totalPrice = this.backpack.calculateTotalPrice(itemsToSell, priceMap);
        if (!buyer.backpack.hasMoney(totalPrice)) {
            console.log("出售失敗：買家金額不足。");
            return false;
        }

        const allAvailable = itemsToSell.every(({ name, quantity }) => this.backpack.hasItem(name, quantity));
        if (!allAvailable) {
            console.log("出售失敗：商店物品不足。");
            return false;
        }

        this.backpack.transferItems(this.backpack, buyer.backpack, itemsToSell);
        this.backpack.gold += totalPrice;
        buyer.backpack.gold -= totalPrice;

        console.log(`${this.name} 成功出售物品。`);
        return true;
    }
}