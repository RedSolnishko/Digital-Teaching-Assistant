import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationMenu from '../components/Pagination';
import Button from '../components/Button';
import ImagePlaceholder from '../components/ImagePlaceholder';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/teachers')
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = teachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="teacher-list">
      <h2 className="teacher-list__title text-h2">Teachers</h2>
      <div className="teacher-list__cards">
        {currentTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="teacher-list__card"
            onClick={() => navigate(`/teachers/${teacher.id}/details`)}
          >
            <ImagePlaceholder
              variant="profile"
              img={teacher.photo}
              className="teacher-list__photo"
            />
            <h3 className="teacher-list__name">{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</h3>
            <p className="teacher-list__department">{teacher.department}</p>
            <p className="teacher-list__topics">Заданий: {teacher.topics.length}</p>
          </div>
        ))}
      </div>
      <PaginationMenu
        totalItems={teachers.length}
        itemsPerPage={teachersPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="user-profile__btn-group">
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