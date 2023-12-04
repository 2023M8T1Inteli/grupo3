// Importing Sequelize for database operations
const Sequelize = require('sequelize');

// Importing the sequelize instance and the Therapist model
const sequelize = require('../config/database.js');
const Therapist = require('../models/Therapist.js');

// Class for CRUD operations on the Therapist model
class CrudTherapist {

    // Method to create a new therapist
    static async create(body) {
        try {
            const bodyReturn = await Therapist.create(body);

            return {
                response: bodyReturn,
                message: 'Cadastro criado com sucesso!'
            };
        } 
        catch(e) {
            return {
                response: e,
                message: 'Houve erro no cadastramento!'
            };
        }
    }

    // Method to read a therapist by ID
    static async read(id) {
        try {
            const bodyReturn = await Therapist.findByPk(id);

            return {
                response: bodyReturn,
                message: 'Retornado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve um erro ao tentar ler o ID'
            };
        }
    }



    // Method to update a therapist by ID
    static async update(id, body) {
        try {
            const bodyReturn = await Therapist.update(body, {
                where: {
                    id: id
                }
            });

            return {
                response: bodyReturn,
                message: 'Perfil atualizado com sucesso!'
            };
        }
        catch(e) {
            return {
                response: e, 
                message: 'Houve um erro durante a atualização!'
            };
        }
    }

    static async inputCode(email, codigo) {
        try {
            const bodyReturn = await Therapist.update(codigo, {
                where: {
                    email: email
                }
            })
            
            return {
                response: bodyReturn,
                message: "Código colocado no seu perfil Terapeuta com sucesso!"
            }
        }
        catch(e) {
            return {
                response: e,
                message: "Houve falha ao mandar o seu código para seu Perfil!"
            }
        }
    }

    static async checkCode(codigo) {
        try {
            const bodyReturn = await Therapist.findOne({
                where: {
                    codigo: codigo
                }
            })

            return {
                response: bodyReturn,
                message: "Código confirmado"
            }
        }
        catch(e) {
            return {
                response: e,
                message: "Código incorreto"
            }
        }
    }

    // Method to delete a therapist by ID
    static async delete(id) {
        try {
            const bodyReturn = await Therapist.destroy({
                where: {
                    id: id
                }
            });

            return {
                response: bodyReturn,
                message: 'Deletado com sucesso!'
            };
        } 
        catch(e) {
            return {
                response: e,
                message: 'Houve problemas internos'
            };
        }
    }
} 

// Exporting the CrudTherapist class
module.exports = CrudTherapist;