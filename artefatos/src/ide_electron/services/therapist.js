const Sequelize = require('sequelize')
const sequelize = require('../config/database.js')
const Therapist = require('../models/Therapist.js')

class CrudTherapist {
    static async create(body) {
        try {
            const bodyReturn = await Therapist.create(body)

            return {
                response: bodyReturn,
                message: 'Cadastro criado com sucesso!'
            }
        } 
        catch(e) {

            return {
                response: e,
                message: 'Houve erro no cadastramento!'
            }

        }
    }

    static async read(id) {

        try {
            const bodyReturn = await Therapist.findByPk(id)
            return {
                response: bodyReturn,
                message: 'Retornado com sucesso!'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve um erro ao tentar ler o ID'
            }

        }

    }

    static async update(id, body) {
        try {
            const bodyReturn = await Therapist.update(body, {
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Perfil atualizado com sucesso!'
            }
        }
        catch(e) {
            return {
                response: e, 
                message: 'Houve um erro durante a atualização!'
            }
        }
    }

    static async delete(id) {
        try {
            const bodyReturn = await Therapist.destroy({
                where: {
                  id: id
                }
              })

            return {
                response: bodyReturn,
                message: 'Deletado com sucesso !'
            }
        } 
        catch(e) {
            return {
                response: e,
                message: 'Houve problemas internos'
            }
        }
    }

} 

module.exports = CrudTherapist