public class CraftingSystem
{
    Dictionary<string, CraftingRecipe> recipes;

    public CraftingSystem()
    {
        recipes = new Dictionary<string, CraftingRecipe>();
    }

    public void AddRecipe(CraftingRecipe recipe)
    {
        recipes.Add(recipe.ProductName, recipe);
    }

    public Item CraftItem(string itemName, Inventory playerInventory)
    {
        if(recipes.ContainsKey(itemName))
        {
            CraftingRecipe recipe = recipes[itemName];
            
            if(playerInventory.HasRequiredMaterials(recipe.Materials))
            {
                playerInventory.RemoveMaterials(recipe.Materials);
                return recipe.CraftItem();
            }
        }

        return null; // Crafting failed or the item does not exist.
    }
}
