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
            Console.WriteLine($"No {item.Name} left to use.");
        }
    }

    public static void BuyItem(Player player, Business business, Item item, int quantity)
    {
        int totalPrice = item.Price * quantity;

        if (!business.Inventory.items.ContainsKey(item))
        {
            Console.WriteLine("���~�w���j!");
            return;
        }

        if (business.Inventory.items[item] < quantity)
        {
            Console.WriteLine("���~�ƶq����!");
            return;
        }

        if (player.Inventory.Gold < totalPrice)
        {
            Console.WriteLine("��������!");
            return;
        }

        // Perform the transaction
        player.Inventory.Gold -= totalPrice;
        business.Inventory.Gold += totalPrice;
        player.Inventory.AddItem(item, quantity);
        business.Inventory.items[item] -= quantity;

        Console.WriteLine($"{item.Name} �ʶR���\!");
    }

    public static void SellItem(Player player, Business business, Item item, int quantity)
    {
        int sellingPrice = item.Price * quantity;

        if (!player.Inventory.HasItem(item, quantity))
        {
            Console.WriteLine("�z�S�����������~�ӽ�!");
            return;
        }

        if (business.Inventory.Gold < sellingPrice)
        {
            Console.WriteLine("���a�S�������������ʶR�z�����~!");
            return;
        }

        // Perform the transaction
        player.Inventory.RemoveItem(item, quantity);
        player.Inventory.Gold += sellingPrice;
        business.Inventory.Gold -= sellingPrice;

        if (business.Inventory.items.ContainsKey(item))
        {
            business.Inventory.items[item] += quantity;
        }
        else
        {
            business.Inventory.items[item] = quantity;
        }

        Console.WriteLine($"{item.Name} �w���\��X!");
    }

    public bool HasItem(Item item, int quantity)
    {
        if (items.ContainsKey(item))
        {
            return items[item] >= quantity;
        }
        return false;
    }

    public void DisplayInventory()
    {
        Console.WriteLine("Inventory:");
        foreach (var entry in items)
        {
            Console.WriteLine($"{entry.Key.Name} (x{entry.Value})");
        }
        Console.WriteLine("\n");
    }

    public void GetItemCount(Item item)
    {
        int count = items.ContainsKey(item) ? items[item] : 0;
        Console.WriteLine($"���a�I�]���C���ƶq: {count}");  // "���a�Ѿl����:"
    }
}