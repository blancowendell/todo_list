import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../services/todoService';
import { fetchUsers } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import TodoList from '../components/TodoList';
import TodoDrawer from '../components/TodoDrawer';
import InputField from '../components/Forms/Input';
import Dropdown from '../components/Forms/Dropdown';
import InputTextArea from '../components/Forms/TextArea';

import {
  showErrorToast,
  showSuccessToast,
  showWarningToast
} from '../components/Alerts/Toast';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignType, setAssignType] = useState('');
  const [userId, setUserId] = useState(null);

  const [runTour, setRunTour] = useState(false);

  const navigate = useNavigate();

  const headers = [
    { name: 'Title', key: 'title' },
    { name: 'Description', key: 'description' },
    { name: 'Completed', key: 'completed' },
    { name: 'Assigned User', key: 'userId' },
    { name: 'Assign Date', key: 'assignDate' },
    { name: 'Task Status', key: 'assignStatus' },
    { name: 'Task Level', key: 'assignType' },
    { name: 'Created At', key: 'createdAt' },
    { name: 'Complete At', key: 'assignComplete' },
    { name: 'Actions', key: 'actions' },
  ];

  useEffect(() => {
    loadTodos();
    loadUsers();
  }, []);

  const loadTodos = async () => {
    try {
      const res = await fetchTodos();
      setTodos(res.data);
      console.log(res.data);
      
    } catch {
      navigate('/login');
    }
  };

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
      setUserId(res.data[0]?.userId ?? null);
      setRunTour(true);
    } catch {
      message.error('Failed to load users');
    }
  };

  const handleCreateTodo = async () => {
    if (!title || !userId) {
      showWarningToast('Please enter title and select an employee.');
      return;
    }

    try {
      await createTodo(title, userId, description, assignType);
      showSuccessToast('Todo created!');
      resetForm();
      setDrawerVisible(false);
      loadTodos();
    } catch {
      showErrorToast('Failed to create todo');
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAssignType('');
    setUserId(users[0]?.userId ?? null);
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const userOptions = users.map((user) => ({
    value: user.userId,
    label: user.username,
  }));

  const assignTypeOptions = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'normal', label: 'Regular' },
    { value: 'low', label: 'Low Priority' },
  ];

  const steps = [
    {
      target: '.todo-list-header',
      content: 'This is the Todo List header where you can see all your tasks.',
    },
    {
      target: '.ant-btn-primary',
      content: 'Click here to add a new todo.',
    },
    {
      target: '.todo-toggle-button',
      content: 'Click on the checkbox to mark a task as complete',
    },
    {
      target: '.todo-delete-button',
      content: 'Click here to delete a todo.',
    },
  ];


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Joyride 
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        callback={({ status }) => {
          if (status === 'finished' || status === 'skipped') {
            setRunTour(false);
          }
        }}
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold todo-list-header">Todo List</h1>
        <div className="flex items-center gap-2">
          <Button type="primary" onClick={() => setDrawerVisible(true)}>
            New Todo
          </Button>
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            title="Logout"
          />
        </div>
      </div>

      <TodoList
        headers={headers}
        todos={todos}
        users={users}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      <TodoDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleCreateTodo}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <InputField
              label="Title"
              value={title}
              onChange={setTitle}
              placeholder="Enter todo title"
              className="w-full"
              size="large"
            />

            <Dropdown
              label="Assign To"
              value={userId}
              onChange={setUserId}
              options={userOptions}
              className="w-full"
              size="large"
            />

            <Dropdown
              label="Assign Type"
              value={assignType}
              onChange={setAssignType}
              options={assignTypeOptions}
              className="w-full"
              size="large"
            />
          </div>

          <InputTextArea
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Enter task description"
            className="w-full"
          />
        </div>
      </TodoDrawer>
    </div>
  );
};

export default TodoPage;
