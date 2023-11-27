// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Task = require('./Task.js');

// Defining the Feedback model
const Feedback = sequelize.define('Feedback', {
    // Model attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    sound: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    type_feedback: {
        type: DataTypes.BOOLEAN,
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

// Establishing associations between Task and Feedback
Task.hasMany(Feedback, { onDelete: 'CASCADE', foreignKey: 'TaskId' });
Feedback.belongsTo(Task, { foreignKey: 'TaskId' });

// Exporting the Feedback model for use in other modules
module.exports = Feedback;