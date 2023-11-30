// Importing the MyTask model
const MyTask = require('../models/MyTasks.js');

// Class for CRUD operations on the MyTask model
class CrudMyTask {
    
    // Method to create a new task associated with a patient
    static async create(body) {
        try {
            const bodyReturn = await MyTask.create(body);
            return {
                response: bodyReturn,
                message: 'Tarefa cadastrada no paciente com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao cadastrar uma nova tarefa ao paciente'
            };
        }
    }

    // Method to read a task by ID
    static async read(id) {
        try {
            const bodyReturn = await MyTask.findByPk(id);
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

    // Method to read all tasks associated with a patient
    static async readAllTaskPatient(id) {
        try {
            const bodyReturn = await MyTask.findAll({
                where: {
                    PatientId: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Tarefas do paciente retornadas com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve uma falha para retornar as tarefas do paciente'
            };
        }
    }

    // Method to update a task by ID
    static async update(id, body) {
        try {
            const bodyReturn = await MyTask.update(body, {
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Tarefa atualizada com sucesso!'
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
            const bodyReturn = await MyTask.destroy({
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

// Exporting the CrudMyTask class
module.exports = CrudMyTask;