import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../components/TextField';
import SelectField from '../components/SelectField';
import ImagePlaceholder from '../components/ImagePlaceholder';
import Button from '../components/Button';
import Tab from '../components/Tab';
import Alert from '../components/Alert';
import Arrow from '../assets/svg/arrow-right.svg?react';
import Cancel from '../assets/svg/x.svg?react';
import { getCurrentUser, getTasks, updateUser } from '../utils/api';

/**
 * Компонент профиля пользователя
 * Позволяет пользователю просматривать и редактировать свои данные, а также просматривать список выполненных заданий
 */
const UserProfile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Ссылка на input для загрузки изображения

    // Состояние для хранения данных формы
    const [formData, setFormData] = useState({
        id: '',
        photo: '',
        lastName: '',
        firstName: '',
        middleName: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: '',
    });
    // Состояния для хранения заданий, выполненных задач, ошибки и активной вкладки
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('info');

    // Загружаем данные пользователя и задания при монтировании
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        // Проверяем наличие токена, иначе перенаправляем на логин
        const userId = localStorage.getItem('user_id');

        if (!token) {
            navigate('/login');
            return;
        }

        // Если пользователь — админ, перенаправляем на страницу редактирования
        if (role === 'admin') {
            navigate(`/users/${userId}`);
            return;
        }

        const fetchData = async () => {
            try {
                // Загружаем данные текущего пользователя
                const userData = await getCurrentUser();
                setFormData({
                    id: userData.id || '',
                    photo: userData.photo || '',
                    lastName: userData.lastName || '',
                    firstName: userData.firstName || '',
                    middleName: userData.middleName || '',
                    email: userData.email || '',
                    role: userData.role || 'user',
                    password: '',
                    confirmPassword: '',
                });
                setCompletedTasks(userData.completedTasks || []);
                // Загружаем список заданий
                const tasksData = await getTasks();
                setTasks(tasksData);
            } catch (err) {
                setError(err.message);
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    /**
     * Обработчик клика по изображению для вызова input.
     */
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    /**
     * Обработчик загрузки изображения
     * Проверяет тип и размер файла, преобразует в base64
     */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Пожалуйста, выберите изображение');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Размер изображения не должен превышать 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, photo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    /**
     * Обработчик изменения полей формы
     * @param {string} key - Название поля
     * @param {string} value - Новое значение
     */
const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
};

    /**
     * Проверяет валидность формы
     * @returns {boolean} - True, если форма валидна
     */
    const validateForm = () => {
        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Пароли не совпадают');
            return false;
        }
        if (!formData.email) {
            setError('Email обязателен для заполнения');
            return false;
        }
        return true;
    };

    /**
     * Обработчик отправки формы
     * Обновляет данные пользователя и показывает уведомление
     */
    const handleSubmit = async () => {
        if (!validateForm()) return;

        const userData = {
            email: formData.email,
            photo: formData.photo,
        };
        if (formData.password) {
            userData.password = formData.password;
        }

        try {
            await updateUser(formData.id, userData);
            setError('');
            alert('Профиль успешно обновлён');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="user-profile">
            {/* Заголовок профиля */}
            <h2 className="user-profile__title text-h2">Профиль пользователя</h2>
            {/* Уведомление об ошибке */}
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}
            <div className="user-profile__tabs">
                {/* Вкладка основных данных */}
                <Tab
                    label="Основные данные"
                    active={activeTab === 'info'}
                    onClick={() => setActiveTab('info')}
                />
                {/* Вкладка пройденных заданий */}
                <Tab
                    label="Пройденные задания"
                    active={activeTab === 'tasks'}
                    onClick={() => setActiveTab('tasks')}
                />
            </div>
            {activeTab === 'info' && (
                <div className="user-profile__form">
                    <div className="user-profile__form-columns">
                        <div className="user-profile__form-column">
                            {/* Загрузка фото */}
                            <div className="user-profile__photo-wrapper" onClick={handleImageClick}>
                                <ImagePlaceholder
                                    variant="profile"
                                    img={formData.photo}
                                    className="user-profile__photo"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                            </div>
                            {/* Поля формы (не редактируемые) */}
                            <TextField
                                label="Фамилия"
                                value={formData.lastName}
                                disabled
                            />
                            <TextField
                                label="Имя"
                                value={formData.firstName}
                                disabled
                            />
                            <TextField
                                label="Отчество"
                                value={formData.middleName}
                                disabled
                            />
                        </div>
                        <div className="user-profile__form-column">
                            <TextField
                                label="ID"
                                value={formData.id}
                                disabled
                            />
                            <SelectField
                                label="Роль"
                                value={formData.role}
                                options={[
                                    { id: 'user', label: 'Пользователь' },
                                    { id: 'admin', label: 'Администратор' },
                                ]}
                                disabled
                            />
                            <TextField
                                label="Email"
                                value={formData.email}
                                onChange={(value) => handleChange('email', value)}
                                type="email"
                                required
                            />
                            <TextField
                                label="Пароль"
                                value={formData.password}
                                onChange={(value) => handleChange('password', value)}
                                type="password"
                            />
                            <TextField
                                label="Подтверждение пароля"
                                value={formData.confirmPassword}
                                onChange={(value) => handleChange('confirmPassword', value)}
                                type="password"
                            />
                            <div className="user-profile__form-placeholder"></div>
                        </div>
                    </div>
                    <div>
                        {/* Кнопка для выбора преподавателя */}
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/teachers')}
                            rightIcon={<Arrow />}
                        >
                            Выбрать преподавателя
                        </Button>
                    </div>
                    <div className="user-profile__btn-group">
                        {/* Кнопка отправки формы */}
                        <Button variant="primary" onClick={handleSubmit} rightIcon={<Arrow />}>
                            Сохранить
                        </Button>
                        {/* Кнопка отмены */}
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/login')}
                            rightIcon={<Cancel />}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            )}
            {activeTab === 'tasks' && (
                <div className="user-profile__tasks">
                    <div className="user-profile__task-list">
                        {/* Список выполненных заданий */}
                        {completedTasks.map((taskId) => {
                            const task = tasks.find((t) => t.id === taskId);
                            return (
                                <div key={taskId} className="user-profile__task-item">
                                    <span>{task?.title || 'Неизвестное задание'}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;