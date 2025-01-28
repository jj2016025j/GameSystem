class ObjectManager {
    constructor(objectData = []) {
      this.objects = new Map(
        objectData.map((obj) => [obj.id, this.createObject(obj)])
      );
    }
  
    createObject(obj) {
      switch (obj.type) {
        case "TreasureChest":
          return new TreasureChest(obj);
        case "Well":
          return new Well(obj);
        default:
          return new MapObject(obj);
      }
    }
  
    getObjectById(id) {
      return this.objects.get(id) || null;
    }
  
    listAllObjects() {
      return Array.from(this.objects.values());
    }
  }
  