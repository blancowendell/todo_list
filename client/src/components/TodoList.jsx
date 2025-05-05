import React from 'react';
import { Table, Switch, Button } from 'antd';
import DeleteConfirmButton from '../components/Buttons/PopconfirmDelete';


const TodoList = ({ todos, headers, users, onToggle, onDelete }) => {
  const getUserName = (userId) => {
    const user = users.find(user => user.userId === userId);
    return user ? user.username : 'Unknown User';
  };

  const getAssignStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return { background: 'yellow', color: 'dark' };
      case 'completed':
        return { background: 'green', color: 'white' };
      case 'in-progress':
        return { background: 'blue', color: 'white' };
      default:
        return { background: 'gray', color: 'dark' };
    }
  };

  const getAssignTypeColor = (type) => {
    switch (type) {
      case 'normal':
        return { background: 'blue', color: 'white' };
      case 'urgent':
        return { background: 'red', color: 'white' };
      case 'low':
        return { background: 'green', color: 'dark' };
      default:
        return { background: 'gray', color: 'dark' };
    }
  };

  const columns = headers.map(header => ({
    title: header.name,
    dataIndex: header.key,
    key: header.key,
    render: (text, record) => {
      if (header.key === 'completed') {
        return (
          <div className="todo-toggle-button">
            <Switch
              checked={record.completed}
              onChange={() => onToggle(record.id, record.completed)}
            />          </div>
        );
      }
      if (header.key === 'userId') {
        return getUserName(record.userId);
      }
      if (header.key === 'actions') {
        return (
          <div className="todo-delete-button">
            <DeleteConfirmButton onConfirm={() => onDelete(record.id)} />
          </div>
        );
      }
      if (header.key === 'assignStatus') {
        const { background, color } = getAssignStatusColor(record.assignStatus);
        return (
          <span
            style={{
              backgroundColor: background,
              color: color === 'dark' ? 'black' : 'white',
              padding: '5px 10px',
              borderRadius: '20px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {record.assignStatus}
          </span>
        );
      }
      if (header.key === 'assignType') {
        const { background, color } = getAssignTypeColor(record.assignType);
        return (
          <span
            style={{
              backgroundColor: background,
              color: color === 'dark' ? 'black' : 'white',
              padding: '5px 10px',
              borderRadius: '20px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {record.assignType}
          </span>
        );
      }
      if (['assignDate', 'createdAt', 'updatedAt', 'assignComplete'].includes(header.key)) {
        return new Date(record[header.key]).toLocaleString();
      }
      return text;
    }
  }));


  return (
    <Table
      dataSource={todos}
      columns={columns}
      rowKey="id"
      pagination={false}
    />
  );
};

export default TodoList;
