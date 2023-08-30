public interface ISkill
{
    string Name { get; }
    public void Execute(Player Alice);
}

public class Cooking : ISkill
{
    public string Name => nameof(Cooking);

    public void Execute(Player Alice)
    {
        Program.TypeTextWithThreadSleep($"{Alice.Name} 正在做菜...");
    }
}

public class Trading : ISkill
{
    public string Name => nameof(Trading);

    public void Execute(Player Alice)
    {
        Program.TypeTextWithThreadSleep($"{Alice.Name} 正在交易...");
    }
}

//... 其他技能
