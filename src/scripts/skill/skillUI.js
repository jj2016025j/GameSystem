export class SkillUI {
    static initialize(skillList) {
      console.log("技能 UI 初始化");
      SkillUI.update(skillList);
    }
  
    static update(skillList) {
      const skillsListElement = document.querySelector("#skillsList");
      skillsListElement.innerHTML = ""; // 清空技能列表
  
      skillList.forEach(skill => {
        const skillItem = document.createElement("li");
        skillItem.textContent = skill.name;
  
        const useButton = document.createElement("button");
        useButton.textContent = "使用";
        useButton.addEventListener("click", () => SkillUI.useSkill(skill));
  
        skillItem.appendChild(useButton);
        skillsListElement.appendChild(skillItem);
      });
    }
  
    static useSkill(skill) {
      console.log(`使用技能: ${skill.name}`);
      // 這裡可以擴展技能使用邏輯
      if (skill.cooldown && skill.cooldown > 0) {
        console.log(`技能 ${skill.name} 正在冷卻中，剩餘時間：${skill.cooldown} 秒`);
        return;
      }
  
      console.log(`技能 ${skill.name} 使用成功！`);
      // 在這裡處理冷卻邏輯
      if (skill.setCooldown) {
        skill.setCooldown(5); // 設定冷卻時間為 5 秒
      }
    }
  }
  