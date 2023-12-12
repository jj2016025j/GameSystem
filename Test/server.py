from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# 假定有一个默认的游戏进度数据
default_progress = {
    "name": "默认玩家",
    "health": 100,
    "mana": 50
}

# 保存游戏进度的路由
@app.route('/save', methods=['POST'])
def save_progress():
    progress_data = request.get_json()
    with open('gameData.json', 'w') as file:
        json.dump(progress_data, file, indent=4)
    return jsonify({"status": "success", "message": "Progress saved."}), 200

# 加载游戏进度的路由
@app.route('/load', methods=['GET'])
def load_progress():
    try:
        with open('gameData.json', 'r') as file:
            progress_data = json.load(file)
    except FileNotFoundError:
        progress_data = default_progress
    return jsonify(progress_data), 200

if __name__ == '__main__':
    app.run(debug=True)

