import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Check from '../assets/svg/check.svg?react';


const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [topics, setTopics] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    fetch(`/api/teachers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          navigate('/');
        } else {
          setTeacher(data);
          // Fetch topic details for each topicId
          Promise.all(
            data.topics.map((topicId) =>
              fetch(`/api/topics/${topicId}`)
                .then((res) => res.json())
                .then((topicData) => ({
                  id: topicData.id,
                  title: topicData.title,
                }))
            )
          ).then((topicData) => setTopics(topicData));
        }
      });

    fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message) {
          setCompletedTasks(data.completedTasks || []);
        }
      });
  }, [id, navigate]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="teacher-detail">
      <h2 className="teacher-detail__title text-h2">{`${teacher.lastName} ${teacher.firstName} ${teacher.middleName}`}</h2>
      <div className="teacher-detail__info">
        <ImagePlaceholder
          variant="profile"
          img={teacher.photo}
          className="teacher-detail__photo"
        />
        <div className="teacher-detail__info-text">
          <p><strong>Кафедра:</strong> {teacher.department}</p>
        </div>
      </div>
      <div className="teacher-detail__description">
        <h3 className="teacher-detail__subtitle text-h3">Описание</h3>
        <p>{teacher.description || 'Описание отсутствует'}</p>
      </div>
      <div className="teacher-detail__topics">
        <h3 className="teacher-detail__subtitle text-h3">Доступные задания</h3>
        <ul className="teacher-detail__topic-list">
          {topics.map((topic) => (
            <li key={topic.id} className="teacher-detail__topic-item">
              <span>{topic.title}</span>
              {completedTasks.includes(topic.id) && (
                <Check className="teacher-detail__completed-icon" />
              )}
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