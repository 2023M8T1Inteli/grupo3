const {Model, DataTypes} = require('sequelize')
const {sequelize} = require('../config/database.js')
const Sequelize = require('sequelize')

const Teste = sequelize.define('Teste', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }, 
    nome: {
        type: DataTypes.STRING(16),
        allowNull: true
    }}
)

module.exports = Teste