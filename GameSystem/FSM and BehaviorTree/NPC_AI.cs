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
            // Take action related to low blood level ��I�]�̦��S���Ĥ� �S���N�h�R�Φۤv��
            Program.TypeTextWithThreadSleep($"{player.Name}��q�L�C!");
            Heal(player); // ���w�s�b�@�Ӫv������k
            return;
        }

        if (player.PlayerStats.Lowsaturation)
        {
            // Take action related to low saturation
            Program.TypeTextWithThreadSleep($"{player.Name}�{�b�D�`�j!");
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

        Program.TypeTextWithThreadSleep($"{player.Name} �{�b�ܴI��!!!");
    }
    private void MakeFood(Player player)
    {
        player.Inventory.AddItems(new Dictionary<Item, int> { { new Food( "�ѥ]", 30, 50), 1 } });
        Program.TypeTextWithThreadSleep($"{player.Name} ���F�@���ѥ]");
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
        Program.TypeTextWithThreadSleep($"{player.Name} ��F�@���٬O�R���쭹��...");*/
        return seller.BuyItem(buyer, seller, item, quantity = 1);
    }

    public void SearchForSomething()
    {
        Program.TypeTextWithThreadSleep($"�M��Thing...");
        // �[�J�M�䭹�����޿�
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