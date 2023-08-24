using System.Diagnostics;
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
        Dead,
        Disappeared
    }

    // Example values
    private int _health = 100;
    private int _saturation = 100;
    private int _mood = 100;
    private int _physicalStrength = 100;

    // Boolean flags
    public bool LowBloodLevel { get; private set; }
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

    private readonly int moodChangeValue = 50;

    public PlayerStats()
    {
        Hunger = 50;  // ��l���j�׳]��50
        Health = 100; // ��l��q�]��100
        Mood = 50;    // ��l�߱��]��50
        stats = Stats.Live;
    }

    // ���F�`�٪Ŷ��A�ڥu�ܽd�F�䤤�T���ݩʡA��l���i�H���ӦP�˪��Ҧ��[�J
    public int Hunger
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

    // ...�z�i�H�~��[�J�����O�B���m�O�B�t�׵��ݩ�...

    public void DecideAction()
    {
        CheckConditions();  // Firstly, check the conditions

        if (LowBloodLevel)
        {
            // Take action related to low blood level ��I�]�̦��S���Ĥ� �S���N�h�R�Φۤv��
            Program.TypeTextWithThreadSleep($"Warning! Low blood level detected!");
            return;
        }

        if (Lowsaturation)
        {
            // Take action related to low saturation
            Program.TypeTextWithThreadSleep($"Warning! You are too saturated!");
        }

        // ... and so on for each condition
    }

    public void CheckConditions()
    {
        // Assuming these are the thresholds you want, adjust as needed
        LowBloodLevel = _health < 20; // if health is less than 20%
        Lowsaturation = _saturation < 20;
        PoorMood = _mood < 20;
        Lackofphysicalstrength = _physicalStrength < 20;
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
            Hunger -= 10;
            MoodChange(new Thing());
            // �ھڨ�L�������L�ƭ�...
        }
        DisplayStats(player);
    }

    public void MoodChange(Thing thing)
    {
        if (thing.isGood)
        {
            Mood += moodChangeValue;
        }
        else if (!thing.isGood)
        {
            Mood -= moodChangeValue;
        }
    }

    public void DisplayStats(Player player)
    {
        switch (stats)
        {
            case Stats.Live:
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
                break;

            case Stats.Dead:
                Program.TypeTextWithThreadSleep($"���a {player.Name} ���`...\n");
                stats = Stats.Disappeared;
                break;

            case Stats.Disappeared:
                if (Mood != 0)
                    Program.TypeTextWithThreadSleep($"���a {player.Name} �Q�I�i���i��...\n");
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

    public int BloodLevel { get; set; }
    public int Food { get; set; }
    public int Saturation { get; set; }
    public int PhysicalStrength { get; set; }
    public int Mood2 { get; set; }
    public int Money { get; set; }

    public void DecideAction2()
    {
        if (BloodLevel < 20)
        {
            Heal(); // ���w�s�b�@�Ӫv������k
            return;
        }

        if (Food <= 0)
        {
            if (Money > 10)
            {
                BuyFood();
                return;
            }
            else
            {
                SearchForFood();
                return;
            }
        }

        if (Saturation < 20)
        {
            Eat();
            return;
        }

        if (PhysicalStrength < 20)
        {
            Rest();
            return;
        }

        if (Mood < 20)
        {
            Relax();
            return;
        }

        if (Money <= 0)
        {
            Work();
            return;
        }
    }

    public void Heal()
    {
        Program.TypeTextWithThreadSleep($"���b�v��...");
        // �[�J�v�����޿�
    }

    public void BuyFood()
    {
        Program.TypeTextWithThreadSleep($"�ʶR����...");
        // �[�J�ʶR�������޿�
    }

    public void SearchForFood()
    {
        Program.TypeTextWithThreadSleep($"�M�䭹��...");
        // �[�J�M�䭹�����޿�
    }

    public void Eat()
    {
        Program.TypeTextWithThreadSleep($"�Y����...");
        // �[�J�Y�������޿�
    }

    public void Rest()
    {
        Program.TypeTextWithThreadSleep($"��...");
        // �[�J�𮧪��޿�
    }

    public void Relax()
    {
        Program.TypeTextWithThreadSleep($"���P...");
        // �[�J���P���޿�
    }

    public void Work()
    {
        Program.TypeTextWithThreadSleep($"�u�@�ȿ�...");
        // �[�J�u�@���޿�
    }
}