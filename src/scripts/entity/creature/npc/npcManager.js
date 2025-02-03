import { NPC } from "./NPC.js";

class NPCManager {
    constructor(npcs = []) {
        this.npcs = new Map(npcs.map(npc => [npc.id, new NPC(npc)]));
    }

    // 🔹 根據 ID 獲取 NPC
    getNPCById(id) {
        return this.npcs.get(id) || null;
    }

    // 🔹 獲取所有 NPC
    listAllNPCs() {
        return Array.from(this.npcs.values());
    }

    // 🔹 確保 NPC 存在
    validateNPC(id) {
        if (!this.npcs.has(id)) {
            console.warn(`⚠️ NPC ${id} 不存在`);
            return false;
        }
        return true;
    }
}

export { NPCManager };
