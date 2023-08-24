public class Global
{
    List<object> allObjects;

    public Global()
    {
        allObjects = new List<object>();
    }

    public void AddObjects(Player Player)
    {
        allObjects.Add(Player);
    }

    public void RemoveObjects(Player Player)
    {
        allObjects.Remove(Player);
    }

    public void CallMethods(String MethodName)
    {
        var tempObjects = new List<object>(allObjects); 
        foreach (var obj in tempObjects)
        {
            var Method = obj.GetType().GetMethod(MethodName);
            if (Method != null)
            {
                Method.Invoke(obj, null);
            }
        }
    }
}