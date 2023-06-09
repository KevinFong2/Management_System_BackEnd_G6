const { DataTypes } = require('sequelize');
const sequelize = require('../db/index');
const Employee = require('./Employees');

const Task = sequelize.define('Task', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  employeeId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

Task.belongsTo(Employee, { as: 'assignedTo', foreignKey: 'employeeId' });
Employee.hasMany(Task, { as: 'tasks', foreignKey: 'employeeId' });


module.exports = Task;