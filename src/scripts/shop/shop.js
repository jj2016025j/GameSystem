import { SystemLog } from "./utils/SystemLog.js";

// 商店類別
class Shop {
    constructor(name) {
        this.name = name;
        this.inventory = new Inventory(this);
    }

    buyItems(seller, inputItems, priceMap) {
        const itemsToBuy = Array.isArray(inputItems)
            ? inputItems
            : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

        const totalPrice = this.inventory.calculateTotalPrice(itemsToBuy, priceMap);
        if (!this.inventory.hasMoney(totalPrice)) {
            SystemLog.addMessage("購買失敗：金額不足。");
            return false;
        }

        const allAvailable = itemsToBuy.every(({ name, quantity }) => seller.inventory.hasItem(name, quantity));
        if (!allAvailable) {
            SystemLog.addMessage("購買失敗：賣家物品不足。");
            return false;
        }

        this.inventory.transferItems(seller.inventory, this.inventory, itemsToBuy);
        this.inventory.gold -= totalPrice;
        seller.inventory.gold += totalPrice;

        SystemLog.addMessage(`${this.name} 成功購買物品。`);
        return true;
    }

    sellItems(buyer, inputItems, priceMap) {
        const itemsToSell = Array.isArray(inputItems)
            ? inputItems
            : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

        const totalPrice = this.inventory.calculateTotalPrice(itemsToSell, priceMap);
        if (!buyer.inventory.hasMoney(totalPrice)) {
            SystemLog.addMessage("出售失敗：買家金額不足。");
            return false;
        }

        const allAvailable = itemsToSell.every(({ name, quantity }) => this.inventory.hasItem(name, quantity));
        if (!allAvailable) {
            SystemLog.addMessage("出售失敗：商店物品不足。");
            return false;
        }

        this.inventory.transferItems(this.inventory, buyer.inventory, itemsToSell);
        this.inventory.gold += totalPrice;
        buyer.inventory.gold -= totalPrice;

        SystemLog.addMessage(`${this.name} 成功出售物品。`);
        return true;
    }
}


class Shop {
    constructor({ id, name, itemsForSale = [] }) {
      this.id = id;
      this.name = name;
      this.itemsForSale = itemsForSale; // 商店商品列表
    }
  
    listItems() {
      SystemLog.addMessage(`商店: ${this.name}`);
      this.itemsForSale.forEach((item) => {
        SystemLog.addMessage(`${item.name} - 價格: ${item.price}`);
      });
    }
  
    purchaseItem(itemId, buyer) {
      const item = this.itemsForSale.find((i) => i.id === itemId);
      if (!item) {
        SystemLog.addMessage(`商店 ${this.name} 中沒有此物品`);
        return false;
      }
  
      if (buyer.gold >= item.price) {
        buyer.gold -= item.price;
        buyer.inventory.addItem(item);
        SystemLog.addMessage(`${buyer.name} 購買了 ${item.name}`);
        return true;
      } else {
        SystemLog.addMessage(`${buyer.name} 金幣不足`);
        return false;
      }
    }
  }
  
  export { Shop };
  