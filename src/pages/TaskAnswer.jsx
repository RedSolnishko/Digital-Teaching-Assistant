import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Check from '../assets/svg/check.svg?react';
import Arrow from '../assets/svg/arrow-right.svg?react';

const TaskAnswer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch task for the topic
    fetch(`/api/topics/${id}/task`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate('/');
        } else {
          setTask(data);
        }
      });

    // Check if task is completed
    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setCompleted(data.completedTasks?.includes(parseInt(id)) || false);
        }
      });
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setNotification({ type: 'error', message: 'Введите ответ' });
      return;
    }

    try {
      const response = await fetch(`/api/topics/${id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ answer }),
      });
      const data = await response.json();
      if (!response.ok) {
        setNotification({ type: 'error', message: data.message || 'Ошибка при проверке ответа' });
        return;
      }
      if (data.isCorrect) {
        setNotification({ type: 'success', message: 'Ответ верный!' });
        setCompleted(true);
        // Update completed tasks
        fetch(`/api/users/${localStorage.getItem('user_id')}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(parseInt(id)),
        });
      } else {
        setNotification({ type: 'error', message: 'Ответ неверный. Попробуйте снова.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Не удалось подключиться к серверу' });
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div className="task-answer">
      <h2 className="task-answer__title text-h2">{task.title}</h2>
      {notification.message && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ type: '', message: '' })}
        />
      )}
      <div className="task-answer__content">
        <div className="task-answer__task">
          <h3 className="task-answer__subtitle text-h3">Задание</h3>
          <p>{task.content}</p>
          {completed && (
            <div className="task-answer__completed">
              <Check className="task-answer__completed-icon" />
              <span>Выполнено</span>
            </div>
          )}
        </div>
        <div className="task-answer__form">
          <TextField
            label="Ваш ответ"
            value={answer}
            onChange={(value) => setAnswer(value)}
            multiline
            rows={4}
          />
          <div className="task-answer__btn-group">
            <Button variant="primary" onClick={handleSubmit} rightIcon={<Arrow />}>
              Отправить
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/teachers/${task.teacherId}/details`)}
            >
              Назад
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAnswer;