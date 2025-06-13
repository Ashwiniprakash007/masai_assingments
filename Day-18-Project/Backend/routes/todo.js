const express = require('express');
const Todo = require('../models/Todo');
const { protect } = require('../middleware/authMiddleware'); 
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const todo = await Todo.create({ title, description, dueDate, status, user: req.userId });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
});

router.get('/', protect, async (req, res) => {
  const filter = { user: req.userId };
  if (req.query.status) filter.status = req.query.status;
  try {
    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found or not authorized' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo', error });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!todo) return res.status(404).json({ message: 'Todo not found or not authorized' });
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
});

module.exports = router;
