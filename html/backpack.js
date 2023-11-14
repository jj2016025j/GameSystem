// 定義背包類別
class Backpack {
    constructor(user) {
      this.user = user
      this.gold = 0; // 初始化為0
      this.items = []; // 初始化為空的物品列表 存储物品和数量
    }

  // 添加物品，接受对象或数组格式的输入
  AddItems(inputItems) {
    // 如果输入是对象，则将其转换为数组
    const itemsToAdd = Array.isArray(inputItems) ? inputItems : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

    // 处理转换后的数组格式的物品
    itemsToAdd.forEach(item => {
      // 查找背包中是否已有该物品
      const existingItem = this.items.find(i => i.name === item.name);
      if (existingItem) {
        // 如果存在，则增加数量
        existingItem.quantity += item.quantity;
      } else {
        // 如果不存在，添加新物品
        this.items.push({...item});
      }
    }); 
  }

  // 移除物品，接受对象或数组格式的输入
  removeItems(inputItems) {
    // 如果输入是对象，则将其转换为数组
    const itemsToRemove = Array.isArray(inputItems) ? inputItems : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

    // 处理转换后的数组格式的物品
    itemsToRemove.every(item => {
      const itemIndex = this.items.findIndex(i => i.name === item.name);
      if (itemIndex > -1) {
        // 如果找到了物品，减少数量
        this.items[itemIndex].quantity -= item.quantity;
        if (this.items[itemIndex].quantity <= 0) {
          // 如果数量为0或负数，移除该物品
          this.items.splice(itemIndex, 1);
        }
      }
    });
  }
    
  // 使用物品
  useItems(inputItems) {
    // 检查是否所有物品都足够
    // 如果输入是对象，则将其转换为数组
    const itemsToUse = Array.isArray(inputItems) ? inputItems : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));

    const allItemsAvailable = itemsToUse.every(itemData => {
      const existingItem = this.items.find(item => item.name === itemData.name);
      return existingItem && existingItem.quantity >= itemData.quantity;
    });

    if (!allItemsAvailable) {
      // 如果任何一个物品不足，立即返回失败
      return false;
    }

    // 然后执行实际的物品使用
    itemsToUse.forEach(itemData => {
      const itemIndex = this.items.findIndex(item => item.name === itemData.name);
      if (itemIndex !== -1) {
        this.items[itemIndex].quantity -= itemData.quantity;
        if (this.items[itemIndex].quantity <= 0) {
          // 如果物品使用后数量为0，则完全移除该物品
          this.items.splice(itemIndex, 1);
        }
      }
    });

    // 如果代码执行到这里，说明所有物品都成功使用了
    return true;
  }

  // 检查背包中是否有指定物品和数量
  hasItem(itemName, quantity) {
    const item = this.items.find(i => i.name === itemName);
    return item && item.quantity >= quantity;
  }
  
  // 检查是否有足够的金钱
  hasMoney(amount) {
    return this.gold >= amount;
  }
  
  buyItems(seller, inputItems, pricePerItem) {
    // 如果输入是对象，则将其转换为数组
    const itemsToBuy = Array.isArray(inputItems) ? inputItems : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));
    let totalPrice = 0;

    // 首先检查是否所有要购买的物品都足够
    const allItemsAvailable = itemsToBuy.every(itemToBuy => {
      const item = seller.items.find(i => i.name === itemToBuy.name);
      return item && item.quantity >= itemToBuy.quantity && pricePerItem.hasOwnProperty(itemToBuy.name);
    });
  
    if (!allItemsAvailable) {
      return false;
    }
  
    // 计算总价
    itemsToBuy.forEach(itemToBuy => {
      totalPrice += pricePerItem[itemToBuy.name] * itemToBuy.quantity;
    });
  
    // 检查买家是否有足够的金钱
    if (!this.hasMoney(totalPrice)) {
      return false;
    }
  
    // 从卖家那里移除物品
    const itemsRemovedSuccessfully = seller.removeItems(itemsToBuy.map(item => ({
      name: item.name,
      quantity: item.quantity
    })));
  
    if (!itemsRemovedSuccessfully) {
      return false;
    }
  
    // 买家添加物品
    this.addItems(itemsToBuy.map(item => ({
      name: item.name,
      quantity: item.quantity
    })));
  
    // 更新金钱
    this.gold -= totalPrice;
    seller.gold += totalPrice;
  
    return true;
  }
  
  // 出售物品
  sellItems(buyer, inputItems, pricePerItem) {
    // 如果输入是对象，则将其转换为数组
    const itemsToSell = Array.isArray(inputItems) ? inputItems : Object.entries(inputItems).map(([name, quantity]) => ({ name, quantity }));
    // 检查是否所有要出售的物品都足够
    const allItemsAvailable = itemsToSell.every(itemToSell => {
      return this.hasItem(itemToSell.name, itemToSell.quantity) && pricePerItem.hasOwnProperty(itemToSell.name);
    });

    if (!allItemsAvailable) {
      return false;
    }

    // 计算总价
    let totalPrice = itemsToSell.reduce((total, itemToSell) => {
      return total + (pricePerItem[itemToSell.name] * itemToSell.quantity);
    }, 0);

    // 检查买家是否有足够的金钱
    if (!buyer.hasMoney(totalPrice)) {
      return false;
    }

    // 执行交易
    const itemsRemovedSuccessfully = itemsToSell.every(itemToSell => {
      const success = this.removeItems({ name: itemToSell.name, quantity: itemToSell.quantity });
      if (success) {
        buyer.addItem({ name: itemToSell.name, quantity: itemToSell.quantity });
      }
      return success;
    });

    if (!itemsRemovedSuccessfully) {
      return false;
    }

    // 更新金钱
    this.gold += totalPrice;
    buyer.gold -= totalPrice;

    return true;
  }
}