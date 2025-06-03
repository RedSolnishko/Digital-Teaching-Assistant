import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Tab from '../components/Tab';
import Alert from '../components/Alert';
import UserTasks from '../pages/UserTasks';
import Cancel from '../assets/svg/x.svg?react';
import Accept from '../assets/svg/check.svg?react';
import { getUserById, createUser, updateUser } from '../utils/api';

const UserEdit = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    photo: '',
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        try {
          const data = await getUserById(id);
          setFormData({
            photo: data.photo || '',
            lastName: data.lastName || '',
            firstName: data.firstName || '',
            middleName: data.middleName || '',
            email: data.email || '',
            role: data.role || 'user',
            password: '',
            confirmPassword: '',
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchData();
    }
  }, [id]);

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
    if (!isEditing) {
      if (
        !formData.lastName ||
        !formData.firstName ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError('Все поля обязательны для заполнения');
        return false;
      }
    }
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const userData = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      email: formData.email,
      role: formData.role,
      photo: formData.photo,
      name: `${formData.lastName} ${formData.firstName} ${formData.middleName}`.trim(),
    };
    if (formData.password) {
      userData.password = formData.password;
    }

    try {
      if (isEditing) {
        await updateUser(id, userData);
      } else {
        await createUser(userData);
      }
      navigate('/users');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-edit">
      <h2 className="user-edit__title text-h2">
        {isEditing ? 'Редактировать пользователя' : 'Создать пользователя'}
      </h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="user-edit__tabs">
        <Tab
          label="Основные данные"
          active={activeTab === 'info'}
          onClick={() => setActiveTab('info')}
        />
        {isEditing && (
          <Tab
            label="Пройденные задания"
            active={activeTab === 'tasks'}
            onClick={() => setActiveTab('tasks')}
          />
        )}
      </div>
      {activeTab === 'info' && (
        <div className="user-edit__form">
          <div className="user-edit__form-columns">
            <div className="user-edit__form-column">
              <div className="user-edit__photo-wrapper" onClick={handleImageClick}>
                <ImagePlaceholder
                  variant="profile"
                  img={formData.photo}
                  className="user-edit__photo"
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
                onChange={(value) => handleChange('lastName', value)}
                required={!isEditing}
              />
              <TextField
                label="Имя"
                value={formData.firstName}
                onChange={(value) => handleChange('firstName', value)}
                required={!isEditing}
              />
              <TextField
                label="Отчество"
                value={formData.middleName}
                onChange={(value) => handleChange('middleName', value)}
                required={!isEditing}
              />
            </div>
            <div className="user-edit__form-column">
              <TextField
                label="ID"
                value={isEditing ? parseInt(id) : 'N/A'}
                disabled
              />
              <SelectField
                value={formData.role}
                onChange={(value) => handleChange('role', value)}
                options={[
                  { id: 'user', label: 'Пользователь' },
                  { id: 'admin', label: 'Администратор' },
                ]}
                required
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                type="email"
                required={!isEditing}
              />
              <TextField
                label="Пароль"
                value={formData.password}
                onChange={(value) => handleChange('password', value)}
                type="password"
                required={!isEditing}
              />
              <TextField
                label="Подтверждение пароля"
                value={formData.confirmPassword}
                onChange={(value) => handleChange('confirmPassword', value)}
                type="password"
                required={!isEditing}
              />
              <div className="user-edit__form-placeholder"></div>
            </div>
          </div>
          <div className="user-edit__btn-group">
            <Button variant="primary" onClick={handleSubmit} rightIcon={<Accept />}>
              {isEditing ? 'Сохранить' : 'Создать'}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/users')}
              rightIcon={<Cancel />}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
      {activeTab === 'tasks' && isEditing && <UserTasks setError={setError} />}
    </div>
  );
};

export default UserEdit;