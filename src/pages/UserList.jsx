import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PaginationMenu from '../components/Pagination';
import Tab from '../components/Tab';
import Exit from '../assets/svg/door-exit.svg?react';
import Edit from '../assets/svg/edit.svg?react';
import { getUsers, getTeachers } from '../utils/api';

/**
 * Компонент списка пользователей и преподавателей.
 * Отображает таблицы с пагинацией для управления пользователями и преподавателями (для админов).
 */
const UserList = () => {
  // Состояния для хранения данных пользователей, преподавателей и пагинации
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageTeachers, setCurrentPageTeachers] = useState(1);
  const [activeTab, setActiveTab] = useState('users');
  const itemsPerPage = 5; // Элементов на странице
  const navigate = useNavigate();

  // Загружаем данные при монтировании
  useEffect(() => {
    const role = localStorage.getItem('role');
    // Проверяем, что пользователь — админ, иначе перенаправляем
    if (role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Загружаем пользователей
        const usersData = await getUsers();
        setUsers(usersData);
        // Загружаем преподавателей
        const teachersData = await getTeachers();
        setTeachers(teachersData);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [navigate]);

  // Вычисляем индексы для пагинации пользователей
  const indexOfLastUser = currentPageUsers * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Вычисляем индексы для пагинации преподавателей
  const indexOfLastTeacher = currentPageTeachers * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  /**
   * Обработчик смены страницы для пользователей.
   * @param {number} pageNumber - Номер новой страницы.
   */
  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  /**
   * Обработчик смены страницы для преподавателей.
   * @param {number} pageNumber - Номер новой страницы.
   */
  const handlePageChangeTeachers = (pageNumber) => {
    setCurrentPageTeachers(pageNumber);
  };

  return (
    <div className="user-list">
      {/* Заголовок страницы */}
      <h2 className="user-list__title text-h2">Список пользователей</h2>
      <div className="user-list__tabs">
        {/* Вкладка пользователей */}
        <Tab
          label="Пользователи"
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        />
        {/* Вкладка преподавателей */}
        <Tab
          label="Преподаватели"
          active={activeTab === 'teachers'}
          onClick={() => setActiveTab('teachers')}
        />
      </div>
      <div className="user-list__prbtn">
        {/* Кнопка перехода к профилю */}
        <Button
          variant="primary"
          rightIcon={<Edit />}
          onClick={() => navigate(`/users/${localStorage.getItem('user_id')}`)}
        >
          Мой профиль
        </Button>
      </div>
      {activeTab === 'users' && (
        <>
          {/* Кнопка создания пользователя */}
          <Button
            variant="primary"
            rightIcon={<Edit />}
            onClick={() => navigate('/users/new')}
          >
            Создать пользователя
          </Button>
          <div className="text-content user-list__table">
            <figure className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</td>
                      <td>
                        {/* Кнопка редактирования пользователя */}
                        <Button
                          variant="little"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          Редактировать
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
          {/* Пагинация для пользователей */}
          <PaginationMenu
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPageUsers}
            onPageChange={handlePageChangeUsers}
          />
        </>
      )}
      {activeTab === 'teachers' && (
        <>
          {/* Кнопка создания преподавателя */}
          <Button
            variant="primary"
            rightIcon={<Edit />}
            onClick={() => navigate('/teachers/new')}
          >
            Создать преподавателя
          </Button>
          <div className="text-content user-list__table">
            <figure className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Кафедра</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeachers.map((teacher) => (
                    <tr key={teacher.id}>
                      <td>{teacher.id}</td>
                      <td>{`${teacher.lastName || 'Не указано'} ${teacher.firstName || ''} ${teacher.lastName || ''}`}</td>
                      <td>{teacher.department}</td>
                      <td>
                        {/* Кнопка редактирования преподавателя */}
                        <Button
                          variant="little"
                          onClick={() => navigate(`/teachers/${teacher.id}`)}
                        >
                          Редактировать
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </div>
          {/* Пагинация для преподавателей */}
          <PaginationMenu
            totalItems={teachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPageTeachers}
            onPageChange={handlePageChangeTeachers}
          />
        </>
      )}
      {/* Кнопка выхода */}
      <Button variant="primary" onClick={() => navigate('/login')} leftIcon={<Exit />}>
        Выйти
      </Button>
    </div>
  );
};

export default UserList;