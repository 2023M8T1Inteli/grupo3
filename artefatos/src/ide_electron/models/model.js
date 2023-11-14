const {Model, DataTypes} = require('sequelize')
const database = require('../config/database.js')

export default Teste = data.define('Teste', {
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
