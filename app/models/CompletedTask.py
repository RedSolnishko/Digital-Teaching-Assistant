from datetime import datetime
from extensions import db
from .Serializable import Serializable


class CompletedTask(Serializable, db.Model):
    __tablename__ = 'completed_tasks'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False)
    completed_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    # связи
    user = db.relationship('User', back_populates='completed_tasks')
    task = db.relationship('Task', back_populates='completed_by')

    def __repr__(self):
        return f"<CompletedTask user={self.user_id} task={self.task_id} at={self.completed_at}>"