const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')
const Therapist = require('./Therapist.js')

const Password = sequelize.define('Password', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
})

Therapist.hasOne(Password)
Password.belongsTo(Therapist)

module.exports = Password