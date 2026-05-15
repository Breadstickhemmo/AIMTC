from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

PROXYAPI_KEY = os.getenv("PROXYAPI_KEY")
API_URL = "https://api.proxyapi.ru/openrouter/v1/chat/completions"

MODEL = "meta-llama/llama-3.3-70b-instruct" 

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "engine": "flask", "proxyapi_configured": bool(PROXYAPI_KEY)})

@app.route('/api/navigate', methods=['POST'])
def navigate():
    if not PROXYAPI_KEY:
        return jsonify({"error": "API key is missing on the server."}), 500

    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
        
    prompt = data.get('prompt')
    history_data = data.get('history', [])
    current_profile = data.get('currentProfile', {})
    
    system_instruction = f"""
    Ты "МТС Навигатор" — ИИ-ассистент. Твоя задача — помогать "Пилоту" (пользователю) ориентироваться в карьерном треке внутри экосистемы МТС.
    Бренд МТС: ведущая цифровая экосистема в России.
    Тон: Профессиональный, поддерживающий, инновационный, digital-first. Отвечай на русском языке.
    
    Текущий профиль пользователя: {json.dumps(current_profile, ensure_ascii=False)}
    
    Ограничения вывода:
    - Отвечай четко и структурированно, используя Markdown.
    - Предлагай "Пересчитать маршрут", если пользователь упоминает новые цели или успехи.
    - Рекомендуй конкретные ресурсы для обучения (можешь придумывать моковые названия курсов МТС).
    """
    
    messages = [
        {"role": "system", "content": system_instruction}
    ]
    
    for msg in history_data:
        role = "assistant" if msg.get('role') == 'model' else "user"
        
        parts = msg.get('parts', [])
        text = parts[0].get('text', '') if parts else ''
        
        messages.append({"role": role, "content": text})
        
    messages.append({"role": "user", "content": prompt})
    
    payload = {
        "model": MODEL,
        "messages": messages
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {PROXYAPI_KEY}"
    }
    
    try:
        response = requests.post(API_URL, json=payload, headers=headers)
        response.raise_for_status()
        
        response_data = response.json()
        
        generated_text = response_data['choices'][0]['message']['content']
        
        return jsonify({"text": generated_text})
        
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err} - {response.text}")
        return jsonify({"error": "Failed to communicate with AI model"}), int(response.status_code)
    except Exception as err:
        print(f"Other error occurred: {err}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)