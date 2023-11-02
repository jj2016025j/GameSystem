// 假設這些值已經在其他地方被初始化和更新
let playerName = '';
let playerHealth = 0;
let playerMana = 0;

// 定義默認值
const defaultGameData = {
    name: 'Joker',
    health: 100,
    mana: 50
};

function loadProgress() {
    fetch('http://127.0.0.1:5000/load')
    .then(response => response.json())
    .then(data => {
        console.log('Loaded progress:', data);
        // 在这里您可以根据加载的数据更新游戏状态
    })
    .catch(error => console.error('Error:', error));
}

// 函數從LocalStorage載入遊戲進度
function loadGame() {
    // 嘗試從LocalStorage中獲取遊戲數據
    let gameData = JSON.parse(localStorage.getItem('gameData'));
    console.log("localStorage getItem")

    // 如果LocalStorage中沒有數據，使用默認值
    if (!gameData) {
        gameData = defaultGameData;
    }

    // 更新HTML內容
    playerName = gameData.name;
    playerHealth = gameData.health;
    playerMana = gameData.mana;
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('player-health').textContent = playerHealth;
    document.getElementById('player-mana').textContent = playerMana;
}


// 示例调用
loadProgress();



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


// 函數保存遊戲進度到LocalStorage
function saveGameToLocal() {
    // 從HTML元素獲取當前的遊戲狀態
    const gameData = {
        name: playerName,
        health: playerHealth,
        mana: playerMana
    };

    // 將遊戲數據保存到LocalStorage
    localStorage.setItem('gameData', JSON.stringify(gameData));
    console.log('Saving game state to local storage');
    playerHealth--
    playerMana--
}


// 頁面加載時，載入遊戲進度
loadGame();

// 定時保存遊戲進度
setInterval(saveGameToLocal, 5000); // 每5秒保存一次遊戲

// 绑定beforeunload事件 在瀏覽器關閉時執行
window.addEventListener('beforeunload', (event) => {
    // 在这里保存游戏状态
    saveGameToFile();
})

// 示例调用
saveProgress({ name: "玩家1", health: 80, mana: 30 });
