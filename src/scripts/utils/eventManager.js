export class EventManager {
    constructor() {
        this.events = {}; // 儲存事件對應的監聽函數
    }

    /**
     * 註冊事件監聽
     * @param {string} event - 事件名稱
     * @param {Function} callback - 當事件觸發時執行的函數
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    /**
     * 解除事件監聽
     * @param {string} event - 事件名稱
     * @param {Function} callback - 需要移除的監聽函數
     */
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }

    /**
     * 觸發事件，通知所有監聽者
     * @param {string} event - 事件名稱
     * @param {Object} data - 要傳遞的數據
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    /**
     * 清除所有事件監聽
     */
    clear() {
        this.events = {};
    }
}
