import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PaginationMenu from '../components/Pagination';
import Tab from '../components/Tab';
import Exit from '../assets/svg/door-exit.svg?react';
import Edit from '../assets/svg/edit.svg?react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState(1);
  const [currentPageTeachers, setCurrentPageTeachers] = useState(1);
  const [activeTab, setActiveTab] = useState('users');
  const usersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, [navigate]);

  const indexOfLastUser = currentPageUsers * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const indexOfLastTeacher = currentPageTeachers * usersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - usersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const handlePageChangeUsers = (pageNumber) => {
    setCurrentPageUsers(pageNumber);
  };

  const handlePageChangeTeachers = (pageNumber) => {
    setCurrentPageTeachers(pageNumber);
  };

  return (
    <div className="user-list">
      <h2 className="user-list__title text-h2">User List</h2>
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
          My Profile
        </Button>
      </div>

      {activeTab === 'users' && (
        <>
          <Button
            variant="primary"
            rightIcon={<Edit />}
            onClick={() => navigate('/users/new')}
          >
            New User
          </Button>
          <div className="text-content user-list__table">
            <figure className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.email}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>
                        <Button
                          variant="little"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          Edit
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
            itemsPerPage={usersPerPage}
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
            New Teacher
          </Button>
          <div className="text-content user-list__table">
            <figure className="table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Action</th>
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
                          Edit
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
            itemsPerPage={usersPerPage}
            currentPage={currentPageTeachers}
            onPageChange={handlePageChangeTeachers}
          />
        </>
      )}
      <Button variant="primary" onClick={() => navigate('/')} leftIcon={<Exit />}>
        Logout
      </Button>
    </div>
  );
};

export default UserList;