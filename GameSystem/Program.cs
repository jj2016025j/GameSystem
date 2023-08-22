using System.Numerics;

public class Program
{
    public static void Main()
    {
        //單位
        Player Alice = new Player("Alice", 1000);
        Player John = new Player("John");
        Business business = new Business();

        //物品
        Item sword = new Item("劍", 50);
        Item potion = new Item("生命藥水", 10);
        Herb herb = new Herb("Healing Herb", 100);
        Mineral mineral = new Mineral("Healing Mineral", 100);
        FoodItem food = new FoodItem("food", 10, 30);
        Thing thing = new Thing();
        var itemsToAddShop = new Dictionary<Item, int>
        {
            { sword, 10 },
            { potion, 50 },
            { food, 10 }
        };

        //任務系統
        Task task1 = new Task("Collect 10 apples");
        Task task2 = new Task("Defeat 5 goblins");
        TaskManager manager = new TaskManager();

        //交易系統
        Alice.UseSkill("Business");
        Alice.LearnSkill(business);
        var Alicebusiness = Alice.GetSkillByName("Business") as Business;
        if (Alice.GetSkillByName("Business") as Business != null)
        {
            Alicebusiness?.BuyItem(John, Alice, sword);
        }
        else
        {
            Console.WriteLine("該玩家無法交易");
        }
        Alice.UnlearnSkill(business);
        Alice.AddItemsToInventory(null, 0, itemsToAddShop);
        Alicebusiness?.BuyItem(John, Alice, sword);
        Alicebusiness?.BuyItem(John, Alice, food);
        Alice.DisplayInventory();

        //背包系統
        Alice.AddItemsToInventory(potion, 3);
        Alice.AddItemsToInventory(sword);
        Alice.UseItem(potion);
        Alice.DisplayInventory();

        //採集系統
        Alice.Collect(herb);
        Alice.Collect(mineral);

        //物品使用系統
        Alice.DisplayInventory();
        Alice.DisplayStats();
        Alice.AddItemsToInventory(food);
        Alice.UseItem(food);
        Alice.DisplayInventory();

        //狀態改變
        Alice.PlayerStats.MoodChange(thing);
        Alice.DisplayStats();

        manager.AddTask(task1);
        manager.AddTask(task2);

        task1.StartTask();
        task2.StartTask();

        task1.CompleteTask();

        manager.DisplayTasks();

        //技能系統
        John.LearnSkill(new Cooking());

        John.UseSkill<Cooking>();
        John.UseSkill<Trading>();

        //交互
        Door door = new Door();
        ItemBox box = new ItemBox();

        Alice.InteractWith(door); // Door opened.
        Alice.InteractWith(door); // Door closed.
        Alice.InteractWith(box);  // Item collected!

        //聊天系統
        ChatRoom chatRoom = new ChatRoom();

        // 模擬用戶在聊天室中發送消息
        chatRoom.SendMessage("Alice", "Hello, Bob!");
        chatRoom.SendMessage("Bob", "Hi Alice, how are you?");
        chatRoom.SendMessage("Alice", "I'm good, thanks!");

        // Display all messages
        // chatRoom.DisplayAllMessages();
    }
}