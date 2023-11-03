//以下是主要程式碼
function Main(){
    function Start(){
      console.log("Initialization something...")
      //請求顯示 玩家資訊 物品 技能 地圖 物件 生物 商店 NPC
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

  //something happening...