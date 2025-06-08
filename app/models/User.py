from extensions import db
from sqlalchemy import Enum
from .Serializable import Serializable

class User(Serializable, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(Enum('admin', 'user', name='user_roles'), nullable=False, default='user')
    name = db.Column(db.String(200), nullable=False)
    last_name = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    middle_name = db.Column(db.String(100))
    photo = db.Column(db.Text)

    # теперь связь к объектам CompletedTask
    completed_tasks = db.relationship(
        'CompletedTask',
        back_populates='user',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<User {self.id} {self.email}>"