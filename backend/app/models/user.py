from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    
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