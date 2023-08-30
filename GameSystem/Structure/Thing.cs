public class Thing
{
    public bool isGood;
    private static Random rnd = new Random();

    public Thing()
    {
        isGood = rnd.NextDouble() >= 0.5;
    }
}