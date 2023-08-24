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
        Hunger = 50;  // 初始飢餓度設為50
        Health = 100; // 初始血量設為100
        Mood = 50;    // 初始心情設為50
        stats = Stats.Live;
    }

    // 為了節省空間，我只示範了其中三個屬性，其餘的可以按照同樣的模式加入
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

    // ...您可以繼續加入攻擊力、防禦力、速度等屬性...

    public void DecideAction()
    {
        CheckConditions();  // Firstly, check the conditions

        if (LowBloodLevel)
        {
            // Take action related to low blood level 找背包裡有沒有藥水 沒有就去買或自己做
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
        // 可以在此處加入其他處理玩家死亡的邏輯，例如遊戲結束等
    }

    public void DailyChanges(Player player)
    {
        if (stats == Stats.Live)
        {
            Hunger -= 10;
            MoodChange(new Thing());
            // 根據其他條件更改其他數值...
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
                StringBuilder statsBuilder = new StringBuilder($"{player.Name} 狀態:\n");

                // 使用反射獲取所有私有字段
                FieldInfo[] fields = typeof(PlayerStats).GetFields(BindingFlags.NonPublic | BindingFlags.Instance);

                foreach (var field in fields)
                {
                    // 如果字段名以'_'開頭（按照私有字段命名慣例），則打印它
                    if (field.Name.StartsWith($"_") && field.FieldType == typeof(int))
                    {
                        // 從字段名中去除'_'並獲取值
                        string statName = field.Name.Substring(1);
                        int value = (int)field.GetValue(this);

                        statsBuilder.AppendLine($"{statName}: {value}");
                    }
                }

                Program.TypeTextWithThreadSleep($"{statsBuilder.ToString()} \n");
                break;

            case Stats.Dead:
                Program.TypeTextWithThreadSleep($"玩家 {player.Name} 死亡...\n");
                stats = Stats.Disappeared;
                break;

            case Stats.Disappeared:
                if (Mood != 0)
                    Program.TypeTextWithThreadSleep($"玩家 {player.Name} 被埋進消波塊...\n");
                else
                    Program.TypeTextWithThreadSleep($"{player.Name} 自殺了...");
                Program.Global.RemoveObjects(player);
                player = null;
                break;

        }
    }

    public override string ToString()
    {
        return $"玩家統計數據：\n" +
                $"飢餓：{_saturation}\n" +
                $"健康狀況：{_health}\n" +
                $"心情：{_mood}\n"/* +
                $"攻擊力：{_attackPower}\n" +
                $"防禦力：{_defensePower}\n" +
                $"速度：{_speed}"*/;
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
            Heal(); // 假定存在一個治療的方法
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
        Program.TypeTextWithThreadSleep($"正在治療...");
        // 加入治療的邏輯
    }

    public void BuyFood()
    {
        Program.TypeTextWithThreadSleep($"購買食物...");
        // 加入購買食物的邏輯
    }

    public void SearchForFood()
    {
        Program.TypeTextWithThreadSleep($"尋找食物...");
        // 加入尋找食物的邏輯
    }

    public void Eat()
    {
        Program.TypeTextWithThreadSleep($"吃食物...");
        // 加入吃食物的邏輯
    }

    public void Rest()
    {
        Program.TypeTextWithThreadSleep($"休息...");
        // 加入休息的邏輯
    }

    public void Relax()
    {
        Program.TypeTextWithThreadSleep($"放鬆...");
        // 加入放鬆的邏輯
    }

    public void Work()
    {
        Program.TypeTextWithThreadSleep($"工作賺錢...");
        // 加入工作的邏輯
    }
}