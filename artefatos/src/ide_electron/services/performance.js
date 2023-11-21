const Performance = require('../models/Performance.js')

class CrudPerformance {

    static async create(body) {
        try {
            const bodyReturn = await Performance.create(body)
            return {
                response: bodyReturn,
                message: 'Desempenho criado com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao criar Desempenho para a tarefa'
            }
        }
    }

    static async read(id) {
        try {
            const bodyReturn = await Performance.findByPk(id)

            return {
                response: bodyReturn,
                message: 'Desempenho retornando com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao ler Desempenho para a tarefa'
            }
        }
    }

    static async readSpecificTask(id) {
        try {
            const bodyReturn = await Performance.findOne({
                where: {
                    MyTaskId: id 
                }
            })

            return {
                response: bodyReturn,
                message: 'Desempenho da tarefa retornando com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao ler Desempenho para a tarefa'
            }
        }
    }

    static async update(id, body) {
        try {
            const bodyReturn = await Performance.update(body, {
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Desempenho atualizado com sucesso !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao atualizar o Desempenho da tarefa'
            }
        }
    }

    static async delete(id) {
        try {
            const bodyReturn = await Performance.destroy({
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Falha ao deletar tarefa !'
            }

        } catch(e) {
            return {
                response: e,
                message: 'Falha ao deletar o Desempenho da tarefa'
            }
        }
    }

}

module.exports = CrudPerformance