public class Item : IName, ICollectable
{
    public string Name { get; set; }
    public int Price { get; private set; }

    public Item(string name,  int price)
    {
        Name = name;
        Price = price;
    }

    public virtual void UseItem(Player player)
    {
        // �w�q���~���ϥήĪG�A�p��_�ͩR�B�W�[�����O���C
        Console.WriteLine($"{player.Name} Used {Name}");
    }

    public void Collect(Player player)
    {
        Console.WriteLine($"{player.Name} collected a "+ Name + "!");
        player.Inventory.AddItem(this);
    }
}