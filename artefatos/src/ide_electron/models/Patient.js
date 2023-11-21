const {DataTypes} = require('sequelize')
const {sequelize} = require('../config/database')
const Therapist = require('./Therapist.js')

const Patient = sequelize.define('Patient',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    degree: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_consultation: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    last_consultation: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    interests: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    background: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

Therapist.hasMany(Patient)
Patient.belongsTo(Therapist)

module.exports = Patient