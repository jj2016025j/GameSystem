using System.Diagnostics;
using System.Numerics;
using System.Reflection;
using System.Text;
using System.Timers;
using System.Xml.Linq;
using Timer = System.Threading.Timer;

public class PlayerStats
{
    enum Stats
    {
        Live,
        Sleep,
        Dead,
        Disappeared
    }

    // Example values
    private int _health = 100;
    public int Health
    {
        get => _health;
        set
        {
            _health = Math.Max(0, Math.Min(100, value));
            if (_health == 0)
            {
                Death();
            }
        }
    }
    private int _saturation = 100;
    public int Saturation
    {
        get => _saturation;
        set
        {
            _saturation = Math.Max(0, Math.Min(100, value));
            if (_saturation == 0)
            {
                Health -= 20;
            }
        }
    }
    private int _mood = 100;
    public int Mood
    {
        get => _mood;
        set
        {
            _mood = Math.Max(0, Math.Min(100, value));
            if (_mood == 0)
            {
                stats = Stats.Disappeared;
            }
        }
    }
    private int _physicalStrength = 100;
    public int PhysicalStrength
    {
        get => _physicalStrength;
        set
        {
            _physicalStrength = Math.Max(0, Math.Min(100, value));
            if (_physicalStrength == 0)
            {
                stats = Stats.Sleep;
            }
        }
    }

    // Boolean flags
    public bool IsSleeping { get; private set; }
    public bool LowHealth { get; private set; }
    public bool Lowsaturation { get; private set; }
    public bool PoorMood { get; private set; }
    public bool Lackofphysicalstrength { get; private set; }

    /// <summary>
    /// For 3DGame
    /// </summary>
    /*private int _attackPower;
    private int _attackSpeed;
    private int _defensePower;
    private int _speed;*/

    private Stats stats;

    private readonly int moodChangeValue = 5;

    public PlayerStats()
    {
        Saturation = 50;  // ��l���j�׳]��50
        Health = 100; // ��l��q�]��100
        Mood = 50;    // ��l�߱��]��50
        stats = Stats.Live;
    }

    public void HealthChange(Player player, int value=50)
    {
        Health += value;
        Program.TypeTextWithThreadSleep($"{player.Name} ��q��_�F~!");
    }

    public void EatFood(Player player, Food food)
    {
        food.EatFood(player);
        Program.TypeTextWithThreadSleep($"{player.Name} �Y�F {food}!");
    }

    public void TakeBreak(Player player, int value=100)
    {
        PhysicalStrength += 100;
        Program.TypeTextWithThreadSleep($"{player.Name} �𮧤@���ܪ��믫�R�K");
    }

    public void DepletePower(Player player, int value=10)
    {
        PhysicalStrength -= value;
        Program.TypeTextWithThreadSleep($"{player.Name} ���b������O...");
    }

    public void MoodChange(Player player, Thing thing)
    {
        if (thing.isGood)
        {
            Mood += moodChangeValue;
            Program.TypeTextWithThreadSleep($"{player.Name} �߱��ܦn�F~!");
        }
        else if (!thing.isGood)
        {
            Mood -= moodChangeValue;
            Program.TypeTextWithThreadSleep($"{player.Name} �߱��ܮt...");
        }
    }

    public void Death()
    {
        stats = Stats.Dead;
        // �i�H�b���B�[�J��L�B�z���a���`���޿�A�Ҧp�C��������
    }

    public void DailyChanges(Player player)
    {
        if (stats == Stats.Live)
        {
            Saturation -= 10;
            Program.TypeTextWithThreadSleep($"{player.Name} �����P-10 => {Saturation}");
            MoodChange(player, new Thing());
            // �ھڨ�L�������L�ƭ�...
        }
        DisplayStats(player);
    }

    //For Other
    public void CheckConditions()
    {
        // Assuming these are the thresholds you want, adjust as needed
        LowHealth = _health < 40; // if health is less than 20%
        Lowsaturation = _saturation < 30;
        PoorMood = _mood < 20;
        Lackofphysicalstrength = _physicalStrength < 20;
    }

    //For Test
    public void DisplayStats(Player player)
    {
        switch (stats)
        {
            case Stats.Live:
                if (Program.test)
                {
                    StringBuilder statsBuilder = new StringBuilder($"{player.Name} ���A:\n");

                    // �ϥΤϮg����Ҧ��p���r�q
                    FieldInfo[] fields = typeof(PlayerStats).GetFields(BindingFlags.NonPublic | BindingFlags.Instance);

                    foreach (var field in fields)
                    {
                        // �p�G�r�q�W�H'_'�}�Y�]���Өp���r�q�R�W�D�ҡ^�A�h���L��
                        if (field.Name.StartsWith($"_") && field.FieldType == typeof(int))
                        {
                            // �q�r�q�W���h��'_'�������
                            string statName = field.Name.Substring(1);
                            int value = (int)field.GetValue(this);

                            statsBuilder.AppendLine($"{statName}: {value}");
                        }
                    }

                    Program.TypeTextWithThreadSleep($"{statsBuilder.ToString()} \n");
                }
                break;
            case Stats.Sleep:

                break;
            case Stats.Dead:
                Program.TypeTextWithThreadSleep($"���a {player.Name} ���`...");
                stats = Stats.Disappeared;
                break;

            case Stats.Disappeared:
                if (Mood != 0)
                    Program.TypeTextWithThreadSleep($"���a {player.Name} �Q�I�i���i��...");
                else
                    Program.TypeTextWithThreadSleep($"{player.Name} �۱��F...");
                Program.Global.RemoveObjects(player);
                player = null;
                break;

        }
    }

    public override string ToString()
    {
        return $"���a�έp�ƾڡG\n" +
                $"���j�G{_saturation}\n" +
                $"���d���p�G{_health}\n" +
                $"�߱��G{_mood}\n"/* +
                $"�����O�G{_attackPower}\n" +
                $"���m�O�G{_defensePower}\n" +
                $"�t�סG{_speed}"*/;
    }
}