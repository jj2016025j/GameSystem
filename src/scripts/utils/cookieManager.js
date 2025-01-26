// 工具函數：處理 Cookie 的讀寫
export class CookieManager {
    static setCookie(name, value, days = 7) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
    }
  
    static getCookie(name) {
      const cookieArr = document.cookie.split("; ");
      for (const cookie of cookieArr) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
      }
      return null; // 沒有找到對應的 Cookie
    }
  
    // static deleteCookie(name) {
    //   document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    // }
    static deleteCookie(name) {
      this.setCookie(name, "", -1);
    }
  }
  