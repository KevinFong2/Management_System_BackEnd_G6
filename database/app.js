const express = require('express');
const Employees = require('./models/Employees');
const Tasks = require('./models/Tasks');

const app = express();

app.get('/employees', async (req, res) => {
    try {
      const employees = await Employees.findAll();
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}); 

app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Tasks.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
