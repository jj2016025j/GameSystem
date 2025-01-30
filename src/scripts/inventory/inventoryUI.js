export class InventoryUI {
  // 初始化背包 UI
  static initialize(inventory) {
    console.log("開始初始化背包 UI");

    // 綁定按鈕事件
    InventoryUI.bindButtonEvents();
    
    // 初始渲染背包
    InventoryUI.update(inventory);

    console.log("初始化背包 UI 完成");
  }

  // 綁定按鈕事件
  static bindButtonEvents() {
    document.getElementById("SelectionButton").addEventListener("click", InventoryUI.toggleSelection);
    document.getElementById("useItemButton").addEventListener("click", InventoryUI.useSelectedItems);
    document.getElementById("addItemButton").addEventListener("click", () => console.log("加入背包"));
    document.getElementById("removeItemButton").addEventListener("click", () => console.log("移除物品"));
  }

  // 更新背包內容到 UI
  static update(inventory) {
    const inventoryList = document.querySelector("#inventoryList");
    inventoryList.innerHTML = ""; // 清空舊的背包內容

    Array.from(inventory.items.values()).forEach(item => {
      const li = InventoryUI.createItemElement(item);
      inventoryList.appendChild(li);
    });

    console.log("背包 UI 更新完成");
  }

  // 創建單個物品元素
  static createItemElement(item) {
    const li = document.createElement("li");
    li.textContent = `${item.name} (x${item.quantity})`;
    li.dataset.itemId = item.id;
    li.addEventListener("click", () => InventoryUI.toggleItemSelection(li));
    return li;
  }

  // 切換全選/取消全選
  static toggleSelection() {
    const items = document.querySelectorAll("#inventoryList li");
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
    const selectedItems = document.querySelectorAll("#inventoryList li.selected");
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
