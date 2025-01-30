class ShopManager {
    constructor(shops = []) {
      this.shops = new Map(shops.map((shop) => [shop.id, new Shop(shop)]));
    }
  
    getShopById(id) {
      return this.shops.get(id) || null;
    }
  }
  
  export { ShopManager };
  