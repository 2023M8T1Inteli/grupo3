const BlocksTask = require('../models/BlocksTask.js')

class CrudBlocksTask {

    static async create(body) {
        try {

            const bodyReturn = await BlocksTask.create(body)

            return {
                response: bodyReturn,
                message:'Sequencia criada com sucesso !'
            }
        } catch(e) {
            return {
                response: e,
                message: 'Falha ao criar sequencia de blocos'
            }
        }
    }

    static async read(id) {
        try {

            const bodyReturn = await BlocksTask.findByPk(id)

            return {

                response: bodyReturn,
                message: 'Bloco retornado com sucesso !'
            }
        } catch(e) {
            return {
                response: e,
                message: 'Falha ao retornar bloco '
            }
        }
    }

    static async readTaskBlocks(id) {
        try {

            const bodyReturn = await BlocksTask.findAll({
                where: {
                    TaskId: id
                }
            })

            return {

                response: bodyReturn,
                message: 'Sequencia retornada com sucesso !'
            }
        } catch(e) {
            return {
                response: e,
                message: 'Falha ao retornar sequencia '
            }
        }
    }

    static async update(id, body) {
        try {

            const bodyReturn = await BlocksTask.update(body, {
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Sequencia atualizada com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao atualizar sequencia'
            }
        }
    }

    static async delete(id) {
        try {

            const bodyReturn = await BlocksTask.destroy({
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Sequencia deletada com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao deletar sequencia'
            }
        }
    }

}

module.exports = CrudPerformance