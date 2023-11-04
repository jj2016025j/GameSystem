// 定義背包類別
class Backpack {
    constructor(name) {
      this.name = name
      this.money = 0; // 初始化為0
      this.items = {}; // 初始化為空的物品列表 存储物品和数量
    }

    // addItems(itemsToAdd) {
    //   for (const [item, quantity] of Object.entries(itemsToAdd)) {
    //     if (this.items[item]) {
    //       this.items[item] += quantity;
    //     } else {
    //       this.items[item] = quantity;
    //     }
    //   }
    // }   
    addItems(itemsToAdd) {
      for (const [item, quantity] of Object.entries(itemsToAdd)) {
        if (quantity < 0) {
          return false; // Indicate that the operation was not successful
        }
        this.items[item] = (this.items[item] || 0) + quantity;
      }
      return true; // Indicate that the operation was successful
    }

    removeItems(itemsToRemove) {
      for (const [item, quantity] of Object.entries(itemsToRemove)) {
        if (this.items[item] && this.items[item] >= quantity) {
          this.items[item] -= quantity;
          if (this.items[item] === 0) {
            delete this.items[item];
          }
        } else {
          // console.log(`Not enough of ${item} to remove or it doesn't exist.`);
          // You may want to handle the logic here, e.g., throw an error or break the loop
        }
      }
    }
    
    useItems(itemsToUse) {
      // 首先检查是否所有物品都足够
      for (const [item, quantity] of Object.entries(itemsToUse)) {
        if (!this.items[item] || this.items[item] < quantity) {
          // 如果任何一个物品不足，立即返回失败
          return false;
        }
      }
    
      // 然后执行实际的物品使用
      for (const [item, quantity] of Object.entries(itemsToUse)) {
        this.items[item] -= quantity;
        if (this.items[item] === 0) {
          delete this.items[item];
        }
      }
    
      // 如果代码执行到这里，说明所有物品都成功使用了
      return true;
    }    

      // 检查是否有足够的物品
  hasItem(item, quantity) {
    return this.items[item] && this.items[item] >= quantity;
  }

  // 检查是否有足够的金钱
  hasMoney(amount) {
    return this.money >= amount;
  }
  
  // 购买物品
  buyItems(seller, itemsToBuy, pricePerItem) {
    let totalPrice = 0;

    // 计算总价
    for (const [item, quantity] of Object.entries(itemsToBuy)) {
      if (!seller.hasItem(item, quantity)) {
        // console.log(`${seller.name} 没有足够的 ${item} 出售。`);
        return false;// 如果卖家没有足够的物品，立即退出
      }
      totalPrice += pricePerItem[item] * quantity;
    }

    // 检查买家是否有足够的金钱
    if (!this.hasMoney(totalPrice)) {
      // console.log(`${this.name} 没有足够的金钱购买物品。`);
      return false;
    }

    // 执行交易
    for (const [item, quantity] of Object.entries(itemsToBuy)) {
      seller.removeItems({ [item]: quantity });
      this.addItems({ [item]: quantity });
    }
    
    // 更新金钱
    this.money -= totalPrice;
    seller.money += totalPrice;

    // console.log(`${this.name} 从 ${seller.name} 购买了物品。`);
    return true; // 交易成功
  }

  // 出售物品
  sellItems(buyer, itemsToSell, pricePerItem) {
    let totalPrice = 0;
  
    // 计算总价
    for (const [item, quantity] of Object.entries(itemsToSell)) {
      if (!this.hasItem(item, quantity)) {
        // console.log(`${this.name} 没有足够的 ${item} 出售。`);
        return false; // 如果卖家没有足够的物品，返回失败
      }
      totalPrice += pricePerItem[item] * quantity;
    }
  
    // 检查买家是否有足够的金钱
    if (!buyer.hasMoney(totalPrice)) {
      // console.log(`${buyer.name} 没有足够的金钱购买物品。`);
      return false;
    }
  
    // 执行交易
    for (const [item, quantity] of Object.entries(itemsToSell)) {
      this.removeItems({ [item]: quantity });
      buyer.addItems({ [item]: quantity });
    }
    
    // 更新金钱
    this.money += totalPrice;
    buyer.money -= totalPrice;
  
    // console.log(`${this.name} 将物品出售给了 ${buyer.name}。`);
    return true; // 交易成功
  }
}