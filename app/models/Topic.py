from extensions import db
from sqlalchemy import JSON
from .Serializable import Serializable

class Topic(Serializable, db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    template = db.Column(db.Text, nullable=False)
    # store parameters as JSON: e.g. {"difficulty": "easy", "questions": 5}
    parameters = db.Column(JSON, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)

    teacher = db.relationship('Teacher', back_populates='topics')
    # optional relationship to tasks (if you store tasks per topic)
    tasks = db.relationship('Task', back_populates='topic', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Topic {self.id} {self.title}>"