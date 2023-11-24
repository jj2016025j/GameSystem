// 定義默認值
const staticData = {
  map: [
     {"name":"古林",
      "description": "探索古老的森林",
      "objects": [
        { "name": "寶箱", "quantity": 3, "description": "在森林中可以找到寶箱。寶箱中可能包含金幣、道具或其他寶藏。" },
        { "name": "井", "quantity": 1, "description": "可以使用井來補充水分。" }
        // 可以根据实际情况继续添加其他物件
      ],
      "NPC": [
        { "name": "村莊長老"},
        { "name": "旅館老闆"}
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
            {"name": "长剑", "price": 150},
            {"name": "弓箭", "price": 120}
          ]
        },
        {
          "name": "藥草店",
          "itemsForSale": [
            {"name": "治疗药草", "price": 15},
            {"name": "魔法草", "price": 30}
          ]
        },
      ]
    },
    {"name":"珊瑚海" ,
      "description": "在這裡與海洋生物共游",
      "objects": [
        { "name": "寶箱", "quantity": 1, "description": "在海中可以找到寶箱。寶箱中可能包含金幣、道具或其他寶藏。" },
        { "name": "珊瑚", "quantity": 2, "description": "珊瑚是海洋中重要的生態系統。" }
        // 珊瑚海特有的其他物件
      ],
      "NPC": [
        { "name": "漁夫"},
        { "name": "潛水教練"}
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
            {"name": "潜水面镜", "price": 100},
            {"name": "潜水呼吸管", "price": 50}
          ]
        },
        {
          "name": "海產店",
          "itemsForSale": [
            {"name": "新鲜鱼类", "price": 20},
            {"name": "珍珠项链", "price": 200}
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
            {"name": "Apple", "price": 5},
            {"name": "Sword", "price": 200}
          ]
        },
        {
          "name": "游客",
          "itemsForSale": [
            {"name": "Map", "price": 15},
            {"name": "Compass", "price": 35}
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
            {"name": "旅行者披风", "price": 75},
            {"name": "皮革战靴", "price": 85}
          ]
        },
        {
          "name": "电子产品店",
          "itemsForSale": [
            {"name": "智能手机", "price": 300},
            {"name": "耳机", "price": 150}
          ]
        },
      ]
    },
    // {
    //   "name": "極地",
    //   "description": "在冰冷的極地中生存",
    //   "objects": [
    //     { "name": "冰川", "quantity": 1, "description": "巨大的冰川，覆盖着厚厚的冰雪。" },
    //     { "name": "破冰船", "quantity": 1, "description": "用于在冰层中开路的强大船只。" }
    //   ],
    //   "NPC": [
    //     { "name": "科学家" },
    //     { "name": "探险家" }
    //   ],
    //   "creatures": [
    //     { "name": "北极熊", "quantity": 2 },
    //     { "name": "海豹", "quantity": 1 }
    //   ],
    //   "shops": [
    //     { "name": "供给站" },
    //     { "name": "装备店" }
    //   ]
    // },
    // {
    //   "name": "雨林",
    //   "description": "在熱帶雨林中尋找寶藏",
    //   "objects": [
    //     { "name": "古代遗迹", "quantity": 1, "description": "隐藏在雨林深处的古代文明遗迹。" },
    //     { "name": "热带植物", "quantity": 2, "description": "繁茂的热带植物，生机盎然。" }
    //   ],
    //   "NPC": [
    //     {
    //       "name": "土著居民",
    //       "itemsForSale": [
    //         {"name": "Healing Herb", "price": 10},
    //         {"name": "Poison Dart", "price": 45}
    //       ]
    //     },
    //     {
    //       "name": "考古学家",
    //       "itemsForSale": [
    //         {"name": "Ancient Artifact", "price": 500},
    //         {"name": "Rare Gemstone", "price": 250}
    //       ]
    //     },
    //     {
    //       "name": "神秘商人",
    //       "itemsForSale": [
    //         {"name": "Magic Potion", "price": 25},
    //         {"name": "Elixir of Life", "price": 100}
    //       ]
    //     },
    //     {
    //       "name": "冒险者",
    //       "itemsForSale": [
    //         {"name": "Old Map", "price": 35},
    //         {"name": "Compass", "price": 15}
    //       ]
    //     },
    //     {
    //       "name": "铁匠",
    //       "itemsForSale": [
    //         {"name": "Iron Sword", "price": 200},
    //         {"name": "Steel Shield", "price": 150}
    //       ]
    //     },
    //     {
    //       "name": "药剂师",
    //       "itemsForSale": [
    //         {"name": "Antidote", "price": 50},
    //         {"name": "Strength Potion", "price": 40}
    //       ]
    //     },
    //     {
    //       "name": "书商",
    //       "itemsForSale": [
    //         {"name": "Ancient Scroll", "price": 75},
    //         {"name": "Mystery Novel", "price": 20}
    //       ]
    //     }
    //   ],
    //   "creatures": [
    //     { "name": "热带鸟类", "quantity": 1 },
    //     { "name": "蟒蛇", "quantity": 3 }
    //   ],
    //   "shops": [
    //     {
    //       "name": "手工艺品店",
    //       "itemsForSale": [
    //         {"name": "手工雕刻", "price": 120},
    //         {"name": "绣花布艺", "price": 60}
    //       ]
    //     },
    //     {
    //       "name": "野营用品店",
    //       "itemsForSale": [
    //         {"name": "帐篷", "price": 200},
    //         {"name": "睡袋", "price": 100}
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "name": "迷霧森林",
    //   "description": "在迷霧中探索未知",
    //   "objects": [
    //     { "name": "古树", "quantity": 1, "description": "迷雾森林中的古老巨树，高耸入云。" },
    //     { "name": "迷雾之泉", "quantity": 1, "description": "泉水清澈，常年被浓雾环绕。" }
    //   ],
    //   "NPC": [
    //     { "name": "神秘隐士" },
    //     { "name": "迷路的旅者" }
    //   ],
    //   "creatures": [
    //     { "name": "幽灵狼", "quantity": 2 },
    //     { "name": "森林精灵", "quantity": 1 }
    //   ],
    //   "shops": [
    //     {
    //       "name": "藥草店",
    //       "itemsForSale": [
    //         {"name": "治疗药草", "price": 15},
    //         {"name": "魔法草", "price": 30}
    //       ]
    //     },
    //     { "name": "旅行用品店" }
    //   ]
    // }
  ],
  backpack: [
    {
      id: 'sword',
      name: '劍',
    },
    {
      id: 'shield',
      name: '盾牌',
    },
    {
      id: 'potion',
      name: '藥水',
    },
  ],
  items: [
    {
      "name": "Apple",
      "value": 5, // 假设的价值
      "description": "A juicy red apple.",
      "quantity": 10 // 假设用户有10个苹果
    },
    {
      "name": "Poison",
      "value": 15, // 假设的价值
      "description": "A dangerous poison.",
      "quantity": 2 // 假设用户有2份毒药
    },
    {
      "name": "Magic Potion",
      "value": 25, // 假设的价值
      "description": "Restores 50 points of mana.",
      "quantity": 5 // 假设用户有5瓶魔法药水
    },
    {
      "name": "Life Potion",
      "value": 30, // 假设的价值
      "description": "Restores 50 points of health.",
      "quantity": 3 // 假设用户有3瓶生命药水
    },
    {
      "name": "Experience Potion",
      "value": 40, // 假设的价值
      "description": "Grants 50 experience points.",
      "quantity": 4 // 假设用户有4瓶经验药水
    },
    {
      "name": "Strength Potion",
      "value": 35, // 假设的价值
      "description": "Increases strength by 50.",
      "quantity": 1 // 假设用户有1瓶力量药水
    }
  ],
  "Shopitems": [
    {
      "name": "Apple",
      "value": 5,
      "description": "A juicy red apple.",
      "quantity": 1000
    },
    {
      "name": "Sword",
      "value": 200,
      "description": "A sharp steel sword.",
      "quantity": 500
    },
    {
      "name": "Healing Herb",
      "value": 10,
      "description": "A herb that heals minor wounds.",
      "quantity": 800
    },
    {
      "name": "Magic Scroll",
      "value": 150,
      "description": "A scroll containing a random magic spell.",
      "quantity": 300
    },
    {
      "name": "Dragon Scale",
      "value": 500,
      "description": "A rare scale from a dragon. Highly valued by collectors.",
      "quantity": 50
    },
    {
      "name": "Elven Bow",
      "value": 400,
      "description": "An exquisitely crafted bow from the elven realms.",
      "quantity": 100
    },
    {
      "name": "Mana Potion",
      "value": 30,
      "description": "Restores 100 points of mana.",
      "quantity": 1000
    },
    {
      "name": "Life Potion",
      "value": 40,
      "description": "Restores 100 points of health.",
      "quantity": 1000
    },
    {
      "name": "Experience Potion",
      "value": 75,
      "description": "Grants 100 experience points.",
      "quantity": 500
    },
    {
      "name": "Strength Elixir",
      "value": 60,
      "description": "Increases strength by 100 for a limited time.",
      "quantity": 300
    }
  ],
  skills: [
    {
      description: 'fireball',
      name: '火球術',
    },
    {
      description: 'heal',
      name: '治療術',
    },
    {
      description: 'stealth',
      name: '隱身術',
    },
    {
      description: 'cold',
      name: '冰凍術',
    }
  ]
}

let currentData=staticData

const defaultGameData = {
player: {},
  quests: [
      { id: 'qst001', name: 'Find the Lost Sheep', status: 'Not Started' }
  ],
  location: '珊瑚海',
  settings: {
      volume: 70, // A comfortable starting volume setting
      difficulty: 'Normal', // Default difficulty setting
      language: 'en' // Default language setting
  },
  time:new Date().toISOString()
};

//當前遊戲進度資料
let currentGameData = defaultGameData


// 定義全域變數
let GameData = defaultGameData

class GameSystem {
  constructor() {
  }
  // 函數從LocalStorage載入遊戲進度
  static death(targetObject){
      if(targetObject!=player){
          let element = document.getElementById(targetObject.id);
          if (element) {
              element.remove(); // 从DOM中移除元素
          }
      }
  }
}

//以下是主要程式碼
 function Main(){
    function Start(){
      // 頁面加載時，載入遊戲進度
      loadGame();
      //請求顯示 玩家資訊 物品 技能 地圖 物件 生物 商店 NPC
    }

    // 函數從LocalStorage載入遊戲進度
    function loadGame() {
      // 嘗試從LocalStorage中獲取遊戲數據
      let gameData = JSON.parse(localStorage.getItem('gameData'));
      console.log("localStorage getItem")

      // 如果LocalStorage中沒有數據，使用默認值
      if (!gameData||gameData.playerId==null) {
          gameData = defaultGameData;
      }

      document.getElementById('player-name').textContent = gameData.playerName;
      document.getElementById('player-health').textContent = gameData.playerHealth;
      document.getElementById('player-mana').textContent = gameData.playerMana;
    }

    // 函數保存遊戲進度到LocalStorage
    function saveGameToLocal() {
      // 如果你需要将这些变量再次组合回一个对象，可以这样做：

      // 現在gameData物件會使用上面定義的變量值
      
      // 將遊戲數據保存到LocalStorage
      localStorage.setItem('gameData', JSON.stringify(gameData));
      console.log('Saving game state to local storage');
      playTime++
    }

    Start()
    saveGameToLocal()
    
    // 定時保存遊戲進度
    setInterval(saveGameToLocal, 10000); // 每5秒保存一次遊戲

    // 绑定beforeunload事件 在瀏覽器關閉時執行
    window.addEventListener('beforeunload', (event) => {
        // 在这里保存游戏状态
        saveGameToLocal()
    })
}

//對python的部分
function loadProgress() {
  fetch('http://127.0.0.1:5000/load')
  .then(response => response.json())
  .then(data => {
      console.log('Loaded progress:', data);
      // 在这里您可以根据加载的数据更新游戏状态
  })
  .catch(error => console.error('Error:', error));
}

// 示例调用
// loadProgress();

function saveProgress(progress) {
  fetch('http://127.0.0.1:5000/save', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(progress)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}

// 示例调用
// saveProgress({ name: "玩家1", health: 80, mana: 30 });