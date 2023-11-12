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