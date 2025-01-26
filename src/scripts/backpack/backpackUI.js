export class BackpackUI {
    static initialize() {
      const selectionButton = document.getElementById("SelectionButton");
      selectionButton.addEventListener("click", BackpackUI.toggleSelection);
  
      document.getElementById("useItemButton").addEventListener("click", BackpackUI.useItem);
      document.getElementById("addItemButton").addEventListener("click", () => console.log("加入背包"));
      document.getElementById("removeItemButton").addEventListener("click", () => console.log("移除物品"));
    }
  
    static update(backpack) {
      const backpackList = document.querySelector("#backpackList");
      backpackList.innerHTML = "";
  
      backpack.items.forEach((item, id) => {
        const li = document.createElement("li");
        li.textContent = `${id} (x${item})`;
        li.dataset.item = id;
        li.addEventListener("click", () => BackpackUI.toggleItemSelection(li, id));
        backpackList.appendChild(li);
      });
    }
  
    static toggleSelection() {
      const items = document.querySelectorAll("#backpackList li");
      const allSelected = Array.from(items).every(item => item.classList.contains("selected"));
      items.forEach(item => item.classList.toggle("selected", !allSelected));
    }
  
    static toggleItemSelection(itemElement, itemId) {
      itemElement.classList.toggle("selected");
      console.log(`選擇物品: ${itemId}`);
    }
  
    static useItem() {
      const selectedItems = document.querySelectorAll("#backpackList li.selected");
      if (!selectedItems.length) {
        console.log("沒有選中任何物品");
        return;
      }
  
      selectedItems.forEach(item => console.log(`使用物品: ${item.dataset.item}`));
    }
  }
  