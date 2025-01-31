import{NPC}from "./npc.js"

class NPCManager {
    constructor(npcs = []) {
      this.npcs = new Map(npcs.map((npc) => [npc.id, new NPC(npc)]));
    }
  
    getNPCById(id) {
      return this.npcs.get(id) || null;
    }
  }
  
  export { NPCManager };
  