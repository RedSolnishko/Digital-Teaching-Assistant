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

/**
 * Компонент редактирования или создания преподавателя.
 * Позволяет администратору создавать или редактировать данные преподавателя.
 */
const TeacherEdit = () => {
  // Получаем ID преподавателя из URL
  const { id } = useParams();
  const isEditing = !!id; // Флаг редактирования
  const navigate = useNavigate();
  // Состояния для хранения данных формы, кафедр, тем и ошибок
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

  // Загружаем данные при монтировании
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Загружаем список кафедр
        const departmentsData = await getDepartments();
        setDepartments(departmentsData);
        if (isEditing) {
          // Загружаем данные преподавателя
          const teacherData = await getTeacherById(id);
          setFormData({
            lastName: teacherData.lastName || '',
            firstName: teacherData.firstName || '',
            middleName: teacherData.middleName || '',
            department: teacherData.department || '',
            description: teacherData.description || '',
          });
          // Загружаем темы преподавателя
          const topicsData = await getTopics();
          setTopics(topicsData.filter((t) => t.teacherId === parseInt(id)));
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);

  /**
   * Обработчик изменения полей формы.
   * @param {string} key - Название поля.
   * @param {string} value - Новое значение.
   */
  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Проверяет валидность формы.
   * @returns {boolean} - True, если форма валидна.
   */
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

  /**
   * Обработчик отправки формы.
   * Создаёт или обновляет преподавателя и перенаправляет.
   */
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
      {/* Заголовок формы */}
      <h2 className="teacher-edit__title text-h2">
        {isEditing ? 'Редактировать преподавателя' : 'Создать преподавателя'}
      </h2>
      {/* Уведомление об ошибке */}
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="teacher-edit__form">
        {/* Поле для фамилии */}
        <TextField
          label="Фамилия"
          value={formData.lastName}
          onChange={(value) => handleChange('lastName', value)}
          required
        />
        {/* Поле для имени */}
        <TextField
          label="Имя"
          value={formData.firstName}
          onChange={(value) => handleChange('firstName', value)}
          required
        />
        {/* Поле для отчества */}
        <TextField
          label="Отчество"
          value={formData.middleName}
          onChange={(value) => handleChange('middleName', value)}
        />
        {/* Выбор кафедры */}
        <SelectField
          value={formData.department}
          onChange={(value) => handleChange('department', value)}
          options={departments.map((dept) => ({ id: dept, label: dept }))}
          required
        />
        {/* Поле для описания */}
        <TextField
          label="Описание"
          value={formData.description}
          onChange={(value) => handleChange('description', value)}
          multiline
          required
        />
        <div className="teacher-edit__btn-group">
          {/* Кнопка отправки формы */}
          <Button variant="primary" onClick={handleSubmit} rightIcon={<Accept />}>
            {isEditing ? 'Сохранить' : 'Создать'}
          </Button>
          {/* Кнопка отмены */}
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
          {/* Список тем преподавателя */}
          <h3 className="teacher-edit__subtitle text-h3">Темы заданий</h3>
          {/* Кнопка создания новой темы */}
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
                {/* Кнопка редактирования темы */}
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
