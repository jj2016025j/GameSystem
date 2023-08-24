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
            Program.TypeTextWithThreadSleep($"���a�w�g�Ƿ|�F {skill.Name} �ޯ�C");
        }
    }

    public void UnlearnSkill(ISkill skill)
    {
        skills.Remove(skill);
        Program.TypeTextWithThreadSleep($"����{skill}�ޯ�");
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
            Program.TypeTextWithThreadSleep($"{Name} �S���Ƿ|�o�ӧޯ�A�L�k�ϥΥ��C");
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
            Program.TypeTextWithThreadSleep($"{this} �|���ǲ� {skillName} �ޯ�C");
        }
    }

    public void DailyChanges()
    {
        PlayerStats.DailyChanges(this);
        DisplayInventory();
    }
}
