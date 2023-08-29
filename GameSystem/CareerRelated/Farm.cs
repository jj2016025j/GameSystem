using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameSystem.CareerRelated
{
    // 定義農場
    public class Farm
    {
        private List<(Plant, Soil)> GardenPlots { get; } = new List<(Plant, Soil)>();

        public void Plant(Seed seed, Soil soil)
        {
            if (soil.Nutrition > 0 && soil.Water > 0)
            {
                GardenPlots.Add((new Plant(seed), soil));
                Console.WriteLine($"Planted {seed.PlantType}");
            }
            else
            {
                Console.WriteLine("Soil isn't suitable for planting.");
            }
        }

        public void WaterAllCrops()
        {
            foreach (var (plant, soil) in GardenPlots)
            {
                plant.Grow(soil);
                Console.WriteLine($"{plant.Name} is at the {plant.GrowthStage} stage.");
            }
        }

        public void RemovePlant(Plant plant)
        {
            GardenPlots.RemoveAll(p => p.Item1 == plant);
        }

        public void HarvestAll(Player player)
        {
            for (int i = GardenPlots.Count - 1; i >= 0; i--)
            {
                var (plant, _) = GardenPlots[i];
                var harvestedItems = plant.Harvest(this, player);

                if (harvestedItems.HasValue)
                {
                    Console.WriteLine($"Harvested {harvestedItems.Value.Item1.Name} and got a {harvestedItems.Value.Item2.Name}.");
                    GardenPlots.RemoveAt(i); // remove the plant from the plot after harvesting
                }
            }
        }
    }
}