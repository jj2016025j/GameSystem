export const skillsData = [
    {
        id: 'fireball', // 唯一標識符
        name: '火球術', // 技能名稱
        description: '召喚一個火球對敵人造成傷害', // 技能描述
        type: 'damage', // 技能類型：傷害類型技能
        effects: { damage: 50 }, // 技能效果
        manaCost: 20, // 魔力消耗
        cooldown: 5, // 冷卻時間（秒）
    },
    {
        id: 'heal',
        name: '治療術',
        description: '恢復友方目標的生命值',
        type: 'support', // 技能類型：輔助類型技能
        effects: { heal: 40 }, // 技能效果
        manaCost: 15,
        cooldown: 4,
    },
    {
        id: 'stealth',
        name: '隱身術',
        description: '使自己進入隱身狀態，難以被發現',
        type: 'utility', // 技能類型：功能類型技能
        effects: { stealth: true }, // 技能效果
        manaCost: 10,
        cooldown: 10,
        duration: 8, // 持續時間（秒）
    },
    {
        id: 'cold',
        name: '冰凍術',
        description: '使敵人減速並造成冰霜傷害',
        type: 'control', // 技能類型：控制類技能
        effects: { damage: 30, slow: 20 }, // 技能效果
        manaCost: 25,
        cooldown: 7,
        duration: 5, // 持續時間（秒）
    },
];
