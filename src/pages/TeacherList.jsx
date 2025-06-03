import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationMenu from '../components/Pagination';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { getTeachers } from '../utils/api';

/**
 * Компонент списка преподавателей.
 * Отображает карточки преподавателей с пагинацией.
 */
const TeacherList = () => {
  // Состояния для хранения списка преподавателей и текущей страницы
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 6; // Количество преподавателей на странице
  const navigate = useNavigate();

  // Загружаем список преподавателей при монтировании
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  // Вычисляем индексы для текущей страницы
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  /**
   * Обработчик смены страницы.
   * @param {number} pageNumber - Номер новой страницы.
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="teacher-list">
      {/* Заголовок списка */}
      <h2 className="teacher-list__title text-h2">Преподаватели</h2>
      <div className="teacher-list__cards">
        {/* Карточки преподавателей */}
        {currentTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="teacher-list__card"
            onClick={() => navigate(`/teachers/${teacher.id}/details`)}
          >
            {/* Фото преподавателя */}
            <ImagePlaceholder
              variant="profile"
              img={teacher.photo}
              className="teacher-list__photo"
            />
            {/* ФИО преподавателя */}
            <h3 className="teacher-list__name">{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</h3>
            {/* Кафедра */}
            <p className="teacher-list__department">{teacher.department}</p>
            {/* Количество заданий */}
            <p className="teacher-list__topics">Заданий: {teacher.topics?.length || 0}</p>
          </div>
        ))}
      </div>
      {/* Пагинация */}
      <PaginationMenu
        totalItems={teachers.length}
        itemsPerPage={teachersPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="user-profile__btn-group">
        {/* Кнопка возврата к профилю */}
        <Button
          variant="secondary"
          onClick={() => navigate('/profile')}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default TeacherList;
