打開html資料夾裡面的index.html即可
是最新版本的
這是一個簡略的文字RPG遊戲
還未完成

範例的版本在分支best version裡面

可以點擊按鈕
但只會輸出在F12開發者模式裡面的console.log

初期做的小作品
本來可以依照選擇地圖生成地圖裡的物件
更新的時候被改掉了

這是一個有rpg遊戲架構的網站

記得先裝擴充包
pip install flask
pip install flask-cors

先開server.py才能存檔
資料儲存在gameData.json


玩家
    行為
        開門 
        採集 
        使用物品
        戰鬥
    生物
        怪物
        物件
        玩家
    狀態
        受傷
        造成傷害
    背包
        物品
            製作
            合成
            對話
    地點
        商店
        NPC
        素材
        生物
    技能
    對話
