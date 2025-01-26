// 定義默認值
export const staticData = {
  map: [
    {
      "name": "古林",
      "description": "探索古老的森林",
      "objects": [
        { "name": "寶箱", "quantity": 3, "description": "在森林中可以找到寶箱。寶箱中可能包含金幣、道具或其他寶藏。" },
        { "name": "井", "quantity": 1, "description": "可以使用井來補充水分。" }
        // 可以根据实际情况继续添加其他物件
      ],
      "NPC": [
        { "name": "村莊長老" },
        { "name": "旅館老闆" }
        // 可以添加其他NPC
      ],
      "creatures": [
        { "name": "森林精靈", "quantity": 1 },
        { "name": "野生動物", "quantity": 2 }
        // 可以添加其他生物
      ],
      "shops": [
        {
          "name": "武器店",
          "itemsForSale": [
            { "name": "长剑", "price": 150 },
            { "name": "弓箭", "price": 120 }
          ]
        },
        {
          "name": "藥草店",
          "itemsForSale": [
            { "name": "治疗药草", "price": 15 },
            { "name": "魔法草", "price": 30 }
          ]
        },
      ]
    },
    {
      "name": "珊瑚海",
      "description": "在這裡與海洋生物共游",
      "objects": [
        { "name": "寶箱", "quantity": 1, "description": "在海中可以找到寶箱。寶箱中可能包含金幣、道具或其他寶藏。" },
        { "name": "珊瑚", "quantity": 2, "description": "珊瑚是海洋中重要的生態系統。" }
        // 珊瑚海特有的其他物件
      ],
      "NPC": [
        { "name": "漁夫" },
        { "name": "潛水教練" }
        // 珊瑚海特有的其他NPC
      ],
      "creatures": [
        { "name": "海洋生物", "quantity": 3 },
        { "name": "海龍", "quantity": 1, "description": "海龍是海洋中最大的生物之一。" }
        // 珊瑚海特有的其他生物
      ],
      "shops": [
        {
          "name": "潛水裝備店",
          "itemsForSale": [
            { "name": "潜水面镜", "price": 100 },
            { "name": "潜水呼吸管", "price": 50 }
          ]
        },
        {
          "name": "海產店",
          "itemsForSale": [
            { "name": "新鲜鱼类", "price": 20 },
            { "name": "珍珠项链", "price": 200 }
          ]
        },
      ]
    },
    {
      "name": "城市",
      "description": "在繁華的城市中購物",
      "objects": [
        { "name": "购物中心", "quantity": 2, "description": "现代化的购物中心，提供各种商品。" },
        { "name": "街头小吃", "quantity": 1, "description": "城市的街头小吃，提供快餐和地方特色小吃。" }
      ],
      "NPC": [
        {
          "name": "商人",
          "itemsForSale": [
            { "name": "Apple", "price": 5 },
            { "name": "Sword", "price": 200 }
          ]
        },
        {
          "name": "游客",
          "itemsForSale": [
            { "name": "Map", "price": 15 },
            { "name": "Compass", "price": 35 }
          ]
        }
      ],
      "creatures": [
        { "name": "城市鸽子", "quantity": 1 },
        { "name": "流浪猫", "quantity": 3 }
      ],
      "shops": [
        {
          "name": "服装店",
          "itemsForSale": [
            { "name": "旅行者披风", "price": 75 },
            { "name": "皮革战靴", "price": 85 }
          ]
        },
        {
          "name": "电子产品店",
          "itemsForSale": [
            { "name": "智能手机", "price": 300 },
            { "name": "耳机", "price": 150 }
          ]
        },
      ]
    },
    {
      "name": "極地",
      "description": "在冰冷的極地中生存",
      "objects": [
        { "name": "冰川", "quantity": 1, "description": "巨大的冰川，覆盖着厚厚的冰雪。" },
        { "name": "破冰船", "quantity": 1, "description": "用于在冰层中开路的强大船只。" }
      ],
      "NPC": [
        { "name": "科学家" },
        { "name": "探险家" }
      ],
      "creatures": [
        { "name": "北极熊", "quantity": 2 },
        { "name": "海豹", "quantity": 1 }
      ],
      "shops": [
        { "name": "供给站" },
        { "name": "装备店" }
      ]
    },
    {
      "name": "雨林",
      "description": "在熱帶雨林中尋找寶藏",
      "objects": [
        { "name": "古代遗迹", "quantity": 1, "description": "隐藏在雨林深处的古代文明遗迹。" },
        { "name": "热带植物", "quantity": 2, "description": "繁茂的热带植物，生机盎然。" }
      ],
      "NPC": [
        {
          "name": "土著居民",
          "itemsForSale": [
            { "name": "Healing Herb", "price": 10 },
            { "name": "Poison Dart", "price": 45 }
          ]
        },
        {
          "name": "考古学家",
          "itemsForSale": [
            { "name": "Ancient Artifact", "price": 500 },
            { "name": "Rare Gemstone", "price": 250 }
          ]
        },
        {
          "name": "神秘商人",
          "itemsForSale": [
            { "name": "Magic Potion", "price": 25 },
            { "name": "Elixir of Life", "price": 100 }
          ]
        },
        {
          "name": "冒险者",
          "itemsForSale": [
            { "name": "Old Map", "price": 35 },
            { "name": "Compass", "price": 15 }
          ]
        },
        {
          "name": "铁匠",
          "itemsForSale": [
            { "name": "Iron Sword", "price": 200 },
            { "name": "Steel Shield", "price": 150 }
          ]
        },
        {
          "name": "药剂师",
          "itemsForSale": [
            { "name": "Antidote", "price": 50 },
            { "name": "Strength Potion", "price": 40 }
          ]
        },
        {
          "name": "书商",
          "itemsForSale": [
            { "name": "Ancient Scroll", "price": 75 },
            { "name": "Mystery Novel", "price": 20 }
          ]
        }
      ],
      "creatures": [
        { "name": "热带鸟类", "quantity": 1 },
        { "name": "蟒蛇", "quantity": 3 }
      ],
      "shops": [
        {
          "name": "手工艺品店",
          "itemsForSale": [
            { "name": "手工雕刻", "price": 120 },
            { "name": "绣花布艺", "price": 60 }
          ]
        },
        {
          "name": "野营用品店",
          "itemsForSale": [
            { "name": "帐篷", "price": 200 },
            { "name": "睡袋", "price": 100 }
          ]
        }
      ]
    },
    {
      "name": "迷霧森林",
      "description": "在迷霧中探索未知",
      "objects": [
        { "name": "古树", "quantity": 1, "description": "迷雾森林中的古老巨树，高耸入云。" },
        { "name": "迷雾之泉", "quantity": 1, "description": "泉水清澈，常年被浓雾环绕。" }
      ],
      "NPC": [
        { "name": "神秘隐士" },
        { "name": "迷路的旅者" }
      ],
      "creatures": [
        { "name": "幽灵狼", "quantity": 2 },
        { "name": "森林精灵", "quantity": 1 }
      ],
      "shops": [
        {
          "name": "藥草店",
          "itemsForSale": [
            { "name": "治疗药草", "price": 15 },
            { "name": "魔法草", "price": 30 }
          ]
        },
        { "name": "旅行用品店" }
      ]
    }
  ],
}