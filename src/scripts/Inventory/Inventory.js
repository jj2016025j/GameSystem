export class InventoryManager {
    constructor(player, gold = 0, inventory = []) {
        this.player = player;
        this.gold = gold || 0;
        this.items = new Map(
            inventory.items.map((item) => [item.id, { ...item, quantity: item.quantity }])
        );
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
            items: Array.from(this.items.values()).map(item => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                attributes: item.attributes,
            })),
            gold: this.gold,
        };
    }    
}
