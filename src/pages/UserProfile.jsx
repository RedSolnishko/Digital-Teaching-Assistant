import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Tab from '../components/Tab';
import Alert from '../components/Alert';
import Arrow from '../assets/svg/arrow-right.svg?react';
import Cancel from '../assets/svg/x.svg?react';

const UserProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: '',
    photo: '',
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('user_id');

    if (!token) {
      navigate('/');
      return;
    }

    if (role === 'admin') {
      navigate(`/users/${userId}`);
      return;
    }

    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
          navigate('/');
        } else {
          setFormData({
            id: data.id || '',
            photo: data.photo || '',
            lastName: data.lastName || '',
            firstName: data.firstName || '',
            middleName: data.middleName || '',
            email: data.email || '',
            role: data.role || 'user',
            password: '',
            confirmPassword: '',
          });
          setCompletedTasks(data.completedTasks || []);
        }
      });
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [navigate]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Пожалуйста, выберите изображение');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Размер изображения не должен превышать 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    if (!formData.email) {
      setError('Email обязателен для заполнения');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const userData = {
      email: formData.email,
      photo: formData.photo,
    };
    if (formData.password) {
      userData.password = formData.password;
    }

    try {
      const response = await fetch(`/api/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Ошибка при сохранении');
        return;
      }
      setError('');
      alert('Профиль успешно обновлен');
    } catch (err) {
      setError('Не удалось подключиться к серверу');
    }
  };

  return (
    <div className="user-profile">
      <h2 className="user-profile__title text-h2">User Profile</h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="user-profile__tabs">
        <Tab
          label="Основные данные"
          active={activeTab === 'info'}
          onClick={() => setActiveTab('info')}
        />
        <Tab
          label="Пройденные задания"
          active={activeTab === 'tasks'}
          onClick={() => setActiveTab('tasks')}
        />
      </div>
      {activeTab === 'info' && (
        <div className="user-profile__form">
          <div className="user-profile__form-columns">
            <div className="user-profile__form-column">
              <div className="user-profile__photo-wrapper" onClick={handleImageClick}>
                <ImagePlaceholder
                  variant="profile"
                  img={formData.photo}
                  className="user-profile__photo"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <TextField
                label="Фамилия"
                value={formData.lastName}
                disabled
              />
              <TextField
                label="Имя"
                value={formData.firstName}
                disabled
              />
              <TextField
                label="Отчество"
                value={formData.middleName}
                disabled
              />
            </div>
            <div className="user-profile__form-column">
              <TextField
                label="ID"
                value={formData.id}
                disabled
              />
              <SelectField
                value={formData.role}
                options={[
                  { id: 'user', label: 'Пользователь' },
                  { id: 'admin', label: 'Администратор' },
                ]}
                disabled
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                type="email"
                required
              />
              <TextField
                label="Пароль"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                type="password"
              />
              <TextField
                label="Подтверждение пароля"
                value={formData.confirmPassword}
                onChange={(value) => handleChange('confirmPassword', value)}
                type="password"
              />
              <div className="user-profile__form-placeholder"></div>
            </div>
          </div>
          <div>
                        <Button
              variant="secondary"
              onClick={() => navigate('/teachers')}
              rightIcon={<Arrow />}
            >
              Выбрать преподавателя
            </Button>
          </div>
          <div className="user-profile__btn-group">
            <Button variant="primary" onClick={handleSubmit} rightIcon={<Arrow />}>
              Сохранить
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate('/')}
              rightIcon={<Cancel />}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
      {activeTab === 'tasks' && (
        <div className="user-profile__tasks">
          <div className="user-profile__task-list">
            {completedTasks.map((taskId) => {
              const task = tasks.find((t) => t.id === taskId);
              return (
                <div key={taskId} className="user-profile__task-item">
                  <span>{task?.title || 'Неизвестное задание'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;