const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')
const Task = require('./Task.js')

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    sound: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    type_feedback: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false
})

Task.hasMany(Feedback) // dois feedbacks por tarefa
Feedback.belongsTo(Task)

module.exports = Feedback