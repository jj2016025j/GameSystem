export class MapUI {
    static initialize() {
      update(mapData)
      console.log("地圖 UI 已初始化");
    }
  
    static update(mapData) {
      const mapList = document.querySelector("#mapsList");
      mapList.innerHTML = "";
  
      mapData.forEach(location => {
        const li = document.createElement("li");
        li.textContent = `${location.name} (${location.description})`;
  
        const button = document.createElement("button");
        button.textContent = "前往";
        button.addEventListener("click", () => console.log(`前往 ${location.name}`));
  
        li.appendChild(button);
        mapList.appendChild(li);
      });
    }
  }
  