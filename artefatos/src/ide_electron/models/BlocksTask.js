const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.js')
const Task = require('./Task.js')

const BlocksTask = sequelize.define('BlocksTask', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    block: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timing: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Task.hasMany(BlocksTask)
BlocksTask.belongsTo(Task)

module.exports = BlocksTask