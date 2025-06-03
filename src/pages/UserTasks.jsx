import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Cancel from '../assets/svg/x.svg?react';
import { getUserById, getTasks, addUserTask, deleteUserTask } from '../utils/api';

/**
 * Компонент управления заданиями пользователя.
 * Позволяет добавлять или удалять задания из списка выполненных пользователем.
 */
const UserTasks = ({ setError }) => {
  // Получаем ID пользователя из URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Состояния для хранения заданий, выполненных заданий и выбранного задания
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  // Загружаем данные пользователя и заданий при монтировании
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем данные пользователя
        const userData = await getUserById(id);
        setCompletedTasks(userData.completedTasks || []);
        // Загружаем все задания
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id, setError]);

  /**
   * Обработчик добавления задания.
   * Добавляет выбранное задание в список выполненных.
   */
  const handleAddTask = async () => {
    // Проверяем, выбрано ли задание
    if (!selectedTask) {
      setError('Выберите задание');
      return;
    }
    try {
      // Добавляем задание пользователю
      const data = await addUserTask(id, selectedTask);
      setCompletedTasks(data.completedTasks);
      setSelectedTask(null); // Сбрасываем выбор
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * Обработчик удаления задания.
   * Удаляет задание из списка выполненных.
   * @param {number} taskId - ID задания.
   */
  const handleDeleteTask = async (taskId) => {
    try {
      // Удаляем задание
      const data = await deleteUserTask(id, taskId);
      setCompletedTasks(data.completedTasks);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-tasks">
      {/* Выбор задания для добавления */}
      <SelectField
        value={selectedTask}
        onChange={setSelectedTask}
        options={tasks
          .filter((task) => !completedTasks.includes(task.id))
          .map((task) => ({ id: task.id, label: task.title }))}
      />
      <div className="user-tasks__btn-group">
        {/* Кнопка добавления задания */}
        <Button variant="primary" onClick={handleAddTask}>
          Добавить
        </Button>
        {/* Кнопка отмены */}
        <Button
          variant="secondary"
          onClick={() => navigate('/users')}
          rightIcon={<Cancel />}
        >
          Отменить
        </Button>
      </div>
      <div className="user-tasks__task-list">
        {/* Список выполненных заданий */}
        {completedTasks.map((taskId) => {
          const task = tasks.find((t) => t.id === taskId);
          return (
            <div key={taskId} className="user-tasks__task-item">
              <span>{task?.title || 'Неизвестное задание'}</span>
              <Button
                variant="secondary"
                onClick={() => handleDeleteTask(taskId)}
              >
                Удалить
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTasks;
