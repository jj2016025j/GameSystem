using System.Numerics;

public class Player
{
    public string Name { get; private set; }
    public Inventory Inventory { get; private set; }
    public PlayerStats PlayerStats { get; private set; }
    private List<ISkill> skills = new List<ISkill>();

    public Player(string name, int gold = 0)
    {
        Name = name;
        Inventory = new Inventory(gold);
        PlayerStats = new PlayerStats();
    }

    public void Collect(ICollectable collectable)
    {
        collectable.Collect(this);
    }

    public void AddItemsToInventory(Item item = null, int quantity = 1, Dictionary<Item, int> itemsToAdd = null)
    {
        if (item != null)
        {
            Inventory.AddItem(item, quantity);
        }
        if (itemsToAdd != null)
        {
            foreach (var entry in itemsToAdd)
            {
                Inventory.AddItem(entry.Key, entry.Value);
            }

        }
    }

    public void RemoveItemsFromInventory(Item item = null, int quantity = 1, Dictionary<Item, int> itemsToRemove = null)
    {
        if (item != null)
        {
            Inventory.RemoveItem(item, quantity);
        }
        if (itemsToRemove != null)
        {
            foreach (var entry in itemsToRemove)
            {
                Inventory.RemoveItem(entry.Key, entry.Value);
            }

        }
    }

    public void DisplayInventory()
    {
        Inventory.DisplayInventory(this);
    }

    public void UseItem(Item item)
    {
        Inventory.UseItem(this, item);
    }

    public void DisplayStats()
    {
        PlayerStats.DisplayStats();
    }

    public void InteractWith(IInteractable interactable)
    {
        interactable.Interact();
    }

    public void LearnSkill(ISkill skill)
    {
        if (!skills.Contains(skill))
        {
            skills.Add(skill);
        }
        else
        {
            Console.WriteLine($"Player has already learned the {skill.Name} skill.");
        }
    }

    public void UnlearnSkill(ISkill skill)
    {
        skills.Remove(skill);
        Console.WriteLine($"²¾°£{skill}§Þ¯à");
    }

    public ISkill GetSkillByName(string skillName)
    {
        return skills.FirstOrDefault(s => s.Name == skillName);
    }

    public void UseSkill<T>() where T : ISkill
    {
        var skill = skills.OfType<T>().FirstOrDefault();
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Console.WriteLine($"{Name} has not learned this skill and cannot use it.");
        }
    }

    public void UseSkill(string skillName)
    {
        ISkill skill = skills.FirstOrDefault(s => s.Name == skillName);
        if (skill != null)
        {
            skill.Execute(this);
        }
        else
        {
            Console.WriteLine($"The Alice hasn't learned the {skillName} skill.");
        }
    }
}
