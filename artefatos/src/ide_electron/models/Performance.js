const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.js')
const MyTasks = require('./MyTasks.js')

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
    }
})

MyTasks.hasOne(Performance)
Performance.belongsTo(MyTasks)

module.exports = Performance