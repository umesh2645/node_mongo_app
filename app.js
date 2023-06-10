require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.NODE_DOCKER_PORT || 80;
const mongoURI = `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;
console.log('mongoURI-> ', mongoURI);

// Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model('Task', taskSchema);

// Seed data into MongoDB
async function seedData() {
  try {
    const count = await Task.countDocuments();
    if (count === 0) {
      const tasks = [
        { title: 'Task 1', description: 'Description for Task 1' },
        { title: 'Task 2', description: 'Description for Task 2' },
        { title: 'Task 3', description: 'Description for Task 3' },
      ];
      await Task.insertMany(tasks);
      console.log('Data seeded successfully');
    }
    else {
      console.log('Data allready in db');
    }
  } catch (err) {
    console.error('Failed to seed data', err);
  }
}

seedData();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Retrieve tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error('Failed to retrieve tasks', err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    console.log(req.body);
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error('Failed to create task', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
