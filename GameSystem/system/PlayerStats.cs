using System.Reflection;
using System.Text;

public class PlayerStats
{
    private int _hunger;
    private int _health;
    private int _mood;
    private int _attackPower;
    private int _defensePower;
    private int _speed;

    // ���F�`�٪Ŷ��A�ڥu�ܽd�F�䤤�T���ݩʡA��l���i�H���ӦP�˪��Ҧ��[�J
    public int Hunger
    {
        get => _hunger;
        set => _hunger = Math.Max(0, Math.Min(100, value));
    }

    public int Health
    {
        get => _health;
        set => _health = Math.Max(0, Math.Min(100, value));
    }

    public int Mood
    {
        get => _mood;
        set => _mood = Math.Clamp(value, 0, 100);
    }

    public PlayerStats()
    {
        Hunger = 50;  // ��l���j�׳]��50
        Health = 100; // ��l��q�]��100
        Mood = 50;    // ��l�߱��]��50
    }
    // ...�z�i�H�~��[�J�����O�B���m�O�B�t�׵��ݩ�...

    public void Time()//�C�Q����
    {
        Hunger--;
    }

    public void MoodChange(Thing thing)
    {
        if (thing.isGood)
        {
            Mood+=30;
        }
        else if (!thing.isGood)
        {
            Mood-=30;
        }
    }

    public void DisplayStats()
    {
        StringBuilder statsBuilder = new StringBuilder("Player Stats:\n");

        // �ϥΤϮg����Ҧ��p���r�q
        FieldInfo[] fields = typeof(PlayerStats).GetFields(BindingFlags.NonPublic | BindingFlags.Instance);

        foreach (var field in fields)
        {
            // �p�G�r�q�W�H'_'�}�Y�]���Өp���r�q�R�W�D�ҡ^�A�h���L��
            if (field.Name.StartsWith("_"))
            {
                // �q�r�q�W���h��'_'�������
                string statName = field.Name.Substring(1);
                int value = (int)field.GetValue(this);

                statsBuilder.AppendLine($"{statName}: {value}");
            }
        }

        Console.WriteLine(statsBuilder.ToString() + "\n");
    }

    public override string ToString()
    {
        return $"Player Stats:\n" +
               $"Hunger: {_hunger}\n" +
               $"Health: {_health}\n" +
               $"Mood: {_mood}\n" +
               $"Attack Power: {_attackPower}\n" +
               $"Defense Power: {_defensePower}\n" +
               $"Speed: {_speed}";
    }
}