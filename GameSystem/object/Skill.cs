public interface ISkill
{
    string Name { get; }
    public void Execute(Player Alice);
}

public class Cooking : ISkill
{
    public string Name => nameof(Business);

    public void Execute(Player Alice)
    {
        Console.WriteLine($"{Alice.Name} is cooking...");
    }
}

public class Trading : ISkill
{
    public string Name => nameof(Business);

    public void Execute(Player Alice)
    {
        Console.WriteLine($"{Alice.Name} is trading...");
    }
}

//... 其他技能
