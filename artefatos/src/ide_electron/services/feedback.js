// Importing the Feedback model
const Feedback = require('../models/Feedback.js');

// Class for CRUD operations on the Feedback model
class CrudFeedback {
    
    // Method to create a new feedback
    static async create(body) {
        try {
            const bodyReturn = await Feedback.create(body);
            return {
                response: bodyReturn,
                message: 'Feedback criado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Não foi possível criar o feedback'
            };
        }
    }

    // Method to read a feedback by ID
    static async read(id) {
        try {
            const bodyReturn = await Feedback.findByPk(id);
            return {
                response: bodyReturn,
                message: 'Feedback retornado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve falha ao pegar o feedback'
            };
        }
    }

    // Method to read all feedbacks associated with a task
    static async readTaskFeedback(id) {
        try {
            const bodyReturn = await Feedback.findAll({
                where: {
                    TaskId: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Feedback retornado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve falha ao pegar o feedback'
            };
        }
    }

    // Method to update a feedback by ID
    static async update(id, body) {
        try {
            const bodyReturn = await Feedback.update(body, {
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Feedback atualizado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve falhas para atualizar o feedback'
            };
        }
    }

    // Method to delete a feedback by ID
    static async delete(id) {
        try {
            const bodyReturn = await Feedback.destroy({
                where:{
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Feedback deletado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve problemas para deletar este feedback'
            };
        }
    }
}

// Exporting the CrudFeedback class
module.exports = CrudFeedback;