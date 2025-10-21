import express from 'express';
import Task from '../models/Task.js'
import mongoose from 'mongoose';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Create Task (Protected)
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: req.user._id, // store which user created it
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get All Tasks (Protected)
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// ✅ Update Task (Protected)
router.put('/:id', protect, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid Task ID' });

  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedTask);
});

// ✅ Delete Task (Protected)
router.delete('/:id', protect, async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: 'Invalid Task ID' });

  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted successfully' });
});

export default router;
