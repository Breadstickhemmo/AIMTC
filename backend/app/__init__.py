from flask import Flask
from app.config import Config
from app.extensions import db, cors

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    cors.init_app(app)

    from app.routes.auth_routes import auth_bp
    from app.routes.ai_routes import ai_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(ai_bp)

    with app.app_context():
        db.create_all()

    return app