export class DOMUtils {
    static clearAndPopulateList(containerSelector, items, itemRenderer) {
      const container = document.querySelector(containerSelector);
      container.innerHTML = ""; // 清空容器
      items.forEach(item => container.appendChild(itemRenderer(item)));
    }
  
    static createButton(label, callback, className = "") {
      const button = document.createElement("button");
      button.textContent = label;
      if (className) button.classList.add(className);
      button.addEventListener("click", callback);
      return button;
    }
  
    static createListItem(content, buttons = []) {
      const li = document.createElement("li");
      li.textContent = content;
      buttons.forEach(button => li.appendChild(button));
      return li;
    }
  }
  