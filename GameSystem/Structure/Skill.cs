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
        Program.TypeTextWithThreadSleep($"{Alice.Name} ���b����...");
    }
}

public class Trading : ISkill
{
    public string Name => nameof(Trading);

    public void Execute(Player Alice)
    {
        Program.TypeTextWithThreadSleep($"{Alice.Name} ���b���...");
    }
}

//... ��L�ޯ�
