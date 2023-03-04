const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const todoDB = [
  {
    id: 0,
    task: 'task1',
    isDone: false,
    createdAt: format(new Date(), 'Y-MM-dd'),
  },
  {
    id: 1,
    task: 'Task2',
    isDone: false,
    createdAt: format(new Date(), 'Y-MM-dd'),
  },
];

class TodoDB {
  constructor (arr) {
    this.tasks = [...arr];
  }

  createTask (newTask) {
    this.tasks.push({
      ...newTask,
      id: uuidv4(),
      isDone: false,
      createdAt: format(new Date(), 'Y-MM-dd'),
    });
    return this.tasks[this.tasks.length - 1];
  }

  getTasks () {
    return [...this.tasks];
  }

  getTasksById (id) {
    const foundIndex = this.tasks.findIndex(t => t.id === Number(id));
    return foundIndex === -1 ? null : this.tasks[foundIndex];
  }

  updateTask (id, values) {
    const foundTaskIndex = this.tasks.findIndex(t => t.id === Number(id));
    this.tasks[foundTaskIndex] = {
      ...this.tasks[foundTaskIndex],
      ...values,
    };
    return foundTaskIndex === -1 ? null : this.tasks[foundTaskIndex];
  }

  removeTask (id) {
    const foundTaskIndex = this.tasks.findIndex(t => t.id === Number(id));

    return foundTaskIndex === -1 ? null : this.tasks.splice(foundTaskIndex, 1);
  }
}

const todoTaskDbInstace = new TodoDB(todoDB);

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('todo list');
});

// CRUD
app.get('/tasks', (req, res) => {
  const task = todoTaskDbInstace.getTasks();
  res.status(200).send(task);
});

app.post('/tasks', (req, res) => {
  const createdTask = todoTaskDbInstace.createTask(req.body);
  res.status(201).send(createdTask);
});

app.get('/tasks/1', (req, res) => {});
app.patch('/tasks/1', (req, res) => {});
app.delete('/tasks/1', (req, res) => {});

module.exports = app;
