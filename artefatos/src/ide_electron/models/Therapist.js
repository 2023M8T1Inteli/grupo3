// Importing required modules
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Defining the Therapist model
const Therapist = sequelize.define('Therapist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    codigo: {
        type: DataTypes.STRING(6),
        allowNull: true,
        unique: false
    },
    file_name_image: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
    }
}, {
    timestamps: false
});

// Exporting the Therapist model
module.exports = Therapist;