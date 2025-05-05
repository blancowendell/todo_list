const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, userId, description, assignType } = req.body; 
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const todo = await Todo.create({ title, userId, description, assignType });

    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;

    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (title !== undefined) {
      todo.title = title;
    }

    if (completed !== undefined) {
      const isCompleted = completed === true || completed === 1 || completed === 'true';

      todo.completed = isCompleted;

      if (isCompleted) {
        todo.assignStatus = 'completed';
        todo.assignComplete = new Date();
      }
    }

    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    await todo.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

module.exports = router;
