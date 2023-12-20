// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database.js');
const MyTasks = require('./MyTasks.js');

// Defining the Performance model
const Performance = sequelize.define('Performance', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    hits: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mistakes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    consultation_data: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    MyTasksId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    timestamps: false
});

// Defining associations between MyTasks and Performance
MyTasks.hasOne(Performance, { onDelete: 'CASCADE', foreignKey: 'MyTasksId', sourceKey: 'id' });
Performance.belongsTo(MyTasks, { foreignKey: 'MyTasksId', targetKey: 'id' });

// Exporting the Performance model
module.exports = Performance;