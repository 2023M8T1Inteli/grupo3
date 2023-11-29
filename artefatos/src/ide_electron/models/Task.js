// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');

// Defining the Task model
const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    timestamps: false
});

// Exporting the Task model
module.exports = Task;