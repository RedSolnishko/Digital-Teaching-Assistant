import { useState } from 'react';

// Заглушка для хука аутентификации для локальной разработки
export const useAuth = () => {
  const [user, setUser] = useState(null); // null означает, что пользователь не аутентифицирован

  // Имитация входа (в реальном приложении это был бы API-запрос)
  const login = (credentials) => {
    setUser({ id: 1, username: 'demo-user' }); // Моковые данные пользователя
  };

  // Имитация выхода
  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};