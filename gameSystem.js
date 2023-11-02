//以下是主要程式碼
function Main(){
    function Start(){
      console.log("Initialization something...")
    }
    function Update(){
      console.log("Update data..."+i)
    }
    function End(){
      console.log("It's over...")
    }
    function Initialized()
    {}

    Start()
    for(i=1;i<=5;i++){
      Update()
    }
    End()
}
  
  // Test
  Main();
  let playerA = new Player("Alice");
  playerA.acquireItem("Sword");
  playerA.acquireSkill("Fireball");
  playerA.getHurt(20);
  playerA.heal(10);
  playerA.sendMessage("Hello!");
  
  console.log(playerA); // To see the player object's status after the interactions
  
// 可互動物件列表：
// 寶箱（可能包含金幣、武器、藥水等）
// 井（可以取水或許願）
// 書架（獲取故事資訊或學習新技能）
// 石碑（閱讀歷史或獲得任務）
// 門（需要鑰匙或解謎才能打開）
// 炼金桌（製作藥水或魔法物品）
// 武器架（獲取或更換武器）
// 傳送門（快速移動到其他地點）
// 可互動生物列表：
// 森林精靈（給予魔法能量或資訊）
// 野生動物（例如鹿、兔子，可以狩獵或馴養）
// 水中生物（例如魚，可以釣魚）
// 龍（可能是敵人或盟友，或是坐騎）
// NPC列表：
// 村莊長老（提供資訊或任務）
// 旅館老闆（提供住宿和補給）
// 教練（教授新技能或升級技能）
// 孩子（有時提供小任務或秘密資訊）
// 治安官或騎士（在某些情境中可能是友好的，或可能是阻礙）
// 巫師或魔法師（提供魔法物品或任務）
// 商店列表：
// 武器店（買賣武器）
// 藥草店（買賣藥水、藥草）
// 書店（購買魔法書或書籍）
// 寵物店（購買或賣出寵物）
// 旅館（租房休息，恢復生命值和魔法值）
// 道具店（買賣各種遊戲道具）