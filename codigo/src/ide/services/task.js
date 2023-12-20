// Importing the Task model
const Task = require('../models/Task.js');

// Class for CRUD operations on the Task model
class CrudTask {
    
    // Method to create a new task
    static async create(body) {
        try {
            const bodyReturn = await Task.create(body);

            return {
                response: bodyReturn,
                message: 'Tarefa criada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao cadastrar uma nova tarefa'
            };
        }
    }

    // Method to read a task by ID
    static async read(id) {
        try {
            const bodyReturn = await Task.findByPk(id);

            return {
                response: bodyReturn,
                message: 'Tarefa achada com sucesso'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao procurar tarefa'
            };
        }
    }

    // Method to read all tasks
    static async readAll(id) {
        try {
            const bodyReturn = await Task.findAll();

            return {
                response: bodyReturn,
                message: 'Todas as tarefas criadas'
            };
        }

        catch(e) {
            return {
                response: e,
                message: 'Houve uma falha para ler todas as tarefas'
            };
        }
    }

    // Method to update a task by ID
    static async update(id, body) {
        try {
            const bodyReturn = await Task.update(body, {
                where: {
                    id: id
                }
            });

            return {
                response: bodyReturn,
                message: 'Tarefa atualizada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao atualizar uma tarefa'
            };
        }
    }

    // Method to delete a task by ID
    static async delete(id) {
        try {
            const bodyReturn = await Task.destroy({
                where: {
                    id: id
                }
            });

            return {
                response: bodyReturn,
                message: 'Tarefa deletada com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao deletar a tarefa'
            };
        }
    }
}

// Exporting the CrudTask class
module.exports = CrudTask;