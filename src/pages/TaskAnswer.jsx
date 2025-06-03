import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Check from '../assets/svg/check.svg?react';
import Arrow from '../assets/svg/arrow-right.svg?react';
import { getTaskByTopicId, submitTaskAnswer, addUserTask, getCurrentUser } from '../utils/api';

/**
 * Компонент для ответа на задание по теме.
 * Позволяет пользователю просмотреть задание, ввести ответ и отправить его.
 */
const TaskAnswer = () => {
  // Получаем ID темы из URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Состояния для хранения данных задания, ответа, статуса выполнения и уведомлений
  const [task, setTask] = useState(null);
  const [answer, setAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Загружаем данные задания и проверяем статус выполнения при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Проверяем наличие токена, иначе перенаправляем на логин
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        // Загружаем данные задания по ID темы
        const taskData = await getTaskByTopicId(id);
        setTask(taskData);
        // Получаем данные текущего пользователя
        const userData = await getCurrentUser();
        // Проверяем, выполнено ли задание
        setCompleted(userData.completedTasks?.includes(parseInt(id)) || false);
      } catch (err) {
        setNotification({ type: 'error', message: err.message });
        navigate('/');
      }
    };
    fetchData();
  }, [id, navigate]);

  /**
   * Обработчик отправки ответа.
   * Проверяет ответ, обновляет статус выполнения и добавляет задание в список пользователя.
   */
  const handleSubmit = async () => {
    // Проверяем, что ответ не пустой
    if (!answer.trim()) {
      setNotification({ type: 'error', message: 'Введите ответ' });
      return;
    }

    try {
      // Отправляем ответ на сервер
      const data = await submitTaskAnswer(id, answer);
      if (data.isCorrect) {
        // Если ответ верный, обновляем статус и добавляем задание пользователю
        setNotification({ type: 'success', message: 'Ответ верный!' });
        setCompleted(true);
        await addUserTask(localStorage.getItem('user_id'), parseInt(id));
      } else {
        // Если ответ неверный, показываем ошибку
        setNotification({ type: 'error', message: 'Ответ неверный. Попробуйте снова.' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  // Отображаем загрузку, пока данные не получены
  if (!task) return <div>Загрузка...</div>;

  return (
    <div className="task-answer">
      {/* Заголовок задания */}
      <h2 className="task-answer__title text-h2">{task.title}</h2>
      {/* Уведомление об успехе или ошибке */}
      {notification.message && (
        <Alert
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification({ type: '', message: '' })}
        />
      )}
      <div className="task-answer__content">
        <div className="task-answer__task">
          {/* Содержимое задания */}
          <h3 className="task-answer__subtitle text-h3">Задание</h3>
          <p>{task.content}</p>
          {/* Индикатор выполнения */}
          {completed && (
            <div className="task-answer__completed">
              <Check className="task-answer__completed-icon" />
              <span>Выполнено</span>
            </div>
          )}
        </div>
        <div className="task-answer__form">
          {/* Поле для ввода ответа */}
          <TextField
            label="Ваш ответ"
            value={answer}
            onChange={(value) => setAnswer(value)}
            multiline
            rows={4}
          />
          <div className="task-answer__btn-group">
            {/* Кнопка отправки ответа */}
            <Button variant="primary" onClick={handleSubmit} rightIcon={<Arrow />}>
              Отправить
            </Button>
            {/* Кнопка возврата к преподавателю */}
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
