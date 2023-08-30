using NUnit.Framework;

[TestFixture]
public class CraftingSystemTests
{
    private CraftingSystem craftingSystem;
    private Inventory playerInventory;

    [SetUp]
    public void Setup()
    {
        craftingSystem = new CraftingSystem();
        playerInventory = new Inventory();

        var breadRecipe = new CraftingRecipe("Bread", new Dictionary<Item, int>
        {
            { new Item("Flour"), 2 },
            { new Item("Water"), 1 }
        });
        craftingSystem.AddRecipe(breadRecipe);
    }

    [Test]
    public void TestCraftItem_Success()
    {
        playerInventory.Add(new Item("Flour"), 2);
        playerInventory.Add(new Item("Water"), 1);

        Item result = craftingSystem.CraftItem("Bread", playerInventory);

        Assert.IsNotNull(result);
        Assert.AreEqual("Bread", result.Name);
    }

    [Test]
    public void TestCraftItem_NotEnoughMaterials()
    {
        playerInventory.Add(new Item("Flour"), 1);
        playerInventory.Add(new Item("Water"), 1);

        Item result = craftingSystem.CraftItem("Bread", playerInventory);

        Assert.IsNull(result);
    }

    [Test]
    public void TestCraftItem_NoRecipe()
    {
        playerInventory.Add(new Item("Flour"), 2);
        playerInventory.Add(new Item("Water"), 1);

        Item result = craftingSystem.CraftItem("Pie", playerInventory);

        Assert.IsNull(result);
    }
}

[TestFixture]
public class InventoryTests
{
    // ... Your tests for the Inventory class go here ...
}
