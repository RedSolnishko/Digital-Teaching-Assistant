const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.yourserver.com';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Ошибка ${response.status}`);
    }
    return data;
  } catch (error) {
    throw new Error(error.message || 'Не удалось подключиться к серверу');
  }
};

export const login = (credentials) =>
  apiRequest('/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

export const getCurrentUser = () =>
  apiRequest('/api/users/me', { method: 'GET' });

export const getUsers = () =>
  apiRequest('/api/users', { method: 'GET' });

export const getUserById = (id) =>
  apiRequest(`/api/users/${id}`, { method: 'GET' });

export const createUser = (userData) =>
  apiRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

export const updateUser = (id, userData) =>
  apiRequest(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });

export const addUserTask = (id, taskId) =>
  apiRequest(`/api/users/${id}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskId),
  });

export const deleteUserTask = (id, taskId) =>
  apiRequest(`/api/users/${id}/tasks/${taskId}`, {
    method: 'DELETE',
  });

export const getTeachers = () =>
  apiRequest('/api/teachers', { method: 'GET' });

export const getTeacherById = (id) =>
  apiRequest(`/api/teachers/${id}`, { method: 'GET' });

export const createTeacher = (teacherData) =>
  apiRequest('/api/teachers', {
    method: 'POST',
    body: JSON.stringify(teacherData),
  });

export const updateTeacher = (id, teacherData) =>
  apiRequest(`/api/teachers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(teacherData),
  });

export const getTopics = () =>
  apiRequest('/api/topics', { method: 'GET' });

export const getTopicById = (id) =>
  apiRequest(`/api/topics/${id}`, { method: 'GET' });

export const createTopic = (topicData) =>
  apiRequest('/api/topics', {
    method: 'POST',
    body: JSON.stringify(topicData),
  });

export const updateTopic = (id, topicData) =>
  apiRequest(`/api/topics/${id}`, {
    method: 'PUT',
    body: JSON.stringify(topicData),
  });

export const getTasks = () =>
  apiRequest('/api/tasks', { method: 'GET' });

export const getTaskByTopicId = (id) =>
  apiRequest(`/api/topics/${id}/task`, { method: 'GET' });

export const submitTaskAnswer = (id, answer) =>
  apiRequest(`/api/topics/${id}/submit`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  });

export const getDepartments = () =>
  apiRequest('/api/departments', { method: 'GET' });