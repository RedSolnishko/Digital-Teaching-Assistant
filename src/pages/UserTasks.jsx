import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Cancel from '../assets/svg/x.svg?react';
import { getUserById, getTasks, addUserTask, deleteUserTask } from '../utils/api';

const UserTasks = ({ setError }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserById(id);
        setCompletedTasks(userData.completedTasks || []);
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id, setError]);

  const handleAddTask = async () => {
    if (!selectedTask) {
      setError('Выберите задание');
      return;
    }
    try {
      const data = await addUserTask(id, selectedTask);
      setCompletedTasks(data.completedTasks);
      setSelectedTask(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const data = await deleteUserTask(id, taskId);
      setCompletedTasks(data.completedTasks);
    } catch (err) {
      setError(err.message);
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