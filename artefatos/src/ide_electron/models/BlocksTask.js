// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');
const Task = require('./Task.js');

// Defining the BlocksTask model
const BlocksTask = sequelize.define('BlocksTask', {
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    block: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timing: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    // Model options
    timestamps: false, // Disabling timestamps for simplicity
});

// Establishing associations between Task and BlocksTask
Task.hasMany(BlocksTask, { onDelete: 'CASCADE', foreignKey: 'TaskId' });
BlocksTask.belongsTo(Task, { foreignKey: 'TaskId' });

// Exporting the BlocksTask model for use in other modules
module.exports = BlocksTask;