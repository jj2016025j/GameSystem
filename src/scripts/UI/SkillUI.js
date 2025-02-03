export class SkillUI {
  static initialize(gameSystem) {
    console.log(`[技能UI] 開始初始化...`);
    this.gameSystem = gameSystem
    this.player = this.gameSystem.player
    const skillList = this.gameSystem.player.getSkillList(gameSystem.player)
    SkillUI.update(skillList);
    console.log(`[技能UI] 初始化完成，共 ${skillList.length} 個技能 ✅`);
  }

  static update() {
    const skillsListElement = document.querySelector("#skillsList");
    skillsListElement.innerHTML = ""; // 清空技能列表

    const skillList = this.player.getSkillList(this.player)
    skillList.forEach(skill => {
      // 創建技能項目容器
      const skillItem = document.createElement("div");
      skillItem.className = "skill-item";

      // 添加技能名稱
      const skillName = document.createElement("span");
      skillName.textContent = skill.name;
      skillName.className = "skill-name";
      skillItem.appendChild(skillName);

      // 添加技能冷卻時間
      const cooldownDisplay = document.createElement("span");
      cooldownDisplay.className = "skill-cooldown";
      if (skill.cooldownRemaining > 0) {
        cooldownDisplay.textContent = `冷卻中: ${skill.cooldownRemaining}s`;
      } else {
        cooldownDisplay.textContent = "可使用";
      }
      skillItem.appendChild(cooldownDisplay);

      // 添加使用按鈕
      const useButton = document.createElement("button");
      useButton.textContent = "使用";
      useButton.className = "skill-use-button";
      if (skill.cooldownRemaining > 0) {
        useButton.disabled = true;
      }

      // 綁定使用技能的點擊事件
      useButton.addEventListener("click", () => SkillUI.useSkill(skill, cooldownDisplay, useButton));
      skillItem.appendChild(useButton);

      // 添加到技能列表中
      skillsListElement.appendChild(skillItem);
    });
  }

  static useSkill(skill, cooldownDisplay, useButton) {
    console.log(`使用技能: ${skill.name}`);
    if (skill.cooldownRemaining > 0) {
      console.log(`技能 ${skill.name} 正在冷卻中，剩餘時間：${skill.cooldownRemaining} 秒`);
      return;
    }

    // 處理技能使用
    console.log(`技能 ${skill.name} 使用成功！`);
    skill.cooldownRemaining = skill.cooldown || 5; // 假設技能有 5 秒冷卻

    // 更新按鈕狀態和冷卻時間顯示
    useButton.disabled = true;
    SkillUI.updateCooldownDisplay(skill, cooldownDisplay, useButton);
  }

  static updateCooldownDisplay(skill, cooldownDisplay, useButton) {
    const interval = setInterval(() => {
      if (skill.cooldownRemaining > 0) {
        skill.cooldownRemaining -= 1;
        cooldownDisplay.textContent = `冷卻中: ${skill.cooldownRemaining}s`;
      } else {
        cooldownDisplay.textContent = "可使用";
        useButton.disabled = false;
        clearInterval(interval); // 停止更新
      }
    }, 1000); // 每秒更新一次
  }
}
