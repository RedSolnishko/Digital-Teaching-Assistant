import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import NotFound from './layouts/NotFound';
import UIkit from './layouts/UIkit'; 
import TextContentPage from './layouts/TextContentPage';

// Демонстрационные компоненты страниц
const HomePage = () => <div>Главная страница</div>;
const LoginPage = () => <div>Страница входа</div>;
const DashboardPage = () => <div>Панель управления</div>;
const ProfilePage = () => <div>Профиль пользователя</div>;
const SettingsPage = () => <div>Настройки пользователя</div>;


const App = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/uikit" element={<UIkit />} />
        <Route path='/text-content' element={<TextContentPage/>}/>
      </Route>

      {/* Приватные маршруты */}
      <Route element={<PrivateLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>

      {/* Маршрут для обработки несуществующих путей */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
