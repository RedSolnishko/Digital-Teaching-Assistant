import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Cancel from '../assets/svg/x.svg?react';

const UserTasks = ({ setError }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setCompletedTasks(data.completedTasks || []);
        }
      });
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [id, setError]);

  const handleAddTask = async () => {
    if (!selectedTask) {
      setError('Выберите задание');
      return;
    }
    try {
      const response = await fetch(`/api/users/${id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedTask),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Ошибка при добавлении задания');
        return;
      }
      setCompletedTasks(data.completedTasks);
      setSelectedTask(null);
    } catch (err) {
      setError('Не удалось подключиться к серверу');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/users/${id}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Ошибка при удалении задания');
        return;
      }
      setCompletedTasks(data.completedTasks);
    } catch (err) {
      setError('Не удалось подключиться к серверу');
    }
  };

  return (
    <div className="user-tasks">
      <SelectField
        value={selectedTask}
        onChange={setSelectedTask}
        options={tasks
          .filter((task) => !completedTasks.includes(task.id))
          .map((task) => ({ id: task.id, label: task.title }))}
      />
      <div className="user-tasks__btn-group">
        <Button variant="primary" onClick={handleAddTask}>
          Добавить
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate('/users')}
          rightIcon={<Cancel />}
        >
          Отменить
        </Button>
      </div>
      <div className="user-tasks__task-list">
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