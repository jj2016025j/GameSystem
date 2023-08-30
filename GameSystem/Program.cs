using static System.Net.Mime.MediaTypeNames;

public static class Program
{
    public static Global Global;
    static int _TimeScale = 5;
    static Timer? _timer;
    static bool _continueRunning = true;

    static void Main(string[] args)
    {
        Global.Initialized();
        DailyChangesThread(_TimeScale);
    }

    static void DailyChanges(object state)
    {
        Program.TypeTextWithThreadSleep($"\n經過了一天... " + DateTime.Now + "\n");

        Global.CallMethods($"DailyChanges");
        // 根據其他條件更改其他數值...
    }
    private static object dailyChangesLock = new object();

    static void DailyChangesThread(int _TimeScale)
    {
        lock (dailyChangesLock)
        {
            _timer = new Timer(DailyChanges, null, TimeSpan.Zero, TimeSpan.FromSeconds(_TimeScale));

            while (_continueRunning)
            {
                if (Console.ReadKey().KeyChar == 'q')
                {
                    _continueRunning = false;
                }
            }

            _timer.Dispose();  // 結束後確保釋放Timer資源
            /// <summary>
            /// This class represents a basic calculator.備用線程
            /// </summary>
            /*if (_continueRunning)
            {
                Program.TypeTextWithThreadSleep($"Press 'q' to quit.");
                while (true)
                {
                    DailyChanges();

                    if (Console.KeyAvailable && Console.ReadKey().KeyChar == 'q')
                    {
                        break;
                    }

                    Thread.Sleep(1000); // Sleep for 1 second
                }
            }*/
        }
    }

    private static object lockObject = new object();

    public static bool test { get; private set; }

    public static void TypeTextWithThreadSleep(string text)
    {
        lock (lockObject)
        {
            if (test)
                foreach (char c in text)
                {
                    Console.Write(c);
                    Thread.Sleep(10);  //延遲50毫秒
                }
                Console.Write(text);
            Console.Write($"\n");
        }
    }

    public static void OriginalMain()
    {
        // 單位
        Player Alice = new Player($"愛麗絲", 1000);
        Player John = new Player($"約翰");

        // 物品
        Item sword = new Item($"劍", 50);
        Item potion = new Item($"生命藥水", 10);
        Herb herb = new Herb($"治癒草藥", 100);
        Mineral mineral = new Mineral($"治癒礦石", 100);
        Food food = new Food($"食物", 10, 30);
        Thing thing = new Thing();
        var itemsToAddShop = new Dictionary<Item, int>
        {
            { sword, 10 },
            { potion, 50 },
            { food, 10 }
        };

        // 任務系統
        Task task1 = new Task($"收集10個蘋果");
        Task task2 = new Task($"擊敗5隻小怪");
        TaskManager manager = new TaskManager();

        Alice.AddItemsToInventory(itemsToAddShop);
        Alice.DisplayInventory();

        // 背包系統
        Alice.UseItem(potion);
        Alice.DisplayInventory();

        // 採集系統
        Alice.Collect(herb);
        Alice.Collect(mineral);

        // 物品使用系統
        Alice.DisplayInventory();
        Alice.DisplayStats();
        Alice.UseItem(food);
        Alice.DisplayInventory();

        // 狀態改變
        Alice.DisplayStats();

        manager.AddTask(task1);
        manager.AddTask(task2);

        task1.StartTask();
        task2.StartTask();

        task1.CompleteTask();

        manager.DisplayTasks();

        // 技能系統
        John.LearnSkill(new Cooking());

        John.UseSkill<Cooking>();
        John.UseSkill<Trading>();

        // 交互
        Door door = new Door();
        ItemBox box = new ItemBox();

        Alice.InteractWith(door); // 門打開了。
        Alice.InteractWith(door); // 門關上了。
        Alice.InteractWith(box);  // 物品已收集!

        // 聊天系統
        ChatRoom chatRoom = new ChatRoom();

        // 模擬用戶在聊天室中發送消息
        chatRoom.SendMessage($"愛麗絲", "你好, Bob!");
        chatRoom.SendMessage($"Bob", "嗨 愛麗絲, 你好嗎?");
        chatRoom.SendMessage($"愛麗絲", "我很好, 謝謝!");

        // Display all messages
        // chatRoom.DisplayAllMessages();
    }
}