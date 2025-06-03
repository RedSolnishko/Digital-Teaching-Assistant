import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PaginationMenu from '../components/Pagination';
import Tab from '../components/Tab';
import Exit from '../assets/svg/door-exit.svg?react';
import Edit from '../assets/svg/edit.svg?react';
import { getUsers, getTeachers } from '../utils/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageTeachers, setCurrentPageTeachers] = useState(1);
  const [activeTab, setActiveTab] = useState('users');
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        const teachersData = await getTeachers();
        setTeachers(teachersData);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [navigate]);

  const indexOfLastUser = currentPageUsers * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const indexOfLastTeacher = currentPageTeachers * itemsPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - itemsPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const handlePageChangeTeachers = (pageNumber) => {
    setCurrentPageTeachers(pageNumber);
  };

  return (
    <div className="user-list">
      <h2 className="user-list__title text-h2">Список пользователей</h2>
      <div className="user-list__tabs">
        <Tab
          label="Пользователи"
          active={activeTab === 'users'}
          onClick={() => setActiveTab('users')}
        />
        <Tab
          label="Преподаватели"
          active={activeTab === 'teachers'}
          onClick={() => setActiveTab('teachers')}
        />
      </div>
      <div className="user-list__prbtn">
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
                      <td>{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</td>
                      <td>{teacher.department}</td>
                      <td>
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
          <PaginationMenu
            totalItems={teachers.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPageTeachers}
            onPageChange={handlePageChangeTeachers}
          />
        </>
      )}
      <Button variant="primary" onClick={() => navigate('/login')} leftIcon={<Exit />}>
        Выйти
      </Button>
    </div>
  );
};

export default UserList;