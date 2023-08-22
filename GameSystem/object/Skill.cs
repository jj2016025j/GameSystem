public abstract class ISkill
{
    public abstract void Execute(Player player);
}

public class Cooking : ISkill
{
    public override void Execute(Player player)
    {
        Console.WriteLine($"{player.Name} is cooking...");
    }
}

public class Trading : ISkill
{
    public override void Execute(Player player)
    {
        Console.WriteLine($"{player.Name} is trading...");
    }
}

//... 其他技能
