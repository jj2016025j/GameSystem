class Skills {
    constructor(name) {
      this.name = name
      this.description = ""
    }
  
    useSkill(skill) {
      if (!this.skillList.includes(skill)) {
          console.log(`${this.name}使用了技能 ${skill.name}`);
      }
    }
  
    learnSkill(skill) {
      if (!this.skillList.includes(skill)) {
          this.skillList.push(skill);
      } else {
          console.log(`${this.name}已经学会了技能 ${skill.name}`);
      }
    };
  
    unlearnSkill(skill) {
      let index = this.skillList.indexOf(skill);
      if (index !== -1) {
          this.skillList.splice(index, 1);
          console.log(`技能 ${skill} 被遗忘了`);
      }
    };
  }
  