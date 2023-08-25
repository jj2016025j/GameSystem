// Food 類別，它可以增加玩家的飢餓度
public class Food : Item, IEatable
{
    private int hungerRestoreValue;

    public Food(string name, int price, int restoreValue) : base(name, price)
    {
        hungerRestoreValue = restoreValue;
    }

    public void EatFood(Player player)
    {
        player.PlayerStats.Saturation += hungerRestoreValue; // 這裡需要確保 Player 類別有一個 Saturation 屬性，並且可以修改
        Program.TypeTextWithThreadSleep($"{player.Name} 食用了 {Name}");
    }
}