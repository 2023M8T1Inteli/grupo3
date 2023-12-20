// Importing the BlocksTask model
const BlocksTask = require('../models/BlocksTask.js');

// Class for CRUD operations on the BlocksTask model
class CrudBlocksTask {

    // Method to create a new sequence of blocks
    static async create(body) {
        try {
            const bodyReturn = await BlocksTask.create(body);
            return {
                response: bodyReturn,
                message: 'Sequência criada com sucesso!'
            };
        } catch (e) {
            return {
                response: e,
                message: 'Falha ao criar sequência de blocos'
            };
        }
    }

    // Method to read a block by ID
    static async read(id) {
        try {
            const bodyReturn = await BlocksTask.findByPk(id);
            return {
                response: bodyReturn,
                message: 'Bloco retornado com sucesso!'
            };
        } catch (e) {
            return {
                response: e,
                message: 'Falha ao retornar bloco'
            };
        }
    }

    // Method to read all blocks associated with a task
    static async readTaskBlocks(id) {
        try {
            const bodyReturn = await BlocksTask.findAll({
                where: {
                    TaskId: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Sequência retornada com sucesso!'
            };
        } catch (e) {
            return {
                response: e,
                message: 'Falha ao retornar sequência'
            };
        }
    }

    // Method to update a sequence by ID
    static async update(id, body) {
        try {
            const bodyReturn = await BlocksTask.update(body, {
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Sequência atualizada com sucesso!'
            };
        } catch (e) {
            return {
                response: e,
                message: 'Falha ao atualizar sequência'
            };
        }
    }

    // Method to delete a sequence by ID
    static async delete(id) {
        try {
            const bodyReturn = await BlocksTask.destroy({
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Sequência deletada com sucesso!'
            };
        } catch (e) {
            return {
                response: e,
                message: 'Falha ao deletar sequência'
            };
        }
    }
}

// Exporting the CrudBlocksTask class
module.exports = CrudBlocksTask;