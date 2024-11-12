const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve the frontend (static files)
app.use(express.static(path.join(__dirname)));

// In-memory storage for tasks
let tasks = [];

// Route to serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    const newTask = { id: tasks.length + 1, task, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } else {
    res.status(400).json({ error: 'Task content is required' });
  }
});

// Route to mark a task as completed
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = true;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Route to delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





  