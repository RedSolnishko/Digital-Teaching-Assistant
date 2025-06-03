import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Arrow from '../assets/svg/arrow-right.svg?react';
import Cancel from '../assets/svg/x.svg?react';
import { getTopicById, createTopic, updateTopic } from '../utils/api';

const TopicEdit = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const location = useLocation();
  const teacherId = new URLSearchParams(location.search).get('teacherId');

  const [formData, setFormData] = useState({
    title: '',
    template: '',
    parameters: { difficulty: 'medium', questions: 5 },
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      const fetchData = async () => {
        try {
          const data = await getTopicById(id);
          setFormData({
            title: data.title || '',
            template: data.template || '',
            parameters: data.parameters || { difficulty: 'medium', questions: 5 },
          });
        } catch (err) {
          setError(err.message);
        }
      };
      fetchData();
    }
  }, [id]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleParameterChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      parameters: { ...prev.parameters, [key]: value },
    }));
  };

  const validateForm = () => {
    if (!formData.title || !formData.template) {
      setError('Все поля обязательны для заполнения');
      return false;
    }
    if (formData.parameters.questions < 1) {
      setError('Количество вопросов должно быть больше 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const topicData = {
      title: formData.title,
      template: formData.template,
      parameters: formData.parameters,
      ...(teacherId && !isEditing && { teacherId: parseInt(teacherId) }),
    };

    try {
      if (isEditing) {
        await updateTopic(id, topicData);
      } else {
        await createTopic(topicData);
      }
      navigate('/users');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="topic-edit">
      <h2 className="topic-edit__title text-h2">
        {isEditing ? 'Редактировать тему' : 'Создать тему'}
      </h2>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      <div className="topic-edit__form">
        <TextField
          label="Наименование темы"
          value={formData.title}
          onChange={(value) => handleChange('title', value)}
          required
        />
        <TextField
          label="Шаблон задания"
          value={formData.template}
          onChange={(value) => handleChange('template', value)}
          multiline
          required
        />
        <SelectField
          placeholder="Уровень сложности"
          value={formData.parameters.difficulty}
          onChange={(value) => handleParameterChange('difficulty', value)}
          options={[
            { id: 'easy', label: 'Легкий' },
            { id: 'medium', label: 'Средний' },
            { id: 'hard', label: 'Сложный' },
          ]}
          required
        />
        <TextField
          label="Количество вопросов"
          value={formData.parameters.questions}
          onChange={(value) => handleParameterChange('questions', parseInt(value))}
          type="number"
          required
        />
        <div className="topic-edit__btn-group">
          <Button variant="primary" onClick={handleSubmit} rightIcon={<Arrow />}>
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
    </div>
  );
};

export default TopicEdit;