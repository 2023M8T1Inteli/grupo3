// Importing the Password model
const Password = require('../models/Password.js');

// Class for CRUD operations on the Password model
class CrudPassword {
    
    // Method to create a new password
    static async create(body) {
        try {
            const bodyReturn = await Password.create(body);
            return {
                response: bodyReturn,
                message: 'Senha criada com sucesso!'
            };
        } 
        catch(e) {
            return {
                response: e,
                message: 'Erro ao criar senha'
            };
        }
    }

    // Method to read a password by ID
    static async read(id) {
        try {
            const bodyReturn = await Password.findByPk(id);
            return {
                response: bodyReturn,
                message: 'Senha retornada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao pegar a senha'
            };
        }
    }

    // Method to read a therapist's password by therapist ID
    static async readTherapistPassword(id) {
        try {
            const bodyReturn = await Password.findOne({
                where: {
                    TherapistId: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Senha retornada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro ao pegar a senha'
            };
        }
    }

    // Method to update a password by ID
    static async update(id, body) {
        try {
            const bodyReturn = await Password.update(body, {
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Senha atualizada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Falha para atualizar a senha'
            };
        }
    }

    // Method to delete a password by ID
    static async delete(id) {
        try {
            const bodyReturn = await Password.destroy({
                where: {
                    id: id
                }
            });
            return {
                response: bodyReturn,
                message: 'Senha deletada com sucesso !'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Falha para deletar a senha'
            };
        }
    } 
}

// Exporting the CrudPassword class
module.exports = CrudPassword;