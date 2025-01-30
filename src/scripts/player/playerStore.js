import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
    state: () => ({
        playerData: {}
    }),
    actions: {
        setPlayerData(data) {
            this.playerData = data;
        },
        updatePlayerState(newState) {
            this.playerData.states = { ...this.playerData.states, ...newState };
        }
    },
});
