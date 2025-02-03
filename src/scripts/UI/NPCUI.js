export class NPCUI {
  static initialize(gameSystem) {
    console.log("[NPC UI] 開始初始化");
    this.gameSystem = gameSystem; 
    this.mapManager = gameSystem.mapManager; 
    this.npcs = this.mapManager.getNPCsInLocation(this.gameSystem.currentLocation, this.gameSystem.npcManager); 
    this.render();
    console.log("[NPC UI] 已初始化 ✅");
  }

  static update() {
    this.npcs = this.mapManager.getNPCsInLocation(this.gameSystem.currentLocation, this.gameSystem.npcManager); 
    this.render();
    console.log(`[NPC UI] 更新 ${this.npcs.length} 位 NPC`);
  }

  static render() {
    const npcList = document.querySelector("#npcList");
    if (!npcList) {
      console.error("❌ 無法找到 #npcList，請確認 HTML 結構");
      return;
    }

    npcList.innerHTML = ""; // 清空列表

    if (!this.npcs || this.npcs.length === 0) {
      npcList.innerHTML = "<li>📜 這個地點沒有 NPC</li>";
      return;
    }

    this.npcs.forEach(npc => {
      const li = document.createElement("li");
      li.textContent = npc.name;
      li.dataset.npcId = npc.id; // 綁定 NPC ID

      const greetButton = document.createElement("button");
      greetButton.textContent = "打招呼";
      greetButton.classList.add("greet-button"); // ✅ 添加 class 方便事件委派
      greetButton.dataset.npcId = npc.id; // 綁定 NPC ID

      li.appendChild(greetButton);
      npcList.appendChild(li);
    });
  }

  static handleGreet(npcId) {
    const npc = this.npcs.find(n => n.id === npcId);
    if (!npc) {
      console.error(`❌ 找不到 NPC ID: ${npcId}`);
      return;
    }

    if (npc.dialogue && npc.dialogue.length > 0) {
      const randomDialogue = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
      console.log(`🗣️ ${npc.name}: "${randomDialogue}"`);
    } else {
      console.log(`🗣️ ${npc.name} 沒有話要說`);
    }
  }
}

// ✅ 事件委派，確保即使 NPC 清單變動也能正常運行
document.addEventListener("click", (event) => {
  if (event.target.matches(".greet-button")) {
    const npcId = event.target.dataset.npcId;
    NPCUI.handleGreet(npcId);
  }
});
