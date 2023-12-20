// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');
const Patient = require('./Patient.js');
const Task = require('./Task.js');

// Defining the MyTasks model
const MyTasks = sequelize.define('MyTask', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    PatientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

// Defining associations between Patient, Task, and MyTasks
Patient.belongsToMany(Task, { onDelete: 'CASCADE', through: MyTasks, foreignKey: 'PatientId' });
Task.belongsToMany(Patient, { onDelete: 'CASCADE', through: MyTasks, foreignKey: 'TaskId' });

// Exporting the MyTasks model
module.exports = MyTasks;