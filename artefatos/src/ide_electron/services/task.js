const Task = require('../models/Task.js')

class CrudTask {
    static async create(body) {
        try {
            const bodyReturn = await Task.create(body)

            return {
                response: bodyReturn,
                message: 'Tarefa criada com sucesso !'
            }

        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao cadastrar uma nova tarefa'
            }
        }
    }

    static async read(id) {
        try {
            const bodyReturn = await Task.findByPk(id)

            return {
                response: bodyReturn,
                message: 'Tarefa achada com sucesso'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao procurar tarefa'
            }
        }
    }

    static async readAll(id) {
        try {
            const bodyReturn = await Task.findAll()

            return {
                response: bodyReturn,
                message: 'Todas as tarefas criadas'
            }
        }

        catch(e) {
            return {
                response: e,
                message: 'Houve uma falha para ler todas as tarefas'
            }
        }
    }

    static async update(id, body) {
        try {
            const bodyReturn = await Task.update(body,{
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Tarefa atualizada com sucesso !'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao atualizar uma tarefa'
            }
        }
    }

    static async delete(id) {
        try {

            const bodyReturn = await Task.destroy({
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Tarefa deletada com sucesso!'
            }

        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao deletar a tarefa'
            }
        }
    }

}

module.exports = CrudTask