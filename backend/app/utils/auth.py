import jwt
from functools import wraps
from flask import request, jsonify, current_app
from app.models.user import User

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1] 
            
        if not token:
            return jsonify({'error': 'Токен отсутствует!'}), 401
            
        try:
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
            if not current_user:
                raise Exception("Пользователь не найден")
        except Exception as e:
            return jsonify({'error': 'Неверный или просроченный токен!'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated