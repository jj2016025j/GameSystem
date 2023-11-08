class Item{
    constructor(name, value, description, quantity) {
      this.name = name
      this.value = value;
      this.description = description
      this.quantity = quantity
    }
    //作用
    Effects(states){
        switch(this.name){
            case "Apple":
                states.saturation += 30
                states.mood+=10
                break;
            case "Poison":
                states.addStatusEffect("Poison")
                //傷害動畫
                break;
            case "MagicPotion":
                states.mana+=50
                //傷害動畫
                break;
            case "LifePotion":
                states.health+=50
                //傷害動畫
                break;
            case "ExperiencePotion":
                states.experience+=50
                //傷害動畫
                break;
            case "StrengthPotion ":
                states.strength+=50
                //傷害動畫
                break;
            default:
                console.log("未知效果");
                break;
        }
    }
}