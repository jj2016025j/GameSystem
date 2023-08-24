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
        Program.TypeTextWithThreadSleep($"{Alice.Name} 使用了 {Name}");
    }

    public void Collect(Player Alice)
    {
        Program.TypeTextWithThreadSleep($"{Alice.Name} 蒐集了 "+ Name + "!");
        Alice.Inventory.AddItem(this);
    }
}