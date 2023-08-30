public static class Global
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

    static void Initialized()
    {
        TypeTextWithThreadSleep($"正在進行初始化...");

        // 單位
        Player John = new Player($"約翰");
        //Player Alice = new Player($"愛麗絲", 1000000);
        //Global.AddObjects(Alice);
        Global.AddObjects(John);

        // 物品
        Item sword = new Item($"劍", 500);
        Item potion = new Item($"生命藥水", 50);
        Item Wheat = new Item($"小麥", 3);
        Herb herb = new Herb($"治癒草藥", 100);
        Mineral mineral = new Mineral($"治癒礦石", 100);
        Food food = new Food($"食物", 30, 50);
        var items = new Dictionary<Item, int>
        {
            { sword, 1000 },
            { potion, 1000 },
            { food, 1000 },
            { herb, 1000 },
            { mineral, 1000 },
            { Wheat, 10000 },
        };
        //Alice.Inventory.AddItems(items);

        Thing thing = new Thing();

        // 任務系統
        Task task1 = new Task($"收集10個蘋果");
        Task task2 = new Task($"擊敗5個小妖");
        TaskManager manager = new TaskManager();

        Global.CallMethods($"DisplayStats");
        Global.CallMethods($"DisplayInventory");

        Program.TypeTextWithThreadSleep($"初始化完成!\n");
    }
}