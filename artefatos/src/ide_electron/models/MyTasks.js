const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.js')
const Patient = require('./Patient.js')
const Task = require('./Task.js')

const MyTasks = sequelize.define('MyTask', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

Patient.belongsToMany(Task, {through: MyTasks})
Task.belongsToMany(Patient, {through: MyTasks})

module.exports = MyTasks