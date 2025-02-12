import { SystemLog } from "../utils/SystemLog.js";

export class InventoryUI {
  // 初始化背包 UI
  static initialize(gameSystem) {
    SystemLog.addMessage("[背包UI] 開始初始化");
    this.inventory = gameSystem.player.inventory

    // 綁定按鈕事件
    InventoryUI.bindButtonEvents();
    
    // 初始渲染背包
    InventoryUI.update(this.inventory);

    SystemLog.addMessage(`[背包UI] 初始化完成，共 ${this.inventory.items.size} 件物品 ✅`);
  }

  // 綁定按鈕事件
  static bindButtonEvents() {
    document.getElementById("SelectionButton").addEventListener("click", InventoryUI.toggleSelection);
    document.getElementById("useItemButton").addEventListener("click", InventoryUI.useSelectedItems);
    document.getElementById("addItemButton").addEventListener("click", () => SystemLog.addMessage("加入背包"));
    document.getElementById("removeItemButton").addEventListener("click", () => SystemLog.addMessage("移除物品"));
  }

  // 更新背包內容到 UI
  static update() {
    const inventoryList = document.querySelector("#inventoryList");
    inventoryList.innerHTML = ""; // 清空舊的背包內容

    Array.from(this.inventory.items.values()).forEach(item => {
      const li = InventoryUI.createItemElement(item);
      inventoryList.appendChild(li);
    });
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
    SystemLog.addMessage(allSelected ? "取消選擇所有物品" : "選擇所有物品");
  }

  // 切換單個物品的選擇狀態
  static toggleItemSelection(itemElement) {
    itemElement.classList.toggle("selected");
    const itemId = itemElement.dataset.itemId;
    const isSelected = itemElement.classList.contains("selected");
    SystemLog.addMessage(`${isSelected ? "選擇" : "取消選擇"}物品: ${itemId}`);
  }

  // 使用選中的物品
  static useSelectedItems() {
    const selectedItems = document.querySelectorAll("#inventoryList li.selected");
    if (selectedItems.length === 0) {
      SystemLog.addMessage("沒有選中任何物品");
      return;
    }

    selectedItems.forEach(item => {
      const itemId = item.dataset.itemId;
      SystemLog.addMessage(`使用物品: ${itemId}`);
      // 在這裡加入具體的物品使用邏輯
    });
  }
}
