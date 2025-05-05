import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li>
    <span
      style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      onClick={() => onToggle(todo.id, todo.completed)}
    >
      {todo.title}
    </span>
    <button onClick={() => onDelete(todo.id)}>❌</button>
  </li>
);

export default TodoItem;
