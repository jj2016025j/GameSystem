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

    // 為了節省空間，我只示範了其中三個屬性，其餘的可以按照同樣的模式加入
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
        Hunger = 50;  // 初始飢餓度設為50
        Health = 100; // 初始血量設為100
        Mood = 50;    // 初始心情設為50
    }
    // ...您可以繼續加入攻擊力、防禦力、速度等屬性...

    public void Time()//每十五秒
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

        // 使用反射獲取所有私有字段
        FieldInfo[] fields = typeof(PlayerStats).GetFields(BindingFlags.NonPublic | BindingFlags.Instance);

        foreach (var field in fields)
        {
            // 如果字段名以'_'開頭（按照私有字段命名慣例），則打印它
            if (field.Name.StartsWith("_"))
            {
                // 從字段名中去除'_'並獲取值
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