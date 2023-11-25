const Patient = require('../models/Patient.js')
const Sequelize = require('sequelize')

class CrudPatient {
    static async create(body) {
        try {
            const bodyReturn = await Patient.create(body)
            return {
                response: bodyReturn,
                message: 'Cadastro do paciente com sucesso !'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Erro de mensagem!'
            }
        }
    }

    static async read(id) {
        try {
            const bodyReturn = await Patient.findByPk(id)

            return {
                response: bodyReturn,
                message: 'Perfil do paciente'
            }
        } catch(e) {
            return {
                response: e,
                message: 'Houve erro ao procurar o paciente'
            }
        }
    }

    static async readAll() {
        try {
            const bodyReturn = await Patient.findAll()

            return {
                response: bodyReturn,
                message: 'Todos os Perfis'
            }

        } catch(e) {

            return {
                response: e,
                message: 'Houve um erro interno!'
            }
        }
    }

    static async readSpecificChain(chainCharacter) {
        try {
            const bodyReturn = await Patient.findAll({
                where: {
                    name: {
                      [Sequelize.Op.like]: `${chainCharacter}%`,
                    },
                  },
            })

            return {
                response: bodyReturn,
                message: `Todos os perfis com a cadeia ${chainCharacter}`
            }

        } catch(e) {
            
            return {
                response: e,
                message: `Houve ao fazer a consulta para a cadeia ${chainCharacter}`
            }

        }
    }

    static async readTherapistPatient(idTherapist) {
        try {
            const bodyReturn = await Patient.findAll({
                where: {
                    TherapistId: idTherapist
                }
            })

            return {
                response: bodyReturn,
                message: `Pacientes achados com sucesso!`
            }

        } catch(e) {
            return {
                response: e,
                message: 'Erro ao tentar achar os pacientes da Terapeuta!'
            }
        }
    }

    static async update(id, body) {
        try {
            const bodyReturn = await Patient.update(body, {
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: `Perfil do paciente atualizado com sucesso !`
            }

        } catch(e) {
            return {
                response: e,
                message: 'Erro ao tentar atualizar o perfil do paciente !'
            }
        }
    }

    static async delete(id) {
        try {
            const bodyReturn = await Patient.destroy({
                where: {
                    id: id
                }
            })

            return {
                response: bodyReturn,
                message: 'Perfil de paciente deletado com sucesso!'
            }
        }
        catch(e) {
            return {
                response: e,
                message: 'Houve erro ao deletar o perfil'
            }
        }
    }


}

module.exports = CrudPatient