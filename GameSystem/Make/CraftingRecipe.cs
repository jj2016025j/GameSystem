public class CraftingRecipe
{
    public string ProductName { get; }
    public Dictionary<Item, int> Materials { get; }

    public CraftingRecipe(string productName, Dictionary<Item, int> materials)
    {
        ProductName = productName;
        Materials = materials;
    }

    public Item CraftItem()
    {
        return new Item(ProductName);
    }
}

using Newtonsoft.Json;
using System.Collections.Generic;

public class CraftingRecipe
{
    public ResultItem Result { get; set; }
    public List<IngredientItem> Ingredients { get; set; }
}

public class ResultItem
{
    public string Type { get; set; }
    public string Name { get; set; }
    public Dictionary<string, int> Attributes { get; set; }
}

public class IngredientItem
{
    public string Name { get; set; }
    public int Count { get; set; }
}

// 解析JSON方法
public List<CraftingRecipe> LoadCraftingRecipes(string jsonContent)
{
    return JsonConvert.DeserializeObject<List<CraftingRecipe>>(jsonContent);
}
