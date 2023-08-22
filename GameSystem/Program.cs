public class Program {
    public static void Main() {
        //交易系統
        Player player = new Player("Alice", 1000);
        Player player2 = new Player("John");
        Business business = new Business();
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

        player.LearnSkill(business);

        business.AddItemsToShop(itemsToAddShop);
        business.Inventory.DisplayInventory();

        business.BuyItem(player, sword);
        business.BuyItem(player2, food);
        Console.WriteLine($"玩家剩餘金幣: {player.Inventory.Gold}");
        player.Inventory.DisplayInventory();

        //背包系統
        player.Inventory.AddItem(potion, 3);
        player.Inventory.AddItem(sword);
        player.Inventory.DisplayInventory();
        player.Inventory.UseItem(player, potion);
        player.Inventory.DisplayInventory();

        //採集系統
        player.Collect(herb);
        player.Collect(mineral);

        player.Inventory.DisplayInventory();

        //物品使用系統
        player.Inventory.AddItem(food);
        player.Inventory.DisplayInventory();
        player.PlayerStats.DisplayStats();
        player.UseItem(food);
        player.Inventory.DisplayInventory();
        player.PlayerStats.DisplayStats();

        //狀態改變
        player.PlayerStats.MoodChange(thing);
        player.PlayerStats.DisplayStats();

        //任務系統
        Task task1 = new Task("Collect 10 apples");
        Task task2 = new Task("Defeat 5 goblins");

        TaskManager manager = new TaskManager();
        manager.AddTask(task1);
        manager.AddTask(task2);

        task1.StartTask();
        task2.StartTask();

        task1.CompleteTask();

        manager.DisplayTasks();

        //技能系統
        player2.LearnSkill(new Cooking());

        player2.UseSkill<Cooking>();
        player2.UseSkill<Trading>();

        //交互
        Door door = new Door();
        ItemBox box = new ItemBox();

        player.InteractWith(door); // Door opened.
        player.InteractWith(door); // Door closed.
        player.InteractWith(box);  // Item collected!

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