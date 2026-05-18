import json
import requests
from flask import Blueprint, request, jsonify, current_app
from app.utils.auth import token_required

ai_bp = Blueprint('ai_bp', __name__, url_prefix='/api')

@ai_bp.route('/navigate', methods=['POST'])
@token_required
def navigate(current_user):
    proxyapi_key = current_app.config['PROXYAPI_KEY']
    api_url = current_app.config['API_URL']
    model = current_app.config['MODEL']

    if not proxyapi_key:
        return jsonify({"error": "API key is missing on the server."}), 500

    data = request.json
    prompt = data.get('prompt')
    history_data = data.get('history', [])
    
    current_profile = current_user.to_dict()
    
    system_instruction = f"""
    Ты "МТС Навигатор" — ИИ-ассистент. Помогаешь Пилоту ({current_profile['name']}) двигаться к цели: {current_profile['targetRole']}.
    Текущие навыки: {json.dumps(current_profile['skills'], ensure_ascii=False)}
    Тон: Профессиональный, поддерживающий, инновационный, digital-first.
    Отвечай четко и структурированно, используя Markdown.
    """
    
    messages = [{"role": "system", "content": system_instruction}]
    
    for msg in history_data:
        role = "assistant" if msg.get('role') == 'model' else "user"
        messages.append({"role": role, "content": msg.get('text', '')})
        
    messages.append({"role": "user", "content": prompt})
    
    try:
        response = requests.post(
            api_url, 
            json={"model": model, "messages": messages}, 
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {proxyapi_key}"}
        )
        response.raise_for_status()
        generated_text = response.json()['choices'][0]['message']['content']
        return jsonify({"text": generated_text})
        
    except Exception as err:
        return jsonify({"error": str(err)}), 500