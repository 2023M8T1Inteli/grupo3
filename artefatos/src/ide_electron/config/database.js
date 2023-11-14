const Sequelize = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    Storage: 'jdbc:sqlite:C:\Users\Inteli\vamosss'
})

sequelize.sync().then(() => { console.log("Houve conexão com o banco")}).catch(
    (e) => {
        console.log(`Deu erro ${e}`)
    }
)