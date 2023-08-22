public class Player
{
    public string Name { get; private set; }
    public Inventory Inventory { get; private set; }
    public PlayerStats PlayerStats { get; private set; }
    private List<Skill> skills = new List<Skill>();

    public Player(string name,int gold = 0)
    {
        Name = name;
        Inventory = new Inventory(gold);
        PlayerStats = new PlayerStats();
    }

    public void Collect(ICollectable collectable)
    {
        collectable.Collect(this);
    }

    public void UseItem(IUsable usable)
    {
        usable.UseItem(this);
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
    }

    public void UseSkill<T>() where T : Skill
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

    public ISkill GetSkillByName(string skillName)
    {
        return skills.FirstOrDefault(s => s.Name == skillName);
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
            Console.WriteLine($"The player hasn't learned the {skillName} skill.");
        }
    }
}