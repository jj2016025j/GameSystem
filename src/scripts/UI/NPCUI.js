export class NPCUI {
    static initialize() {
      console.log("NPC UI 已初始化");
    }
  
    static update(npcs) {
      const npcList = document.querySelector("#npcList");
      npcList.innerHTML = "";
  
      npcs.forEach(npc => {
        const li = document.createElement("li");
        li.textContent = npc.name;
  
        const greetButton = document.createElement("button");
        greetButton.textContent = "打招呼";
        greetButton.addEventListener("click", () => console.log(`與 ${npc.name} 打招呼`));
  
        li.appendChild(greetButton);
        npcList.appendChild(li);
      });
    }
  }
  