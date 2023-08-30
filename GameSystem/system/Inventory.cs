using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;

public class Inventory
{
    public int Gold { get; set; }

    private Dictionary<Item, int> items;
    private List<Item> item;//�ƥ�

    public Inventory(int gold = 0)
    {
        Gold = gold;
        items = new Dictionary<Item, int>();
    }

    public void AddItems(Dictionary<Item, int> newItems)
    {
        foreach (var item in newItems)
        {
            if (items.ContainsKey(item.Key))
            {
                items[item.Key] += item.Value;
            }
            else
            {
                items[item.Key] = item.Value;
            }
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

    public bool UseItem(Player player, Item item)
    {
        if (items.ContainsKey(item) && items[item] > 0)
        {
            item.UseItem(player);
            RemoveItem(item);
            return true;
        }
        else
        {
            Program.TypeTextWithThreadSleep($"{player.Name} �S���i�Ϊ� {item.Name}");
            return false;
        }
    }

    public static bool BuyItem(Player buyer, Player seller, Item item, int quantity)
    {
        int totalPrice = item.Price * quantity;

        if (!seller.Inventory.items.ContainsKey(item))
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} ���~�w���j!");
            return false;
        }

        if (seller.Inventory.items[item] < quantity)
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} ���~�ƶq����!");
            return false;
        }

        if (buyer.Inventory.Gold < totalPrice)
        {
            Program.TypeTextWithThreadSleep($"{buyer.Name} ��������!");
            return false;
        }

        // Perform the transaction
        buyer.Inventory.Gold -= totalPrice;
        seller.Inventory.Gold += totalPrice;
        buyer.Inventory.AddItems(new Dictionary<Item, int> { { item, quantity } });
        seller.Inventory.items[item] -= quantity;
        Program.TypeTextWithThreadSleep($"{buyer.Name} �V {seller.Name} �ʶR {item.Name} ���\!");
        return true;
    }

    public static bool SellItem(Player seller, Player buyer, Item item, int quantity)
    {
        int sellingPrice = item.Price * quantity;

        if (!seller.Inventory.HasItem(item, quantity))
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} �S�����������~�ӽ�!");
            return false;
        }

        if (buyer.Inventory.Gold < sellingPrice)
        {
            Program.TypeTextWithThreadSleep($"{buyer.Name} �S�������������ʶR {seller.Name} �����~!");
            return false;
        }

        // Perform the transaction
        seller.Inventory.RemoveItem(item, quantity);
        seller.Inventory.Gold += sellingPrice;
        buyer.Inventory.Gold -= sellingPrice;
        if (buyer.Inventory.items.ContainsKey(item))
        {
            buyer.Inventory.items[item] += quantity;
        }
        else
        {
            buyer.Inventory.items[item] = quantity;
        }
        Program.TypeTextWithThreadSleep($" {seller.Name} �w���\��X {item.Name} �� {buyer.Name}!");
        return true;
    }
        public bool HasRequiredMaterials(Dictionary<Item, int> materials)
    {
        foreach (var material in materials)
        {
            if (!items.ContainsKey(material.Key) || items[material.Key] < material.Value)
            {
                return false;
            }
        }

        return true;
    }

    public void RemoveMaterials(Dictionary<Item, int> materials)
    {
        foreach (var material in materials)
        {
            items[material.Key] -= material.Value;
        }
    }
    public bool HasItem(Item item, int quantity = 1)
    {
        if (items.ContainsKey(item))
        {
            return items[item] >= quantity;
        }
        return false;
    }

    public T? FindItem<T>() where T : Item => items.Keys.OfType<T>().FirstOrDefault();

    public KeyValuePair<Food, int>? FindFirstFoodItem()
    {
        var foodItem = items.FirstOrDefault(pair => pair.Key is Food);
        if (foodItem.Key != null)
        {
            return new KeyValuePair<Food, int>((Food)foodItem.Key, foodItem.Value);
        }
        return null;
    }

    public Dictionary<Food, int> GetAllItems()
    {
        return items.Where(pair => pair.Key is Food)
                    .ToDictionary(pair => (Food)pair.Key, pair => pair.Value);
    }

    public void DisplayInventory(Player player)
    {
        if (Program.test)
        {
            Program.TypeTextWithThreadSleep($"{player.Name} �Ѿl����: {player.Inventory.Gold}");
            Program.TypeTextWithThreadSleep($"�s�f:");
            foreach (var item in items)
            {
                Program.TypeTextWithThreadSleep($"{item.Key.Name} (x{item.Value})");
            }
            Program.TypeTextWithThreadSleep($"\n");
        }
    }

    public void GetItemCount(Item item)
    {
        int count = items.ContainsKey(item) ? items[item] : 0;
        Program.TypeTextWithThreadSleep($"{item.Name} (x{count})");  // "���a�Ѿl����:"
    }
}