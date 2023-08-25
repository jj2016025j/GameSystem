// Food ���O�A���i�H�W�[���a�����j��
public class Food : Item, IEatable
{
    private int hungerRestoreValue;

    public Food(string name, int price, int restoreValue) : base(name, price)
    {
        hungerRestoreValue = restoreValue;
    }

    public void EatFood(Player player)
    {
        player.PlayerStats.Saturation += hungerRestoreValue; // �o�̻ݭn�T�O Player ���O���@�� Saturation �ݩʡA�åB�i�H�ק�
        Program.TypeTextWithThreadSleep($"{player.Name} ���ΤF {Name}");
    }
}