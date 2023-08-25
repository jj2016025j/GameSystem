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
        Program.TypeTextWithThreadSleep($"{Alice.Name} �ϥΤF {Name}");
    }

    public void Collect(Player Alice)
    {
        Program.TypeTextWithThreadSleep($"{Alice.Name} �`���F "+ Name + "!");
        Alice.Inventory.AddItems(new Dictionary<Item, int> { { this, 1 } });
    }
}