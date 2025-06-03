import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Check from '../assets/svg/check.svg?react';
import { getTeacherById, getTopicById, getCurrentUser } from '../utils/api';

/**
 * Компонент детальной информации о преподавателе.
 * Отображает данные преподавателя, список тем и статус их выполнения.
 */
const TeacherDetail = () => {
  // Получаем ID преподавателя из URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Состояния для хранения данных преподавателя, тем и выполненных заданий
  const [teacher, setTeacher] = useState(null);
  const [topics, setTopics] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Загружаем данные при монтировании
  useEffect(() => {
    const token = localStorage.getItem('token');
    // Проверяем наличие токена, иначе перенаправляем на логин
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        // Загружаем данные преподавателя
        const teacherData = await getTeacherById(id);
        setTeacher(teacherData);
        // Загружаем данные тем
        const topicPromises = teacherData.topics.map(async (topicId) => {
          const topicData = await getTopicById(topicId);
          return { id: topicData.id, title: topicData.title };
        });
        const topicsData = await Promise.all(topicPromises);
        setTopics(topicsData);
        // Загружаем выполненные задания пользователя
        const userData = await getCurrentUser();
        setCompletedTasks(userData.completedTasks || []);
      } catch (err) {
        navigate('/');
      }
    };
    fetchData();
  }, [id, navigate]);

  // Отображаем загрузку, пока данные не получены
  if (!teacher) return <div>Загрузка...</div>;

  return (
    <div className="teacher-detail">
      {/* ФИО преподавателя */}
      <h2 className="teacher-detail__title text-h2">{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</h2>
      <div className="teacher-detail__info">
        {/* Фото преподавателя */}
        <ImagePlaceholder
          variant="profile"
          img={teacher.photo}
          className="teacher-detail__photo"
        />
        <div className="teacher-detail__info-text">
          {/* Кафедра */}
          <p><strong>Кафедра:</strong> {teacher.department}</p>
        </div>
      </div>
      <div className="teacher-detail__description">
        {/* Описание преподавателя */}
        <h3 className="teacher-detail__subtitle text-h3">Описание</h3>
        <p>{teacher.description || 'Описание отсутствует'}</p>
      </div>
      <div className="teacher-detail__topics">
        {/* Список доступных заданий */}
        <h3 className="teacher-detail__subtitle text-h3">Доступные задания</h3>
        <ul className="teacher-detail__topic-list">
          {topics.map((topic) => (
            <li key={topic.id} className="teacher-detail__topic-item">
              <span>{topic.title}</span>
              {/* Индикатор выполнения */}
              {completedTasks.includes(topic.id) && (
                <Check className="teacher-detail__completed-icon" />
              )}
              {/* Кнопка для перехода к заданию */}
              <Button
                variant="primary"
                onClick={() => navigate(`/topics/${topic.id}/answer`)}
              >
                Выполнить
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="user-profile__btn-group">
        {/* Кнопка возврата к списку преподавателей */}
        <Button
          variant="secondary"
          onClick={() => navigate('/teachers')}
        >
          Назад
        </Button>
      </div>
    </div>
  );
};

export default TeacherDetail;
