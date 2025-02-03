export class Inventory {
    constructor({ gold = 0, items = [] } = {}) {
        this.gold = typeof gold === "number" ? gold : 0; // ✅ 確保 gold 為數字

        // ✅ 確保 items 不管是 Map、物件還是陣列，都能正確轉換
        if (items instanceof Map) {
            this.items = new Map(items);
        } else if (Array.isArray(items)) {
            this.items = new Map(items.map((item) => [item.id, { ...item, quantity: item.quantity }]));
        } else if (typeof items === "object") {
            this.items = new Map(Object.entries(items));
        } else {
            this.items = new Map();
        }
    }

    getItemById(itemId) {
        return this.items.get(itemId) || null;
    }

    getItemByName(itemName) {
        for (const item of this.items.values()) {
            if (item.name === itemName) return item;
        }
        return null;
    }

    processItems(inputItems, callback) {
        const items = Array.isArray(inputItems)
            ? inputItems
            : Object.entries(inputItems).map(([id, quantity]) => ({ id, quantity }));
        items.forEach((item) => callback(this.getItemById(item.id), item.quantity));
    }

    addItems(inputItems) {
        this.processItems(inputItems, (item, quantity) => {
            if (item) {
                item.quantity += quantity;
            } else {
                console.log(`⚠️ 無法添加未知物品`);
            }
        });
    }

    removeItems(inputItems) {
        this.processItems(inputItems, (item, quantity) => {
            if (item && item.quantity >= quantity) {
                item.quantity -= quantity;
                if (item.quantity === 0) this.items.delete(item.id);
            } else {
                console.log(`⚠️ ${item ? item.name : "未知物品"} 數量不足`);
            }
        });
    }

    decreaseDurability(itemId, amount) {
        const item = this.getItemById(itemId);
        if (item && item.attributes.durability) {
            item.attributes.durability = Math.max(0, item.attributes.durability - amount);
            if (item.attributes.durability === 0) {
                console.log(`⚠️ ${item.name} 耐久度耗盡，已損壞`);
            }
        }
    }

    filterItemsByType(type) {
        return Array.from(this.items.values()).filter((item) => item.type === type);
    }

    listAllItems() {
        return Array.from(this.items.values());
    }

    transferItemsTo(targetInventory, inputItems) {
        const transferredItems = [];
        this.processItems(inputItems, (item, quantity) => {
            if (item && item.quantity >= quantity) {
                this.removeItems([{ id: item.id, quantity }]);
                targetInventory.addItems([{ id: item.id, quantity }]);
                transferredItems.push(item.name);
            } else {
                console.log(`⚠️ 無法轉移 ${item ? item.name : "未知物品"}，數量不足`);
            }
        });
        return transferredItems;
    }

    addMoney(amount) {
        this.gold += amount;
    }

    removeMoney(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
        } else {
            console.log("⚠️ 金幣不足");
        }
    }

    checkMoney(amount) {
        return this.gold >= amount;
    }

    // 返回可序列化的數據
    getSerializableData() {
        return {
            items: Array.from(this.items.values()), // ✅ Map 轉換成陣列
            gold: this.gold,
        };
    }
}
