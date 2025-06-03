import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';
import NotFound from './layouts/NotFound';
import RequireAuth from './components/RequireAuth';

import UIkit from './layouts/UIkit';
import TextContentPage from './layouts/TextContentPage';

import Login from './pages/Login';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import HomePage from './pages/HomePage';

const App = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uikit" element={<UIkit />} />
        <Route path="/text-content" element={<TextContentPage />} />
      </Route>

      {/* Приватные маршруты */}
      <Route element={<RequireAuth><PrivateLayout /></RequireAuth>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
