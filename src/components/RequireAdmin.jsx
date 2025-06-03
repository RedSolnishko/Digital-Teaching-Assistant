import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Компонент защиты маршрутов для администраторов.
 * Проверяет, является ли пользователь админом, и перенаправляет, если доступ запрещён.
 */
const RequireAdmin = () => {
  // Состояние для хранения роли пользователя
  const [role, setRole] = useState(null);
  // Состояние для отслеживания загрузки
  const [loading, setLoading] = useState(true);

  // Проверяем роль пользователя при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Запрашиваем данные пользователя
    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setRole(null);
        } else {
          setRole(data.role);
        }
        setLoading(false);
      })
      .catch(() => {
        setRole(null);
        setLoading(false);
      });
  }, []);

  // Отображаем загрузку, пока данные не получены
  if (loading) {
    return <div>Loading...</div>;
  }

  // Перенаправляем на главную, если нет токена
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // Перенаправляем на страницу 404, если пользователь не админ
  if (role !== 'admin') {
    return <Navigate to="/not-found" replace />;
  }

  // Рендерим дочерние маршруты, если пользователь админ
  return <Outlet />;
};

export default RequireAdmin;