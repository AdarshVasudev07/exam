const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017//taskmanager')
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.log(' Connection error:', err));

// Task model
const Task = mongoose.model('Task', {
  title: String,
  description: String
});

// Routes
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).send(task);
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

// Start server
app.listen(5000, () => console.log(' Server running at http://localhost:5000'));
