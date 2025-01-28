const items = [
  {
      id: "Apple",
      type: "Food",
      name: "蘋果",
      value: 5,
      description: "一顆多汁的紅蘋果。",
      quantity: 10,
      attributes: {
          effects: {
              heal: 0,
              saturation: 30,
              mood: 10
          },
          durability: null
      }
  },
  {
      id: "Poison",
      type: "Potion",
      name: "毒藥",
      value: 15,
      description: "一瓶致命的毒藥。",
      quantity: 2,
      attributes: {
          effects: {
              effect: "PoisonEffect"
          },
          durability: null
      }
  },
  {
      id: "MagicPotion",
      type: "Potion",
      name: "魔法藥水",
      value: 25,
      description: "恢復 50 點魔力的藥水。",
      quantity: 5,
      attributes: {
          effects: {
              mana: 50
          },
          durability: null
      }
  },
  {
      id: "LifePotion",
      type: "Potion",
      name: "生命藥水",
      value: 30,
      description: "恢復 50 點生命值的藥水。",
      quantity: 3,
      attributes: {
          effects: {
              health: 50
          },
          durability: null
      }
  },
  {
      id: "ExperiencePotion",
      type: "Potion",
      name: "經驗藥水",
      value: 40,
      description: "提供 50 點經驗值的藥水。",
      quantity: 4,
      attributes: {
          effects: {
              experience: 50
          },
          durability: null
      }
  },
  {
      id: "StrengthPotion",
      type: "Potion",
      name: "力量藥水",
      value: 35,
      description: "增加 50 點力量的藥水。",
      quantity: 1,
      attributes: {
          effects: {
              strength: 50
          },
          durability: null
      }
  },
  {
      id: "Bread",
      type: "Food",
      name: "麵包",
      value: 8,
      description: "一塊普通的麵包，能填飽肚子。",
      quantity: 5,
      attributes: {
          effects: {
              heal: 10
          },
          durability: null
      }
  },
  {
      id: "WoodenAxe",
      type: "Tool",
      name: "木斧",
      value: 50,
      description: "一把簡陋的木製斧頭。",
      quantity: 1,
      attributes: {
          effects: {
              damage: 5
          },
          durability: 50
      }
  },
  {
      id: "LeatherHelmet",
      type: "Armor",
      name: "皮盔",
      value: 80,
      description: "由皮革製作的頭盔，提供少量防禦力。",
      quantity: 1,
      attributes: {
          effects: {
              defense: 2
          },
          durability: null
      }
  },
  {
      id: "Sword",
      type: "Weapon",
      name: "鋼劍",
      value: 200,
      description: "一把鋒利的鋼劍。",
      quantity: 2,
      attributes: {
          effects: {
              damage: 15
          },
          durability: 100
      }
  },
  {
      id: "DragonScale",
      type: "Material",
      name: "龍鱗",
      value: 500,
      description: "一片稀有的龍鱗，收藏家非常珍視。",
      quantity: 1,
      attributes: {
          effects: null,
          durability: null
      }
  },
  {
      id: "ElvenBow",
      type: "Armor",
      name: "精靈弓",
      value: 400,
      description: "一把精靈國度製作的工藝精湛的弓。",
      quantity: 1,
      attributes: {
          effects: {
              damage: 20
          },
          durability: 80
      }
  },
  {
      id: "ManaPotion",
      type: "Potion",
      name: "魔力藥水",
      value: 30,
      description: "恢復 100 點魔力的藥水。",
      quantity: 20,
      attributes: {
          effects: {
              mana: 100
          },
          durability: null
      }
  },
  {
      id: "HealingHerb",
      type: "Material",
      name: "治療草藥",
      value: 10,
      description: "能夠治療輕微傷口的草藥。",
      quantity: 50,
      attributes: {
          effects: {
              heal: 15
          },
          durability: null
      }
  }
];
