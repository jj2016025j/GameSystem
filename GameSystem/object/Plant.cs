using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameSystem.CareerRelated
{
    public enum GrowthStage
    {
        Seed,
        Seedling,
        Mature,
        Ripe,
        Withered,
    }

    public class Plant
    {
        public Soil? soil; 
        Random Random = new Random();
        public string Name { get; set; }
        public GrowthStage GrowthStage { get; set; }
        public Seed OriginSeed { get; private set; }

        //種植天數
        public int GrowingDays { get; private set; } = 0;
        //成長至下一階段需要天數
        public int GrowingHours { get;} = 3;

        public bool IsMature => GrowthStage == GrowthStage.Mature;
        public bool IsRipe => GrowthStage == GrowthStage.Ripe;

        public Plant(Seed seed)
        {
            Name = seed.PlantType;
            GrowthStage = GrowthStage.Seed;
            OriginSeed = seed;
        }

        public void Grow()
        {
            if (soil.Nutrition < OriginSeed.NutritionConsumed || soil.Water < OriginSeed.WaterConsumed)
            {
                GrowthStage = GrowthStage.Withered;
                return;
            }

            switch (GrowthStage)
            {
                case GrowthStage.Seed:
                if(GrowingDays>=GrowingHours)
                    GrowthStage = GrowthStage.Seedling;
                    break;
                case GrowthStage.Seedling:
                                    if(GrowingDays>=GrowingHours*2)
GrowthStage = GrowthStage.Mature;
                    break;
                case GrowthStage.Mature:
                                    if(GrowingDays>=GrowingHours*3)
GrowthStage = GrowthStage.Ripe;
                    break;
                case GrowthStage.Ripe:
                                    if(GrowingDays>=GrowingHours*5)
GrowthStage = GrowthStage.Withered;
                    break;
            }

            soil.Nutrition -= OriginSeed.NutritionConsumed;
            soil.Water -= OriginSeed.WaterConsumed;
        }

        public void DailyChanges(){
            GrowingDays++;
            Grow(soil);
        }
        public (Item, Seed)? Harvest(Farm farm, Player player)
        {
            if (GrowthStage == GrowthStage.Withered)
            {
                Console.WriteLine($"The {Name} has withered!");
                farm.RemovePlant(this);
                return null;
            }

            if (IsRipe)
            {
                var harvestedItem = new Item(Name, 0);
                int ItemQuantity = Random.Next(1, 3);
                var harvestedSeed = new Seed($"{Name} Seed", Name, OriginSeed.NutritionConsumed, OriginSeed.WaterConsumed);
                int SeedQuantity = Random.Next(1, 3);
                player.Inventory.AddItems( new Dictionary<Item, int> { { harvestedItem, ItemQuantity }, { harvestedSeed, SeedQuantity } });
                Console.WriteLine($"Harvested {Name} and got a {harvestedSeed.Name}.");
                return (harvestedItem, harvestedSeed);
            }

            Console.WriteLine($"The {Name} is not ripe yet!");
            return null;
        }
    }
}
