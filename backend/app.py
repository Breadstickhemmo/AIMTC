from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
import json
import requests
import datetime
from functools import wraps
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- Конфигурация ---
PROXYAPI_KEY = os.getenv("PROXYAPI_KEY")
API_URL = "https://api.proxyapi.ru/openrouter/v1/chat/completions"
MODEL = "meta-llama/llama-3.3-70b-instruct"

# Настройки БД и JWT
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'super-secret-mts-hackathon-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///mts_local.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Модели БД ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
    # Поля профиля для фронтенда
    role = db.Column(db.String(50), default="Стажер")
    target_role = db.Column(db.String(50), default="Middle Специалист")
    level = db.Column(db.Integer, default=1)
    progress = db.Column(db.Integer, default=0)
    skills = db.Column(db.JSON, default=list)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "targetRole": self.target_role,
            "level": self.level,
            "progress": self.progress,
            "skills": self.skills if self.skills else [
                {"name": "Культура МТС", "level": 20},
                {"name": "Основы IT", "level": 15}
            ]
        }

# Создаем таблицы при запуске
with app.app_context():
    db.create_all()

# --- Декоратор JWT ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1] # Bearer <token>
            
        if not token:
            return jsonify({'error': 'Токен отсутствует!'}), 401
            
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                raise Exception("Пользователь не найден")
        except Exception as e:
            return jsonify({'error': 'Неверный или просроченный токен!'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

# --- Auth Эндпоинты ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"error": "Заполните все поля"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Пользователь с таким email уже существует"}), 409

    hashed_password = generate_password_hash(data['password'])
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=hashed_password,
        role="Младший пилот",
        target_role="Senior Инженер",
        level=1,
        progress=0
    )
    db.session.add(new_user)
    db.session.commit()

    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"token": token, "user": new_user.to_dict()}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Заполните все поля"}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({"error": "Неверный email или пароль"}), 401

    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({"token": token, "user": user.to_dict()}), 200

@app.route('/api/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify({"user": current_user.to_dict()}), 200

# --- ИИ Эндпоинт (теперь защищен) ---
@app.route('/api/navigate', methods=['POST'])
@token_required
def navigate(current_user):
    if not PROXYAPI_KEY:
        return jsonify({"error": "API key is missing on the server."}), 500

    data = request.json
    prompt = data.get('prompt')
    history_data = data.get('history', [])
    
    # Теперь ИИ знает профиль пользователя прямо из БД
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
        text = msg.get('parts', [])[0].get('text', '') if msg.get('parts') else msg.get('text', '')
        messages.append({"role": role, "content": text})
        
    messages.append({"role": "user", "content": prompt})
    
    try:
        response = requests.post(
            API_URL, 
            json={"model": MODEL, "messages": messages}, 
            headers={"Content-Type": "application/json", "Authorization": f"Bearer {PROXYAPI_KEY}"}
        )
        response.raise_for_status()
        generated_text = response.json()['choices'][0]['message']['content']
        return jsonify({"text": generated_text})
        
    except Exception as err:
        return jsonify({"error": str(err)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)