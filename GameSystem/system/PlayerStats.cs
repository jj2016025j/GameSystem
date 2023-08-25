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
        Saturation = 50;  // 初始飢餓度設為50
        Health = 100; // 初始血量設為100
        Mood = 50;    // 初始心情設為50
        stats = Stats.Live;
    }

    public void HealthChange(Player player, int value=50)
    {
        Health += value;
        Program.TypeTextWithThreadSleep($"{player.Name} 血量恢復了~!");
    }

    public void EatFood(Player player, Food food)
    {
        food.EatFood(player);
        Program.TypeTextWithThreadSleep($"{player.Name} 吃了 {food}!");
    }

    public void TakeBreak(Player player, int value=100)
    {
        PhysicalStrength += 100;
        Program.TypeTextWithThreadSleep($"{player.Name} 休息一天變的精神充沛");
    }

    public void DepletePower(Player player, int value=10)
    {
        PhysicalStrength -= value;
        Program.TypeTextWithThreadSleep($"{player.Name} 正在消耗體力...");
    }

    public void MoodChange(Player player, Thing thing)
    {
        if (thing.isGood)
        {
            Mood += moodChangeValue;
            Program.TypeTextWithThreadSleep($"{player.Name} 心情變好了~!");
        }
        else if (!thing.isGood)
        {
            Mood -= moodChangeValue;
            Program.TypeTextWithThreadSleep($"{player.Name} 心情變差...");
        }
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
            Saturation -= 10;
            Program.TypeTextWithThreadSleep($"{player.Name} 飽足感-10 => {Saturation}");
            MoodChange(player, new Thing());
            // 根據其他條件更改其他數值...
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
                }
                break;
            case Stats.Sleep:

                break;
            case Stats.Dead:
                Program.TypeTextWithThreadSleep($"玩家 {player.Name} 死亡...");
                stats = Stats.Disappeared;
                break;

            case Stats.Disappeared:
                if (Mood != 0)
                    Program.TypeTextWithThreadSleep($"玩家 {player.Name} 被埋進消波塊...");
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
}