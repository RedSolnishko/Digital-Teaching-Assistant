from extensions import db
from .Serializable import Serializable


class Task(Serializable, db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))

    # другие связи...
    teacher = db.relationship('Teacher', back_populates='tasks')
    topic = db.relationship('Topic', back_populates='tasks')

    # теперь связь к CompletedTask
    completed_by = db.relationship(
        'CompletedTask',
        back_populates='task',
        cascade='all, delete-orphan'
    )

    def __repr__(self):
        return f"<Task {self.id} {self.title}>"