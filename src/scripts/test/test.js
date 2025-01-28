const playerStates = new States(player, initialState, DefaultState);
const effectManager = new EffectManager(playerStates, DefaultState.AVAILABLE_EFFECTS);

// 玩家獲得一個中毒效果
effectManager.addEffect("PoisonEffect");

// 每秒執行一次，應用所有效果
setInterval(() => {
  effectManager.updateEffects();
}, 1000);
