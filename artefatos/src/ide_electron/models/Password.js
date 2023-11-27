// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Therapist = require('./Therapist.js');

// Defining the Password model
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
    },
    TherapistId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});

// Defining associations between Therapist and Password
Therapist.hasOne(Password, { onDelete: 'CASCADE', foreignKey: 'TherapistId', sourceKey: 'id' });
Password.belongsTo(Therapist, { foreignKey: 'TherapistId', targetKey: 'id' });

// Exporting the Password model
module.exports = Password;