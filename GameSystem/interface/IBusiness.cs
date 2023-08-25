public interface IBusiness
{
    private bool BuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        return Inventory.BuyItem(buyer, seller, item, quantity);
    }

    private bool SellItem(Player seller, Player buyer, Item item, int quantity = 1)
    {
        return Inventory.SellItem(seller, buyer, item, quantity);
    }

    public bool RequestBuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        return BuyItem(buyer, seller, item, quantity);
    }

    public bool ReSponseBuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        return BuyItem(buyer, seller, item, quantity);
    }

    public bool RequestSellItem(Player seller, Player buyer, Item item, int quantity = 1)
    {
        return SellItem(seller, buyer, item, quantity = 1);
    }

    public bool ReSponseSellItem(Player seller, Player buyer, Item item, int quantity = 1)
    {
        return SellItem(seller, buyer, item, quantity = 1);
    }
}