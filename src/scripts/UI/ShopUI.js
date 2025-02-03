export class ShopUI {
  static initialize() {
    const shopList = document.querySelector("#shopsList");
    shopList.innerHTML = "";

    shops.forEach(shop => {
      const li = document.createElement("li");
      li.textContent = shop.name;

      const buyButton = document.createElement("button");
      buyButton.textContent = "購買";
      buyButton.addEventListener("click", () => console.log(`向 ${shop.name} 購買物品`));

      const sellButton = document.createElement("button");
      sellButton.textContent = "出售";
      sellButton.addEventListener("click", () => console.log(`向 ${shop.name} 出售物品`));

      li.appendChild(buyButton);
      li.appendChild(sellButton);
      shopList.appendChild(li);
    });
    console.log("商店 UI 已初始化");
  }

  static update(shops) {
    const shopList = document.querySelector("#shopsList");
    shopList.innerHTML = "";

    shops.forEach(shop => {
      const li = document.createElement("li");
      li.textContent = shop.name;

      const buyButton = document.createElement("button");
      buyButton.textContent = "購買";
      buyButton.addEventListener("click", () => console.log(`向 ${shop.name} 購買物品`));

      const sellButton = document.createElement("button");
      sellButton.textContent = "出售";
      sellButton.addEventListener("click", () => console.log(`向 ${shop.name} 出售物品`));

      li.appendChild(buyButton);
      li.appendChild(sellButton);
      shopList.appendChild(li);
    });
  }
}
