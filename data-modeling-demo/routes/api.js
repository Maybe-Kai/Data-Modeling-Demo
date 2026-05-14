const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Task = require('../models/Task');

// Create User + Task
router.post('/create', async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email
    });

    await user.save();

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      userId: user._id
    });

    await task.save();

    res.json({ user, task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get all tasks
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Get tasks with user details
router.get('/tasks-with-users', async (req, res) => {
  const tasks = await Task.find().populate('userId');
  res.json(tasks);
});