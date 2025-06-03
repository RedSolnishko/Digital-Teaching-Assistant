import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Accept from '../assets/svg/check.svg?react';
import Cancel from '../assets/svg/x.svg?react';
import Edit from '../assets/svg/edit.svg?react';
import { getDepartments, getTeacherById, getTopics, createTeacher, updateTeacher } from '../utils/api';

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
    const fetchData = async () => {
      try {
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        if (isEditing) {
          const teacherData = await getTeacherById(id);
          setFormData({
            lastName: teacherData.lastName || '',
            firstName: teacherData.firstName || '',
            middleName: teacherData.middleName || '',
            department: teacherData.department || '',
            description: teacherData.description || '',
          });
          const topicsData = await getTopics();
          setTopics(topicsData.filter((t) => t.teacherId === parseInt(id)));
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
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
      if (isEditing) {
        await updateTeacher(id, teacherData);
      } else {
        await createTeacher(teacherData);
      }
      navigate('/users');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="teacher-edit">
      <h2 className="teacher-edit__title text-h2">
        {isEditing ? 'Редактировать преподавателя' : 'Создать преподавателя'}
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
                  Редактировать
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