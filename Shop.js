class Shop{
    constructor(name) {
        this.name = name;
        this.backpack = new Backpack(this);
    }

    //Shop is Seller
    // BuyFromShop(seller, itemsToBuy, pricePerItem){
    //     return this.backpack.buyItems(seller.backpack, itemsToBuy, pricePerItem, true);
    // }

    // //Shop is Buyer
    // SellToShop(buyer, itemsToSell, pricePerItem) {
    //     return this.backpack.sellItems(buyer.backpack, itemsToSell, pricePerItem, true)
    // }
}