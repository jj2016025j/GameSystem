public class Business : Skill
{
    public Inventory Inventory { get; private set; }

    public Business()
    {
        Inventory = new Inventory();
    }

    public void AddItemToShop(Item item, int quantity)
    {
        Inventory.AddItem(item, quantity);
    }

    public void AddItemsToShop(Dictionary<Item, int> itemsToAdd)
    {
        foreach (var entry in itemsToAdd)
        {
            Inventory.AddItem(entry.Key, entry.Value);
        }
    }

    public void RemoveItemFromShop(Item item, int quantity)
    {
        Inventory.RemoveItem(item, quantity);
    }

    public void RemoveItemsFromShop(Dictionary<Item, int> itemsToRemove)
    {
        foreach (var entry in itemsToRemove)
        {
            Inventory.RemoveItem(entry.Key, entry.Value);
        }
    }

    public void BuyItem(Player player, Item item, int quantity = 1)
    {
        Inventory.BuyItem(player, this, item, quantity);
    }
    
    public void SellItem(Player player, Item item, int quantity = 1)
    {
        Inventory.SellItem(player, this, item, quantity);
    }
    
    public override void Execute(Player player)
    {
        Console.WriteLine($"{player.Name} is Shoping...");
    }
}