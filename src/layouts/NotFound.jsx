import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1 className='text-h1'>404 - Страница не найдена</h1>
      <p>Извините, такой страницы не существует.</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;