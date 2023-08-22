// FoodItem 類別，它可以增加玩家的飢餓度
public class FoodItem : Item, IUsable
{
    private int hungerRestoreValue;

    public FoodItem(string name, int price, int restoreValue) : base(name, price)
    {
        hungerRestoreValue = restoreValue;
    }

    public override void UseItem(Player Alice)
    {
        Alice.PlayerStats.Hunger += hungerRestoreValue; // 這裡需要確保 Player 類別有一個 Hunger 屬性，並且可以修改
        Console.WriteLine($"{Alice.Name} Used {Name}");
    }
}