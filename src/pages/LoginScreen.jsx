import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import { login } from '../utils/api';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const data = await login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.user_id);
      if (data.role === 'admin') {
        navigate(`/users/${data.user_id}`);
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <div className="login-screen">
      <h2 className="login-screen__title text-h2">Вход</h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="login-screen__form">
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
          required
        />
        <Button variant="primary" onClick={handleSubmit}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;