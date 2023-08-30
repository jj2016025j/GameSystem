using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameSystem.CareerRelated
{
    public enum SeedType
    {
        Wheat,
        Tomato
    }
    public class Seed : Item
    {
        public string PlantType { get; private set; }
        public int NutritionConsumed { get; private set; }
        public int WaterConsumed { get; private set; }
        public Seed(string name, string plantType, int nutrition, int water)
            : base(name, 0)
        {
            PlantType = plantType;
            NutritionConsumed = nutrition;
            WaterConsumed = water;
        }
    }
}
