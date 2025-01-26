// 背包類別
export class Backpack {
  constructor(user, backpack) {
      this.user = user;
      this.gold = 0;
      this.items = new Map(
        backpack.items.map((item) => [item.name, item.quantity])
      );
  }

  processItems(inputItems, callback) {
      const items = Array.isArray(inputItems)
          ? inputItems
          : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));
      items.forEach(callback);
  }

  addItems(inputItems) {
      this.processItems(inputItems, ({ name, quantity }) => {
          this.items.set(name, (this.items.get(name) || 0) + quantity);
      });
  }

  removeItems(inputItems) {
      this.processItems(inputItems, ({ name, quantity }) => {
          if (!this.items.has(name)) return;
          const currentQuantity = this.items.get(name);
          if (currentQuantity > quantity) {
              this.items.set(name, currentQuantity - quantity);
          } else {
              this.items.delete(name);
          }
      });
  }

  hasItem(name, quantity) {
      return this.items.has(name) && this.items.get(name) >= quantity;
  }

  hasMoney(amount) {
      return this.gold >= amount;
  }

  calculateTotalPrice(items, priceMap) {
      return items.reduce((total, { name, quantity }) => {
          if (!priceMap[name]) throw new Error(`Invalid item: ${name}`);
          return total + priceMap[name] * quantity;
      }, 0);
  }

  transferItems(source, target, items) {
      items.forEach(({ name, quantity }) => {
          source.removeItems({ [name]: quantity });
          target.addItems({ [name]: quantity });
      });
  }
}