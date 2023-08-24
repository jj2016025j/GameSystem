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

    public void AddItemsToInventory(Item? item = null, int quantity = 1, Dictionary<Item, int> itemsToAdd = null)
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

    public void RemoveItemsFromInventory(Item? item = null, int quantity = 1, Dictionary<Item, int> itemsToRemove = null)
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
        PlayerStats.DisplayStats(this);
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
            Program.TypeTextWithThreadSleep($"玩家已經學會了 {skill.Name} 技能。");
        }
    }

    public void UnlearnSkill(ISkill skill)
    {
        skills.Remove(skill);
        Program.TypeTextWithThreadSleep($"移除{skill}技能");
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
            Program.TypeTextWithThreadSleep($"{Name} 沒有學會這個技能，無法使用它。");
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
            Program.TypeTextWithThreadSleep($"{this} 尚未學習 {skillName} 技能。");
        }
    }

    public void DailyChanges()
    {
        PlayerStats.DailyChanges(this);
        DisplayInventory();
    }
}
