export class BackpackUI {
  // 初始化背包 UI
  static initialize(backpack) {
    console.log("開始初始化背包 UI");

    // 綁定按鈕事件
    BackpackUI.bindButtonEvents();
    
    // 初始渲染背包
    BackpackUI.update(backpack);

    console.log("初始化背包 UI 完成");
  }

  // 綁定按鈕事件
  static bindButtonEvents() {
    document.getElementById("SelectionButton").addEventListener("click", BackpackUI.toggleSelection);
    document.getElementById("useItemButton").addEventListener("click", BackpackUI.useSelectedItems);
    document.getElementById("addItemButton").addEventListener("click", () => console.log("加入背包"));
    document.getElementById("removeItemButton").addEventListener("click", () => console.log("移除物品"));
  }

  // 更新背包內容到 UI
  static update(backpack) {
    const backpackList = document.querySelector("#backpackList");
    backpackList.innerHTML = ""; // 清空舊的背包內容

    Array.from(backpack.items.values()).forEach(item => {
      const li = BackpackUI.createItemElement(item);
      backpackList.appendChild(li);
    });

    console.log("背包 UI 更新完成");
  }

  // 創建單個物品元素
  static createItemElement(item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} (x${item.quantity})`;
    li.dataset.itemId = item.id;
    li.addEventListener("click", () => BackpackUI.toggleItemSelection(li));
    return li;
  }

  // 切換全選/取消全選
  static toggleSelection() {
    const items = document.querySelectorAll("#backpackList li");
    const allSelected = Array.from(items).every(item => item.classList.contains("selected"));
    items.forEach(item => item.classList.toggle("selected", !allSelected));
    console.log(allSelected ? "取消選擇所有物品" : "選擇所有物品");
  }

  // 切換單個物品的選擇狀態
  static toggleItemSelection(itemElement) {
    itemElement.classList.toggle("selected");
    const itemId = itemElement.dataset.itemId;
    const isSelected = itemElement.classList.contains("selected");
    console.log(`${isSelected ? "選擇" : "取消選擇"}物品: ${itemId}`);
  }

  // 使用選中的物品
  static useSelectedItems() {
    const selectedItems = document.querySelectorAll("#backpackList li.selected");
    if (selectedItems.length === 0) {
      console.log("沒有選中任何物品");
      return;
    }

    selectedItems.forEach(item => {
      const itemId = item.dataset.itemId;
      console.log(`使用物品: ${itemId}`);
      // 在這裡加入具體的物品使用邏輯
    });
  }
}
