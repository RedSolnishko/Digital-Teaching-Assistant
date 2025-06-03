import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import UserList from './pages/UserList';
import UserEdit from './pages/UserEdit';
import TeacherEdit from './pages/TeacherEdit';
import TopicEdit from './pages/TopicEdit';
import UserProfile from './pages/UserProfile'
import TeacherList from './pages/TeacherList';
import TeacherDetail from './pages/TeacherDetail';
import TaskAnswer from './pages/TaskAnswer';
import NotFound from './layouts/NotFound';
import RequireAdmin from './components/RequireAdmin';

import { setupWorker } from 'msw/browser'; // Updated import for MSW v2
import { handlers } from './mocks/handlers';

import './style/main.scss';

import './style/global/normalize.scss';
import './style/global/reset.scss';
import './style/global/colors.scss';
import './style/global/typography.scss';
import './style/global/base.scss';

import './style/components/button.scss';
import './style/components/alert.scss'
import './style/components/select-field.scss'
import './style/components/text-field.scss'
import './style/components/pagination.scss'
import './style/components/text-content.scss'
import './style/components/tab.scss'
import './style/components/image-placeholder.scss'

import './style/components/user-edit.scss'
import './style/components/user-tasks.scss'
import './style/components/teacher-edit.scss';
import './style/components/topic-edit.scss';
import './style/components/user-profile.scss';
import './style/components/user-list.scss';
import './style/components/teacher-list.scss';
import './style/components/teacher-detail.scss';
import './style/components/task-answer.scss';
import './style/layouts/not-found.scss';

if (process.env.NODE_ENV === 'development') {
  const worker = setupWorker(...handlers);
  worker.start({
  onUnhandledRequest: 'warn', // Выводить предупреждения о необработанных запросах
});
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route element={<RequireAdmin />}>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserEdit />} />
        <Route path="/users/:id" element={<UserEdit />} />
        <Route path="/teachers/new" element={<TeacherEdit />} />
        <Route path="/teachers/:id" element={<TeacherEdit />} />
        <Route path="/topics/new" element={<TopicEdit />} />
        <Route path="/topics/:id" element={<TopicEdit />} />
      </Route>
      <Route path="/teachers" element={<TeacherList />} />
      <Route path="/teachers/:id/details" element={<TeacherDetail />} />
      <Route path="/topics/:id/answer" element={<TaskAnswer />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);