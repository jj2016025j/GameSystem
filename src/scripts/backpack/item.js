// 效果處理策略
const ItemEffects = {
    Apple: (states) => {
        states.saturation += 30;
        states.mood += 10;
    },
    Poison: (states) => {
        states.addStatusEffect("Poison");
    },
    MagicPotion: (states) => {
        states.mana += 50;
    },
    LifePotion: (states) => {
        states.health += 50;
    },
    ExperiencePotion: (states) => {
        states.experience += 50;
    },
    StrengthPotion: (states) => {
        states.strength += 50;
    },
    default: (states) => {
        console.log("未知效果");
    },
};