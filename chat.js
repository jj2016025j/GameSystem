// 示例JSON数据
var chatData = {
    "messages": [
        {"message": "这是第一条消息", "sender": "用户A", "time":new Date().toISOString()},
        {"message": "这是第二条消息", "sender": "用户B", "time":new Date().toISOString()}
        // 更多消息...
    ]
};
     
function createMessage(message, sender) {
    return {
      message: message,
      sender: sender,
      time: new Date().toISOString() // 生成ISO 8601格式的时间戳
    };
}

let chatHistory = chatData
var chatLog = document.getElementById('chatLog');
var messageInput = document.querySelector('input[type="text"]');
const sendButton = document.getElementById('sendButton');

// 解析JSON数据，并将消息添加到聊天室
function updateChatRoom(chatData) {    
    // // 遍历消息数据
    // chatData.messages.forEach(function(message) {
    //     // 格式化时间戳，例如："14:48, April 5"
    //     var timeString = new Date(message.time).toLocaleString();
    //     // 构建消息文本
    //     var messageText = message.sender + ' (' + timeString + '): ' + message.message + '\n';
    //     // 将消息文本附加到<textarea>的值
    //     chatLog.value += messageText;
    // });
    
    // // 滚动到<textarea>的底部
    // chatLog.scrollTop = chatLog.scrollHeight;

    // 清空当前的聊天记录
    chatLog.innerHTML = '';

    // 遍历消息数据，为每条消息创建DOM元素并添加到聊天室
    chatData.messages.forEach(function(message) {
        const messageElement = document.createElement('div');
        // 格式化时间戳，例如："14:48, April 5"
        var timeString = new Date(message.time).toLocaleString();
        messageElement.textContent = message.sender + ' (' + timeString + '): ' + message.message;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight; // 滚动到最新消息
    });
}

// 将新消息添加到聊天记录
function appendMessageToChatLog(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${message.sender}: ${message.message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight; // 滚动到最新消息
}

// // 模拟从服务器获取历史消息
// function fetchChatHistory() {
//     // 这里假设 fetchHistory() 是一个调用服务器 API 并返回历史消息的函数
//     fetchHistory().then(messages => {
//         messages.forEach(message => {
//             appendMessageToChatLog(message);
//         });
//     });
// }

// function fetchHistory(){
//     return chatHistory
// }

// 模拟将消息发送到服务器的函数
function sendMessageToServer(message) {
    // 这里假设 sendMessage() 是一个发送消息到服务器的函数
    sendMessage(message).then(message => {
    // 消息成功发送到服务器后的操作
    console.log(message);
    });
}

// // 假设我们想要删除第一个消息
// var firstMessageElement = chatLog.querySelector('p');
// if (firstMessageElement) {
//     chatLog.removeChild(firstMessageElement);
// }

function buttonClicked(action) {
    chatLog.value += '\n按了' + action + '按鈕。';
    chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage(action) {
    var message = messageInput.value.trim(); // 在函数内部获取最新的消息
    if (message) {
        chatLog.value += '\n' + message;
        messageInput.value = '';
        chatLog.scrollTop = chatLog.scrollHeight;
    }else{
        chatLog.value += '\n按了' + action + '按鈕。';
        chatLog.scrollTop = chatLog.scrollHeight;
    }
    return message
}

// // 监听发送按钮点击事件
// sendButton.addEventListener('click', function() {
//     const message = messageInput.value.trim();
//     if (message) {
//     appendMessageToChatLog({ sender: 'Me', message: message }); // 添加消息到聊天记录
//     sendMessageToServer({ message: message }); // 发送消息到服务器
//     messageInput.value = ''; // 清空输入框
//     }
// });

function initialization(){
    // 添加事件监听器，当在输入框按下回车键时发送消息
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage(this.textContent); // 触发发送按钮的点击事件
        }
    });

    // 为发送按钮添加点击事件处理器
    sendButton.addEventListener('click', sendMessage);

    // 如果您有其他 .log 类按钮用于记录到聊天，为它们添加事件监听器 測試
    document.querySelectorAll('.log').forEach(function(button) {
        button.addEventListener('click', function() {
            buttonClicked(this.textContent);
        });
    });

    // 初始化聊天室
    // fetchChatHistory();
    // setupRealTimeMessaging();
}

document.addEventListener('DOMContentLoaded', function() {
    initialization()
})
// // 模拟实时接收消息
// function setupRealTimeMessaging() {
//     // 这里假设 openWebSocket() 是一个打开WebSocket连接并监听消息的函数
//     openWebSocket().onmessage = function(event) {
//     const message = JSON.parse(event.data);
//     appendMessageToChatLog(message);
//     };
// }

class ChatSystem {
    constructor(player) {
      this.player = player;
    }
  
    send(message) {
      console.log(message)
    }
  
    send(sender, message) {
      console.log(`${sender.name}: ${message}`);
      // 实际的聊天系统会有复杂的逻辑来发送消息到服务器或者直接到其他玩家
    }
    // ... 其他聊天相關方法
  }





  
// Define the supporting classes

class ObjectInteraction {
    constructor(player) {
      this.player = player;
    }
    // ... other methods
  }
  
  class ShopSystem {
    constructor(player) {
      this.player = player;
    }
    // ... other methods
  }
  
  class EventSystem {
    constructor(player) {
        this.player = player;
    }
    // ... other methods
  }
  
  class QuestSystem {
    constructor(player) {
        this.player = player;
    }
    // ... other methods
  }
  
  class NotificationSystem {
    constructor(player) {
        this.player = player;
    }
    // ... other methods
  }
  
  class InventorySystem {
    constructor(player) {
        this.player = player;
    }
    // ... other methods
  }
  
  // (Backpack, Skills, Status, ChatSystem, Player ... remain the same)
  // 假设你的 Backpack 类定义已经存在