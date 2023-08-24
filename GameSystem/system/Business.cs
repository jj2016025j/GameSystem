public class Business : ISkill
{
    public string Name => nameof(Business);
    
    public void Execute(Player player)
    {
        Program.TypeTextWithThreadSleep($"{player.Name} is Shopping...");
    }

    public void BuyItem(Player player, Player self, Item item, int quantity = 1)
    {
        Inventory.BuyItem(player, self, item, quantity);
    }
    
    public void SellItem(Player player, Player self, Item item, int quantity = 1)
    {
        Inventory.SellItem(player, self, item, quantity);
    }
}