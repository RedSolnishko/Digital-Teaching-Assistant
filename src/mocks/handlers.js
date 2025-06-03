import { http, HttpResponse } from 'msw';

// In-memory storage
let users = [
  {
    id: 1,
    email: '123@123.com',
    password: '123',
    lastName: 'Admin',
    firstName: 'User',
    middleName: '',
    name: 'Admin User',
    role: 'admin',
    photo: '',
    completedTasks: [1],
  },
  {
    id: 2,
    email: 'user@example.com',
    password: '123',
    lastName: 'Иванов',
    firstName: 'Иван',
    middleName: 'Иванович',
    name: 'Иванов Иван Иванович',
    role: 'user',
    photo: '',
    completedTasks: [2, 3],
  },
  ...Array.from({ length: 28 }, (_, i) => ({
    id: i + 3,
    email: `user${i + 3}@example.com`,
    password: '123',
    lastName: `Фамилия${i + 3}`,
    firstName: `Имя${i + 3}`,
    middleName: `Отчество${i + 3}`,
    name: `Пользователь ${i + 3}`,
    role: i % 5 === 0 ? 'admin' : 'user',
    photo: null,
    completedTasks: i % 2 === 0 ? [1, 2] : [],
  })),
];

let teachers = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  lastName: `Преподаватель${i + 1}`,
  firstName: `Имя${i + 1}`,
  middleName: `Отчество${i + 1}`,
  department: i % 2 === 0 ? 'Математика' : 'Информатика',
  description: `Описание преподавателя ${i + 1}. Специализируется в области ${i % 2 === 0 ? 'математики' : 'информатики'}.`,
  topics: [1, 2, 3],
  photo: null,
}));

let topics = [
  {
    id: 1,
    title: 'Тема 1: Уравнения',
    template: 'Решите уравнение: {equation}',
    parameters: { difficulty: 'medium', questions: 5 },
    teacherId: 1,
  },
  {
    id: 2,
    title: 'Тема 2: Программирование',
    template: 'Напишите программу: {task}',
    parameters: { difficulty: 'hard', questions: 3 },
    teacherId: 1,
  },
  {
    id: 3,
    title: 'Тема 3: Теоремы',
    template: 'Докажите: {theorem}',
    parameters: { difficulty: 'easy', limit: 2 },
    teacherId: 1,
  },
];

const tasks = [
  { id: 1, title: 'Задание 1' },
  { id: 2, title: 'Задание 2' },
  { id: 3, title: 'Задание 3' },
];

const departments = ['Математика', 'Информатика', 'Физика'];

// Store generated tasks and correct answers
let generatedTasks = {};
const correctAnswers = {
  1: 'x = 2, x = -2', // For x^2 - 4 = 0
  2: 'print("Hello, World!")', // For print Hello World
  3: 'By Pythagorean theorem, a^2 + b^2 = c^2', // For Pythagorean theorem
};

// Helper function to check if user is admin
const isAdmin = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));
  const user = users.find((u) => u.id === userId);
  return user?.role === 'admin';
};

export const handlers = [
  // POST /api/login - Authenticate user and return token
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      return HttpResponse.json(
        {
          token: `fake-token-${user.id}`,
          user_id: user.id,
          role: user.role,
        },
        { status: 200 }
      );
    }
    return HttpResponse.json({ message: 'Неверные данные' }, { status: 401 });
  }),

  // GET /api/users/me - Get current user
  http.get('/api/users/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));
    const user = users.find((u) => u.id === userId);
    if (user) {
      return HttpResponse.json(user, { status: 200 });
    }
    return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
  }),

  // GET /api/users - List all users (admin only)
  http.get('/api/users', ({ request }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    return HttpResponse.json(users, { status: 200 });
  }),

  // GET /api/users/:id - Get specific user (admin only)
  http.get('/api/users/:id', ({ request, params }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const user = users.find((u) => u.id === parseInt(params.id));
    if (user) {
      return HttpResponse.json(user, { status: 200 });
    }
    return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
  }),

  // POST /api/users - Create new user (admin only)
  http.post('/api/users', async ({ request }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const newUser = await request.json();
    const id = users.length + 1;
    const user = { ...newUser, id, completedTasks: [] };
    users.push(user);
    return HttpResponse.json(user, { status: 201 });
  }),

  // PUT /api/users/:id - Update user (admin or self)
  http.put('/api/users/:id', async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));
    const targetId = parseInt(params.id);
    const isSelf = userId === targetId;
    if (!isAdmin(request) && !isSelf) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const updatedUser = await request.json();
    const index = users.findIndex((u) => u.id === targetId);
    if (index === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }
    users[index] = { ...users[index], ...updatedUser };
    return HttpResponse.json(users[index], { status: 200 });
  }),

  // POST /api/users/:id/tasks - Add completed task
  http.post('/api/users/:id/tasks', async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));
    const targetId = parseInt(params.id);
    if (userId !== targetId) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const taskId = await request.json();
    const index = users.findIndex((u) => u.id === targetId);
    if (index === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }
    if (users[index].completedTasks.includes(taskId)) {
      return HttpResponse.json({ message: 'Задание уже добавлено' }, { status: 400 });
    }
    users[index].completedTasks.push(taskId);
    return HttpResponse.json(users[index], { status: 200 });
  }),

  // DELETE /api/users/:id/tasks/:taskId - Remove completed task
  http.delete('/api/users/:id/tasks/:taskId', ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));
    const targetId = parseInt(params.id);
    if (userId !== targetId) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const index = users.findIndex((u) => u.id === targetId);
    if (index === -1) {
      return HttpResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }
    users[index].completedTasks = users[index].completedTasks.filter(
      (id) => id !== parseInt(params.taskId)
    );
    return HttpResponse.json(users[index], { status: 200 });
  }),

  // GET /api/teachers - List all teachers
  http.get('/api/teachers', () => {
    return HttpResponse.json(teachers, { status: 200 });
  }),

  // GET /api/teachers/:id - Get specific teacher
  http.get('/api/teachers/:id', ({ params }) => {
    const teacher = teachers.find((t) => t.id === parseInt(params.id));
    if (teacher) {
      return HttpResponse.json(teacher, { status: 200 });
    }
    return HttpResponse.json({ message: 'Преподаватель не найден' }, { status: 404 });
  }),

  // POST /api/teachers - Create new teacher (admin only)
  http.post('/api/teachers', async ({ request }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const newTeacher = await request.json();
    const id = teachers.length + 1;
    const teacher = { ...newTeacher, id, topics: [] };
    teachers.push(teacher);
    return HttpResponse.json(teacher, { status: 201 });
  }),

  // PUT /api/teachers/:id - Update teacher (admin only)
  http.put('/api/teachers/:id', async ({ request, params }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const updatedTeacher = await request.json();
    const index = teachers.findIndex((t) => t.id === parseInt(params.id));
    if (index === -1) {
      return HttpResponse.json({ message: 'Преподаватель не найден' }, { status: 404 });
    }
    teachers[index] = { ...teachers[index], ...updatedTeacher };
    return HttpResponse.json(teachers[index], { status: 200 });
  }),

  // GET /api/topics - List all topics
  http.get('/api/topics', () => {
    return HttpResponse.json(topics, { status: 200 });
  }),

  // GET /api/topics/:id - Get specific topic
  http.get('/api/topics/:id', ({ params }) => {
    const topic = topics.find((t) => t.id === parseInt(params.id));
    if (topic) {
      return HttpResponse.json(topic, { status: 200 });
    }
    return HttpResponse.json({ message: 'Тема не найдена' }, { status: 404 });
  }),

  // POST /api/topics - Create new topic (admin only)
  http.post('/api/topics', async ({ request }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const newTopic = await request.json();
    const id = topics.length + 1;
    const topic = { ...newTopic, id };
    topics.push(topic);
    const teacher = teachers.find((t) => t.id === newTopic.teacherId);
    if (teacher) {
      teacher.topics.push(id);
    }
    return HttpResponse.json(topic, { status: 201 });
  }),

  // PUT /api/topics/:id - Update topic (admin only)
  http.put('/api/topics/:id', async ({ request, params }) => {
    if (!isAdmin(request)) {
      return HttpResponse.json({ message: 'Доступ запрещен' }, { status: 403 });
    }
    const updatedTopic = await request.json();
    const index = topics.findIndex((t) => t.id === parseInt(params.id));
    if (index === -1) {
      return HttpResponse.json({ message: 'Тема не найдена' }, { status: 404 });
    }
    topics[index] = { ...topics[index], ...updatedTopic };
    return HttpResponse.json(topics[index], { status: 200 });
  }),

  // GET /api/tasks - List all tasks
  http.get('/api/tasks', () => {
    return HttpResponse.json(tasks, { status: 200 });
  }),

  // GET /api/topics/:id/task - Generate or retrieve task
  http.get('/api/topics/:id/task', ({ request, params }) => {
    const topicId = parseInt(params.id);
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) {
      return HttpResponse.json({ message: 'Тема не найдена' }, { status: 404 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));

    const taskKey = `${userId}-${topicId}`;
    if (!generatedTasks[taskKey]) {
      // Mock ML model: generate task based on topic template
      let content = '';
      switch (topicId) {
        case 1:
          content = 'Решите уравнение: x^2 - 4 = 0';
          break;
        case 2:
          content = 'Напишите программу на Python, которая выводит "Hello, World!"';
          break;
        case 3:
          content = 'Докажите теорему Пифагора';
          break;
        default:
          content = 'Неизвестное задание';
      }
      generatedTasks[taskKey] = {
        id: topicId,
        title: topic.title,
        content,
        teacherId: topic.teacherId,
      };
    }

    return HttpResponse.json(generatedTasks[taskKey], { status: 200 });
  }),

  // POST /api/topics/:id/submit - Submit answer
  http.post('/api/topics/:id/submit', async ({ request, params }) => {
    const topicId = parseInt(params.id);
    const { answer } = await request.json();
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) {
      return HttpResponse.json({ message: 'Тема не найдена' }, { status: 404 });
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return HttpResponse.json({ message: 'Требуется авторизация' }, { status: 401 });
    }
    const userId = parseInt(authHeader.replace('Bearer fake-token-', ''));

    // Mock ML model: check answer
    const correctAnswer = correctAnswers[topicId];
    const isCorrect = answer.trim() === correctAnswer;

    return HttpResponse.json({ isCorrect }, { status: 200 });
  }),

  // GET /api/departments - List departments
  http.get('/api/departments', () => {
    return HttpResponse.json(departments, { status: 200 });
  }),
];