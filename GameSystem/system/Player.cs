using GameSystem.CareerRelated;
using System.Numerics;

public class Player : IBusiness
{
    public string Name { get; private set; }
    public Inventory Inventory { get; private set; }
    public PlayerStats PlayerStats { get; private set; }
    public NPC_AI NPC_AI { get; private set; }
    private List<ISkill> Skills = new List<ISkill>();
    public List<Player> Friends { get; set; } = new List<Player>();//X
    public List<Player> Acquaintances { get; set; } = new List<Player>();//X

    public Player(string name, int gold = 0)
    {
        Name = name;
        Inventory = new Inventory(gold);
        PlayerStats = new PlayerStats();
        NPC_AI = new NPC_AI();
    }

    public void AddItemsToInventory(Dictionary<Item, int> itemsToAdd)
    {
        Inventory.AddItems(itemsToAdd);
    }

    public void RemoveItemsFromInventory(Dictionary<Item, int> itemsToRemove)
    {
        if (itemsToRemove != null)
        {
            foreach (var entry in itemsToRemove)
            {
                Inventory.RemoveItem(entry.Key, entry.Value);
            }

        }
    }

    public void HasItem(Item item, int quantity = 1)
    {
        Inventory.HasItem(item, quantity);
    }

    public void UseItem(Item item)
    {
        Inventory.UseItem(this, item);
    }

    public void Collect(ICollectable collectable)
    {
        collectable.Collect(this);
    }

    public void Plant(Farm farm, Seed Seed)
    {
        if(Inventory.UseItem(this, Seed))
        {
            farm.Plant(Seed, new Soil());
        }
    }

    public void Harvest(Farm farm, Seed Seed)
    {
        farm.HarvestAll(this);
    }

    public void InteractWith(IInteractable interactable)
    {
        interactable.Interact();
    }

    public void LearnSkill(ISkill skill)
    {
        if (!Skills.Contains(skill))
        {
            Skills.Add(skill);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"���a�w�g�Ƿ|�F {skill.Name} �ޯ�C");
        }
    }

    public void UnlearnSkill(ISkill skill)
    {
        Skills.Remove(skill);
        Program.TypeTextWithThreadSleep($"����{skill}�ޯ�");
    }

    public ISkill GetSkillByName(string skillName)
    {
        var iSkill = Skills.FirstOrDefault(s => s.Name == skillName);
        //if (iSkill != null)
        return iSkill;
    }

    public void UseSkill<T>() where T : ISkill
    {
        var skill = Skills.OfType<T>().FirstOrDefault();
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"{Name} �S���Ƿ|�o�ӧޯ�A�L�k�ϥΥ��C");
        }
    }

    public void UseSkill(string skillName)
    {
        ISkill skill = Skills.FirstOrDefault(s => s.Name == skillName);
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Program.TypeTextWithThreadSleep($"{this} �|���ǲ� {skillName} �ޯ�C");
        }
    }

//delete
    public List<Player> FindPeopleWithBusinessSkill()
    {
        var peopleWithBusiness = new List<Player>();

        foreach (var friend in Friends)
        {
            peopleWithBusiness.Add(friend);
        }
        foreach (var acquaintance in Acquaintances)
        {
            peopleWithBusiness.Add(acquaintance);
        }
        return peopleWithBusiness;
    }

    public bool BuyItem(Player buyer, Player seller, Item item, int quantity = 1)
    {
        return Inventory.BuyItem(buyer, seller, item, quantity);
    }

    public bool SellItem(Player seller, Player buyer, Item item, int quantity = 1)
    {
        return Inventory.SellItem(seller, buyer, item, quantity);
    }

    public void DailyChanges()
    {
        PlayerStats.DailyChanges(this);
        NPC_AI.DecideAction(this);
        DisplayInventory();
    }

    public void DisplayInventory()
    {
        Inventory.DisplayInventory(this);
    }

    public void DisplayStats()
    {
        PlayerStats.DisplayStats(this);
    }
}
