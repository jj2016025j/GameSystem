using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;

public class Inventory
{
    public int Gold { get; set; }

    private Dictionary<Item, int> items;

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
            Program.TypeTextWithThreadSleep($"{player.Name} 沒有可用的 {item.Name}");
            return false;
        }
    }

    public static bool BuyItem(Player buyer, Player seller, Item item, int quantity)
    {
        int totalPrice = item.Price * quantity;

        if (!seller.Inventory.items.ContainsKey(item))
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} 物品已售罄!");
            return false;
        }

        if (seller.Inventory.items[item] < quantity)
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} 物品數量不足!");
            return false;
        }

        if (buyer.Inventory.Gold < totalPrice)
        {
            Program.TypeTextWithThreadSleep($"{buyer.Name} 金幣不足!");
            return false;
        }

        // Perform the transaction
        buyer.Inventory.Gold -= totalPrice;
        seller.Inventory.Gold += totalPrice;
        buyer.Inventory.AddItems(new Dictionary<Item, int> { { item, quantity } });
        seller.Inventory.items[item] -= quantity;
        Program.TypeTextWithThreadSleep($"{buyer.Name} 向 {seller.Name} 購買 {item.Name} 成功!");
        return true;
    }

    public static bool SellItem(Player seller, Player buyer, Item item, int quantity)
    {
        int sellingPrice = item.Price * quantity;

        if (!seller.Inventory.HasItem(item, quantity))
        {
            Program.TypeTextWithThreadSleep($"{seller.Name} 沒有足夠的物品來賣!");
            return false;
        }

        if (buyer.Inventory.Gold < sellingPrice)
        {
            Program.TypeTextWithThreadSleep($"{buyer.Name} 沒有足夠的金幣購買 {seller.Name} 的物品!");
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
        Program.TypeTextWithThreadSleep($" {seller.Name} 已成功賣出 {item.Name} 給 {buyer.Name}!");
        return true;
    }

    public bool HasItem(Item item, int quantity)
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
            Program.TypeTextWithThreadSleep($"{player.Name} 剩餘金幣: {player.Inventory.Gold}");
            Program.TypeTextWithThreadSleep($"存貨:");
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
        Program.TypeTextWithThreadSleep($"{item.Name} (x{count})");  // "玩家剩餘金幣:"
    }
}