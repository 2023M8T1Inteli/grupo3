const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.js')

const Task = sequelize.define('Task',{
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
})

module.exports = Task