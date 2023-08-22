public class Item : IName, ICollectable
{
    public string Name { get; set; }
    public int Price { get; private set; }

    public Item(string name,  int price)
    {
        Name = name;
        Price = price;
    }

    public virtual void UseItem(Player Alice)
    {
        // 定義物品的使用效果，如恢復生命、增加攻擊力等。
        Console.WriteLine($"{Alice.Name} Used {Name}");
    }

    public void Collect(Player Alice)
    {
        Console.WriteLine($"{Alice.Name} collected a "+ Name + "!");
        Alice.Inventory.AddItem(this);
    }
}