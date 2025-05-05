const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId',
    },
    onDelete: 'CASCADE',
  },

  assignDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  assignType: {
    type: DataTypes.ENUM('urgent', 'normal', 'low'),
    //defaultValue: 'normal',
  },
  assignComplete: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  assignStatus: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'pending',
  },

}, {
  tableName: 'Todos',
});

module.exports = Todo;
