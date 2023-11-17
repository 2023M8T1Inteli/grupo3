const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'banco',
});

async function testarConexao() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

testarConexao()

module.exports = {sequelize, testarConexao}