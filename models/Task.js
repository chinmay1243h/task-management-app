// models/Task.js
import mongoose from 'mongoose';

// Define task schema
const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // reference to User model
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  },
  dueDate: {
    type: Date,
  },
  estimatedTime: {
    type: Number, // in minutes
    default: 0,
  },
  actualTime: {
    type: Number, // in minutes
    default: 0,
  },
  timeStarted: {
    type: Date,
  },
  timeStopped: {
    type: Date,
  },
  isTimerRunning: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Task', taskSchema);
