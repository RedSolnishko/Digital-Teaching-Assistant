import React from 'react';
import { Outlet, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="private-layout">
      <header>
        <nav>
          <ul>
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/dashboard">Панель управления</Link></li>
          </ul>
        </nav>
      </header>
      <div className="dashboard-container">
        <aside>
          <ul>
            <li><Link to="/dashboard/profile">Профиль</Link></li>
            <li><Link to="/dashboard/settings">Настройки</Link></li>
            <li><button>Выйти</button></li>
          </ul>
        </aside>
        <main className="container">
          <Outlet />
        </main>
      </div>
      <footer>
        <p>© 2025 Мой React Проект</p>
      </footer>
    </div>
  );
};

export default PrivateLayout;