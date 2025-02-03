export class NPCUI {
    static initialize(npcs) {
        console.log("[NPC UI] 開始初始化");

        console.log(`初始化 ${npcs.length} 位 NPC`);
        const npcList = document.querySelector("#npcList");
        if (!npcList) {
            console.error("❌ 無法找到 #npcList，請確認 HTML 結構");
            return;
        }

        npcList.innerHTML = ""; // 清空列表

        if (npcs.length === 0) {
            npcList.innerHTML = "<li>📜 這個地點沒有 NPC</li>";
            return;
        }

        npcs.forEach(npc => this.renderNPC(npc, npcList));
        console.log("[NPC UI] 已初始化 ✅");
    }

    static update(npcs) {
        console.log(`初始化 ${npcs.length} 位 NPC`);
        const npcList = document.querySelector("#npcList");
        if (!npcList) {
            console.error("❌ 無法找到 #npcList，請確認 HTML 結構");
            return;
        }

        npcList.innerHTML = ""; // 清空列表

        if (npcs.length === 0) {
            npcList.innerHTML = "<li>📜 這個地點沒有 NPC</li>";
            return;
        }

        npcs.forEach(npc => this.renderNPC(npc, npcList));
    }

    static renderNPC(npc, npcList) {
        const li = document.createElement("li");
        li.textContent = npc.name;
        li.dataset.npcId = npc.id; // 綁定 NPC ID，方便後續操作

        const greetButton = document.createElement("button");
        greetButton.textContent = "打招呼";
        greetButton.addEventListener("click", () => this.handleGreet(npc));

        li.appendChild(greetButton);
        npcList.appendChild(li);
    }

    static handleGreet(npc) {
        if (npc.dialogue && npc.dialogue.length > 0) {
            const randomDialogue = npc.dialogue[Math.floor(Math.random() * npc.dialogue.length)];
            console.log(`🗣️ ${npc.name}: "${randomDialogue}"`);
            alert(`${npc.name}: "${randomDialogue}"`);
        } else {
            console.log(`🗣️ ${npc.name} 沒有話要說`);
            alert(`${npc.name} 沒有話要說`);
        }
    }
}
