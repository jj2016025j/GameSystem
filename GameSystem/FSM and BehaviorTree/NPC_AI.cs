using System;
using System.Diagnostics;
using System.Numerics;
using System.Xml;
using System.Xml.Linq;
//using UnityEngine;

public class NPC_AI //: MonoBehaviour
{
    /*private FSM fsm;
    private BehaviorTree bt;

    private void Start()
    {
        fsm = new FSM(this);
        fsm.AddState($"Resting", new RestState());
        fsm.AddState($"Exploring", new ExploreState());
        fsm.AddState($"Working", new WorkState());
        fsm.AddState($"Interacting", new InteractState());

        // Example: Start with exploring state
        fsm.SetState($"Exploring");
    }

    private void Update()
    {
        fsm.Update();
    }*/

    enum BehaviorOptions
    {
        Gathering,
        SellingThings,
        BuyingFood,
        EatingFood,
        MakingFood,
        Learning
    }

    enum JudgmentStatus
    {
        LowHealth,
        Lowsaturation,
        Toolittlemoney,
        Nofood,
        PoorMood,
        Lackofphysicalstrength
    }

    public void DecideAction(Player player)
    {
        player.PlayerStats.CheckConditions();  // Firstly, check the conditions

        if (player.PlayerStats.IsSleeping)
            return;
        if (player.PlayerStats.LowHealth)
        {
            // Take action related to low blood level 找背包裡有沒有藥水 沒有就去買或自己做
            Program.TypeTextWithThreadSleep($"{player.Name}血量過低!");
            Heal(player); // 假定存在一個治療的方法
            return;
        }

        if (player.PlayerStats.Lowsaturation)
        {
            // Take action related to low saturation
            Program.TypeTextWithThreadSleep($"{player.Name}現在非常餓!");
            var food = player.Inventory.FindItem<Food>();
            if (food != null)
            {
                player.PlayerStats.EatFood(player, food);
                return;
            }
            /*if (player.Inventory.Gold > 10)
            {
                if (BuyFood(player))
                {
                    food = player.Inventory.FindItem<Food>();
                    if (food != null)
                        player.PlayerStats.EatFood(player, food);
                    return;
                }
            }*/
            else
            {
                MakeFood(player);
                food = player.Inventory.FindItem<Food>();
                if (food != null)
                {
                    player.PlayerStats.EatFood(player, food);
                    return;
                }
            }
        }

        if (player.PlayerStats.Lackofphysicalstrength)
        {
            Rest(player);
            return;
        }

        if (player.PlayerStats.PoorMood)
        {
            Relax(player);
            return;
        }

        if (player.Inventory.Gold <= 0)
        {
            Work(player);
            return;
        }

        Program.TypeTextWithThreadSleep($"{player.Name} 現在很富有!!!");
    }
    private void MakeFood(Player player)
    {
        player.Inventory.AddItems(new Dictionary<Item, int> { { new Food( "麵包", 30, 50), 1 } });
        Program.TypeTextWithThreadSleep($"{player.Name} 做了一個麵包");
    }

    public void Heal(Player player)
    {
        player.PlayerStats.HealthChange(player); }

    public bool BuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        /*var busnessman = player.FindPeopleWithBusinessSkill();
        foreach (var person in busnessman)
        {
            player.RequestBuyItem(buyer, seller, item, quantity);
        }
        Program.TypeTextWithThreadSleep($"{player.Name} 找了一圈還是買不到食物...");*/
        return seller.BuyItem(buyer, seller, item, quantity = 1);
    }

    public void SearchForSomething()
    {
        Program.TypeTextWithThreadSleep($"尋找Thing...");
        // 加入尋找食物的邏輯
    }

    public void Eat(Player player,Food food)
    {
        player.PlayerStats.EatFood(player, food);
    }

    public void Rest(Player player)
    {
        player.PlayerStats.TakeBreak(player);
    }

    public void Relax(Player player)
    {
        player.PlayerStats.MoodChange(player,new Thing() { isGood=true});
    }

    public void Work(Player player)
    {
        player.Inventory.Gold += 100;
        player.PlayerStats.DepletePower( player);
    }
}