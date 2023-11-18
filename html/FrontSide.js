

// 用於追蹤是否所有物品都被選取的標誌
let selectionButton = document.getElementById('SelectionButton');
let allSelected = false;

// 清空選取狀態的按鈕事件監聽器
selectionButton.addEventListener('click', function() {
    let items = document.querySelectorAll('#backpackList li'); // 假設您的列表項目是在ul#backpackList下的li元素
    if (!allSelected) {
        // 選擇所有的物品
        items.forEach(function(li) {
            li.classList.add('selected');
        });
        selectionButton.textContent = "清空選取";
        allSelected = true;
    } else {
        // 清除所有選中的物品狀態
        items.forEach(function(li) {
            li.classList.remove('selected');
        });
        selectionButton.textContent = "全部選取";
        allSelected = false;
    }
});

// 给按钮添加点击事件监听器，实现使用物品功能
document.getElementById('useItemButton').addEventListener('click', function() {
    if (selectedItem) {
        console.log(`使用物品：${selectedItem}`);
        // 在这里实现使用物品的逻辑
        // 比如更新玩家的状态，或是调用一个函数来处理物品效果
        // useItem(selectedItem);

        // 清除选中状态
        document.querySelectorAll('#backpackList li').forEach(li => {
            li.classList.remove('selected');
        });
        selectedItem = [];  // 重置选中的物品
    } else {
        console.log('没有选中任何物品');
    }
});
// 加入背包按钮事件
document.getElementById('addItemButton').addEventListener('click', function() {
    console.log('加入背包按钮被点击');
    // 这里实现加入背包的逻辑
});

// 移除按钮事件
document.getElementById('removeItemButton').addEventListener('click', function() {
    console.log('移除按钮被点击');
    // 这里实现移除物品的逻辑
});

// 使用物品按钮事件
document.getElementById('useItemButton').addEventListener('click', function() {
    console.log('使用物品按钮被点击');
    // 这里实现使用物品的逻辑
});

// 購買按钮事件
document.getElementById('purchaseItemButton').addEventListener('click', function() {
    console.log('購買按钮被点击');
    // 这里实现购买物品的逻辑
});

// 售出按钮事件
document.getElementById('sellItemButton').addEventListener('click', function() {
    console.log('售出按钮被点击');
    // 这里实现售出物品的逻辑
});

let selectedItem = [];  // 用来追踪当前选中的物品

// 给每个物品添加点击事件监听器，实现选中功能
document.querySelectorAll('#backpackList li').forEach(item => {
    item.addEventListener('click', function() {
        // 切换当前点击的物品选中状态
        this.classList.toggle('selected');

        // 更新 selectedItem，这里我们使用一个数组来追踪选中的物品
        const itemName = this.dataset.item;
        if (selectedItem.includes(itemName)) {
            // 如果已经选中，则取消选中
            selectedItem = selectedItem.filter(item => item !== itemName);
        } else {
            // 如果未选中，则添加到选中数组中
            selectedItem.push(itemName);
        }
    });
});

var playMusicButton = document.getElementById('playMusicButton');
var backgroundMusic = document.getElementById('background-music');

playMusicButton.addEventListener('click', function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        this.textContent = 'Pause Music'; // 更改按钮文本为 "Pause Music"
    } else {
        backgroundMusic.pause();
        this.textContent = 'Play Music'; // 更改按钮文本为 "Play Music"
    }
});

function UpdatePlayerInfo(){
    // 更新玩家資訊
    document.querySelector("#player-name").textContent = player.name;
    document.querySelector("#player-health").textContent = player.states.health;
    document.querySelector("#player-mana").textContent = player.states.mana;
    document.querySelector("#player-level").textContent = player.states.level;
    document.querySelector("#player-gold").textContent = player.backpack.gold;
    document.querySelector("#player-location").textContent = player.location;
  }
  
function UpdateBackpackList(){
    // 更新玩家背包資訊 
    const skillsList = document.querySelector("#backpackList");
    skillsList.innerHTML = "";
    player.backpack.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      li.setAttribute('data-item', item.id);
      backpackList.appendChild(li);
    })
}   

function UpdateSkillsList(){
    // 更新玩家技能資訊
    const skillsList = document.querySelector("#skillsList");
    skillsList.innerHTML = "";
    player.skillList.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill.name;
      skillsList.appendChild(li);
    });
  }
  
//查看現在地點 尋找staticData內資料 生成該地圖的NPC 生成商店 按照數量生成生物及物品
//幫按鈕加上按下後會執行指定func的方法
function firstUpdateMap(){
    let playerLocation = currentGameData.location
    let mapListHTML = staticData.map.map(mapItem => 
        `<li data-description="${mapItem.description}">${mapItem.name}
            <div>
                <button type="button" class="log" onclick="UpdateMap('${mapItem.name}')">前往</button>
            </div>
        </li>`).join('');
    document.querySelector('#mapsList').innerHTML = mapListHTML;
    UpdateMap(playerLocation)
}

function TalkWithNPC(npc){
    console.log('嗨 ', npc);
}

function UpdateMap(mapName){
    currentGameData.location = mapName;
    // 这里可以添加其他更新地图的逻辑
    console.log('当前位置更新为：', mapName);
    let playerLocation = currentGameData.location
    let locationData = staticData.map.find(location => location.name === playerLocation);
    
  let npcHTML = locationData.NPC.map(npc => 
    `<li>${npc.name}
        <div>
            <button type="button" class="log" onclick="TalkWithNPC('${npc.name}')">互动</button>
        </div>
    </li>`).join('');
  document.getElementById('npcList').innerHTML = npcHTML;
  
  document.getElementById('creaturesList').innerHTML =""
  locationData.creatures.forEach((creature, index) => {
    for (let i = 0; i < creature.quantity; i++) {
      let creaturePlayer = new Player(creature.name);
      creaturePlayer.id = `${creature.name}_${i}`
      let creatureElement = document.createElement('li');
      creatureElement.id = creaturePlayer.id;
      creatureElement.innerHTML = `${creature.name}
        <div>
            <button type="button" class="log attack-btn">攻击</button>
            <button type="button" class="log hurt-btn">反击</button>
        </div>`;
  
      // 为攻击按钮添加事件监听
      creatureElement.querySelector('.attack-btn').addEventListener('click', () => {
        player.attack(creaturePlayer);
      });
  
      // 为反击按钮添加事件监听
      creatureElement.querySelector('.hurt-btn').addEventListener('click', () => {
        player.GetHurt(10);
      });
  
      document.getElementById('creaturesList').appendChild(creatureElement);
    }
  });
  
  // 假设这里的player是您定义的某个全局玩家实例
  
    
  let objectHTML = '';
  locationData.objects.forEach(object => {
    for (let i = 0; i < object.quantity; i++) {
      objectHTML += 
      `<li data-description="${object.description}">${object.name}
        <div>
            <button type="button" class="log">互动</button>
        </div>
      </li>`;
    }
  });
  document.getElementById('objectsList').innerHTML = objectHTML;
  
  
  let shopHTML = locationData.shops.map(shop => 
    `<li>${shop.name}
        <div>
            <button type="button" class="log">购买</button>
            <button type="button" class="log">贩卖</button>
        </div>
    </li>`).join('');
  document.getElementById('shopsList').innerHTML = shopHTML;
}

                // <li data-description="探索古老的森林">古林
                //     <div>
                //         <button type="button" class="log">前往</button>
                //     </div>
                // </li>
//               <li>
//                 物件
//                   <div>
//                       <button type="button" class="log">互动</button>
//                   </div>
//               </li>
//               <li>
//                 生物
//                 <div>
//                   <button type="button" class="log">攻击</button>
//                   <button type="button" class="log">反击</button>
//                 </div>
//               </li>
//               <li>
//                 其他玩家
//                 <div>
//                   <button type="button" class="log">对话</button>
//                   <button type="button" class="log">攻击</button>
//                   <button type="button" class="log">互动</button>
//                   <button type="button" class="log">其他</button>
//                 </div>
//               </li>
//               <li>
//                 商店
//                 <div>
//                   <button type="button" class="log">购买</button>
//                   <button type="button" class="log">贩卖</button>
//                 </div>
//               </li>
//               <li>
//                 NPC
//                 <div>

//                 </div>
//                 <button type="button" class="log">互动</button>
//               </li>
//             </ul>
            
//       </section>`