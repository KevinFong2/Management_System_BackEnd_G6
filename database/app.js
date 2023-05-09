const express = require('express');
const Employees = require('./models/Employees');
const Tasks = require('./models/Tasks');

const app = express();
app.use(express.json());

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

//find single employee based on their id
app.put('/employees/:id', async (req, res) => {
    try {
      const employee = await Employees.findOne({ where: { id: req.params.id } });
      
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
  
      // Update the employee record with the new data
      const updatedEmployee = await employee.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
      });
  
      return res.status(200).json(updatedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//find single task based on their id
app.get('/tasks/:id', async (req, res) => {
    try {
      const task = await Tasks.findOne({
        where: { id: req.params.id },
        include: [{
          model: Employees,
          as: 'assignedTo'
        }]
      });
  
      if (!task) {
        return res.status(404).send('Task not found');
      }
  
      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//edit employee
app.put('/employees/:id', async (req, res) => {
    try {
      const employee = await Employees.findOne({ where: { id: req.params.id } });
      
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
  
      const editedEmployee = await employee.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
      });
  
      return res.status(200).json(editedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

//edit task
app.put('/tasks/:id', async (req, res) => {
    try {
      const task = await Tasks.findOne({ where: { id: req.params.id } });
  
      if (!task) {
        return res.status(404).send('Task not found');
      }
  
      // Update the task record with the new data
      const editedTask = await task.update({
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        employeeId: req.body.employeeId
      });
  
      return res.status(200).json(editedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});