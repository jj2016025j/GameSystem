public class Inventory
{
    public int Gold { get; set; }
    private Dictionary<Item, int> items;
    
    public Inventory(int gold = 0)
    {
        Gold = gold;
        items = new Dictionary<Item, int>();
    }

    public void AddItem(Item item, int quantity = 1)
    {
        if (items.ContainsKey(item))
        {
            items[item] += quantity;
        }
        else
        {
            items[item] = quantity;
        }
    }

    public void RemoveItem(Item item, int quantity = 1)
    {
        if (items.ContainsKey(item))
        {
            items[item] -= quantity;
            if (items[item] <= 0)
            {
                items.Remove(item);
            }
        }
    }

    public void UseItem(Player player, Item item)
    {
        if (items.ContainsKey(item) && items[item] > 0)
        {
            item.UseItem(player);
            RemoveItem(item);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"�S���i�Ϊ� {item.Name}");
        }
    }

    public static void BuyItem(Player player, Player self, Item item, int quantity)
    {
        int totalPrice = item.Price * quantity;

        if (!self.Inventory.items.ContainsKey(item))
        {
            Program.TypeTextWithThreadSleep($"���~�w���j!");
            return;
        }

        if (self.Inventory.items[item] < quantity)
        {
            Program.TypeTextWithThreadSleep($"���~�ƶq����!");
            return;
        }

        if (player.Inventory.Gold < totalPrice)
        {
            Program.TypeTextWithThreadSleep($"��������!");
            return;
        }

        // Perform the transaction
        player.Inventory.Gold -= totalPrice;
        self.Inventory.Gold += totalPrice;
        player.Inventory.AddItem(item, quantity);
        self.Inventory.items[item] -= quantity;

        Program.TypeTextWithThreadSleep($"{item.Name} �ʶR���\!");
    }

    public static void SellItem(Player player, Player self, Item item, int quantity)
    {
        int sellingPrice = item.Price * quantity;

        if (!player.Inventory.HasItem(item, quantity))
        {
            Program.TypeTextWithThreadSleep($"�z�S�����������~�ӽ�!");
            return;
        }

        if (self.Inventory.Gold < sellingPrice)
        {
            Program.TypeTextWithThreadSleep($"���a�S�������������ʶR�z�����~!");
            return;
        }

        // Perform the transaction
        player.Inventory.RemoveItem(item, quantity);
        player.Inventory.Gold += sellingPrice;
        self.Inventory.Gold -= sellingPrice;

        if (self.Inventory.items.ContainsKey(item))
        {
            self.Inventory.items[item] += quantity;
        }
        else
        {
            self.Inventory.items[item] = quantity;
        }

        Program.TypeTextWithThreadSleep($"{item.Name} �w���\��X!");
    }

    public bool HasItem(Item item, int quantity)
    {
        if (items.ContainsKey(item))
        {
            return items[item] >= quantity;
        }
        return false;
    }

    public void DisplayInventory(Player player)
    {
        Program.TypeTextWithThreadSleep($"{player.Name}�Ѿl����: {player.Inventory.Gold}");
        Program.TypeTextWithThreadSleep($"�s�f:");
        foreach (var entry in items)
        {
            Program.TypeTextWithThreadSleep($"{entry.Key.Name} (x{entry.Value})");
        }
        Program.TypeTextWithThreadSleep($"\n");
    }

    public void GetItemCount(Item item)
    {
        int count = items.ContainsKey(item) ? items[item] : 0;
        Program.TypeTextWithThreadSleep($"{item.Name} (x{count})");  // "���a�Ѿl����:"
    }
}