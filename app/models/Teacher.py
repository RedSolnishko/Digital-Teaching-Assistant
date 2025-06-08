from extensions import db
from .Serializable import Serializable


class Teacher(Serializable, db.Model):
    __tablename__ = 'teachers'

    id = db.Column(db.Integer, primary_key=True)
    last_name = db.Column(db.String(100), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    middle_name = db.Column(db.String(100))
    department = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    photo = db.Column(db.Text)  # base64-encoded image data

    # one-to-many: a teacher can own many topics and many tasks
    topics = db.relationship('Topic', back_populates='teacher', cascade="all, delete-orphan")
    tasks = db.relationship('Task', back_populates='teacher', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Teacher {self.id} {self.last_name}>"