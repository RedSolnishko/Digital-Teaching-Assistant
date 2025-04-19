import React from 'react';
import { Outlet, Link } from 'react-router-dom';
const PublicLayout = () => {
  return (
    <div className="public-layout">
      <header>
        <nav>
          <ul>
            <li className='text-h3'><Link to="/">Главная</Link></li>
            <li className='text-h3'><Link to="/login">Вход</Link></li>
            <li className='text-h3'><Link to="/uikit">UIKit</Link></li>
            <li className='text-h3'><Link to="/text-content">Текстовый контент</Link></li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2025 Мой React Проект</p>
      </footer>
    </div>
  );
};

export default PublicLayout;