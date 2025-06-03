
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { login } from '../utils/api';

/**
 * Компонент экрана авторизации.
 * Позволяет пользователю войти в систему, введя email и пароль.
 */
const LoginScreen = () => {
  // Состояние для хранения данных формы (email и пароль)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // Состояние для хранения сообщения об ошибке
  const [error, setError] = useState('');
  // Хук для навигации
  const navigate = useNavigate();

  /**
   * Обработчик изменения полей формы.
   * @param {string} key - Название поля (email или password).
   * @param {string} value - Новое значение поля.
   */
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Обработчик отправки формы.
   * Выполняет запрос на авторизацию, сохраняет токен и перенаправляет пользователя.
   */
  const handleSubmit = async () => {
    try {
      // Выполняем запрос на авторизацию
      const data = await login(formData);
      // Сохраняем токен, роль и ID пользователя в localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.user_id);
      // Перенаправляем в зависимости от роли
      if (data.role === 'admin') {
        navigate(`/users/${data.user_id}`);
      } else {
        navigate('/profile');
      }
    } catch (err) {
      // Отображаем ошибку, если авторизация не удалась
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="login-screen">
      {/* Заголовок экрана */}
      <h2 className="login-screen__title text-h2">Вход</h2>
      {/* Отображение ошибки, если она есть */}
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="login-screen__form">
        {/* Поле для ввода email */}
        <TextField
          label="Email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          type="email"
          required
        />
        {/* Поле для ввода пароля */}
        <TextField
          label="Пароль"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          type="password"
          required
        />
        {/* Кнопка отправки формы */}
        <Button variant="primary" onClick={handleSubmit}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
