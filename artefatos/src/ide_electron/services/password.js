const Password = require('../models/Password.js')

class Password {
    static async create(body) {
        try {
            const bodyReturn = await Password.create(body)

            return {
                response: bodyReturn,
                message: 'Senha criada com sucesso!'
            }
        } 
        catch(e) {
            return {
                response: e,
                message: 'Erro ao criar senha'
            }
        }
    }

    static async read(id) {
        try {

            const bodyReturn = await Password.findByPk(id)

            return {
                response: bodyReturn,
                message: 'Senha retornada com sucesso !'
            }

        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao pegar a senha'
            }
        }
    }

    static async readTherapistPassword(id) {
        try {

            const bodyReturn = await Password.findOne({
                where: {
                    TherapistId: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Senha retornada com sucesso !'
            }

        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao pegar a senha'
            }
        }
    }

    static async update(id, body) {
        try {

            const bodyReturn = await Password.update(body, {
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Senha atualiza com sucesso !'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Falha para atualizar a senha'
            }
        }
    }

    static async delete(id) {
        try {

            const bodyReturn = await Password.destroy({
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Senha deletada com sucesso !'
            }

        }
        catch(e) {
            return {
                response: e,
                message: 'Falha para deletar a senha'
            }
        }
    } 
}

module.exports = Password