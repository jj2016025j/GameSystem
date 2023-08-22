// FoodItem ���O�A���i�H�W�[���a�����j��
public class FoodItem : Item, IUsable
{
    private int hungerRestoreValue;

    public FoodItem(string name, int price, int restoreValue) : base(name, price)
    {
        hungerRestoreValue = restoreValue;
    }

    public override void UseItem(Player Alice)
    {
        Alice.PlayerStats.Hunger += hungerRestoreValue; // �o�̻ݭn�T�O Player ���O���@�� Hunger �ݩʡA�åB�i�H�ק�
        Console.WriteLine($"{Alice.Name} Used {Name}");
    }
}