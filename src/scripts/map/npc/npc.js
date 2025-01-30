class NPC {
    constructor({ id, name, dialogue = [], itemsForSale = [] }) {
        this.id = id;
        this.name = name;
        this.dialogue = dialogue;
        this.itemsForSale = itemsForSale; // 商品列表
    }

    speak() {
        if (this.dialogue.length > 0) {
            const randomDialogue = this.dialogue[Math.floor(Math.random() * this.dialogue.length)];
            console.log(`${this.name}: "${randomDialogue}"`);
        } else {
            console.log(`${this.name} 沒有話要說`);
        }
    }

    sellItem(itemId, buyer) {
        const item = this.itemsForSale.find((i) => i.id === itemId);
        if (!item) {
            console.log(`${this.name} 沒有出售此物品`);
            return false;
        }

        if (buyer.gold >= item.price) {
            buyer.gold -= item.price;
            buyer.inventory.addItem(item);
            console.log(`${this.name} 賣出 ${item.name} 給 ${buyer.name}`);
            return true;
        } else {
            console.log(`${buyer.name} 金幣不足`);
            return false;
        }
    }
}

export { NPC };
