import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Accept from '../assets/svg/check.svg?react';
import Cancel from '../assets/svg/x.svg?react';
import Edit from '../assets/svg/edit.svg?react';

const TeacherEdit = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    department: '',
    description: '',
  });
  const [departments, setDepartments] = useState([]);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/departments')
      .then((res) => res.json())
      .then((data) => setDepartments(data));
    if (isEditing) {
      fetch(`/api/teachers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setFormData({
              lastName: data.lastName || '',
              firstName: data.firstName || '',
              middleName: data.middleName || '',
              department: data.department || '',
              description: data.description || '',
            });
            fetch('/api/topics')
              .then((res) => res.json())
              .then((topicsData) =>
                setTopics(topicsData.filter((t) => t.teacherId === parseInt(id)))
              );
          }
        });
    }
  }, [id]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.department ||
      !formData.description
    ) {
      setError('Все поля обязательны для заполнения');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const teacherData = {
      lastName: formData.lastName,
      firstName: formData.firstName,
      middleName: formData.middleName,
      department: formData.department,
      description: formData.description,
    };

    try {
      const url = isEditing ? `/api/teachers/${id}` : '/api/teachers';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacherData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Ошибка при сохранении');
        return;
      }
      navigate('/users');
    } catch (err) {
      setError('Не удалось подключиться к серверу');
    }
  };

  return (
    <div className="teacher-edit">
      <h2 className="teacher-edit__title text-h2">
        {isEditing ? 'Edit Teacher' : 'Create Teacher'}
      </h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="teacher-edit__form">
        <TextField
          label="Фамилия"
          value={formData.lastName}
          onChange={(value) => handleChange('lastName', value)}
          required
        />
        <TextField
          label="Имя"
          value={formData.firstName}
          onChange={(value) => handleChange('firstName', value)}
          required
        />
        <TextField
          label="Отчество"
          value={formData.middleName}
          onChange={(value) => handleChange('middleName', value)}
        />
        <SelectField
          value={formData.department}
          onChange={(value) => handleChange('department', value)}
          options={departments.map((dept) => ({ id: dept, label: dept }))}
          required
        />
        <TextField
          label="Описание"
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
          multiline
          required
        />
        <div className="teacher-edit__btn-group">
          <Button variant="primary" onClick={handleSubmit} rightIcon={<Accept />}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/users')}
            rightIcon={<Cancel />}
          >
            Отменить
          </Button>
        </div>
      </div>
      {isEditing && (
        <div className="teacher-edit__topics">
          <h3 className="teacher-edit__subtitle text-h3">Темы заданий</h3>
          <Button
            variant="primary"
            onClick={() => navigate(`/topics/new?teacherId=${id}`)}
            rightIcon={<Edit />}
          >
            Новая тема
          </Button>
          <div className="teacher-edit__topic-list">
            {topics.map((topic) => (
              <div key={topic.id} className="teacher-edit__topic-item">
                <span>{topic.title}</span>
                <Button
                  variant="little"
                  onClick={() => navigate(`/topics/${topic.id}`)}
                >
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherEdit;