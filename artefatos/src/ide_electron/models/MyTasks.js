const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');
const Patient = require('./Patient.js');
const Task = require('./Task.js');

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

Patient.belongsToMany(Task, { through: MyTasks, foreignKey: 'PatientId' });
Task.belongsToMany(Patient, { through: MyTasks, foreignKey: 'TaskId' });

module.exports = MyTasks;