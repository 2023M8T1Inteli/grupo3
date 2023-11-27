const crypto = require('./crypto.js')
const Therapist = require('../models/Therapist.js')
const servicePassword = require('../services/password.js')

class Authentification {
    static async verify(email, password) {
       const address = await Therapist.findOne({
            where: {
                email: email
            }
        })

        console.log(JSON.stringify(address.id))

        const hashPassword = servicePassword.readTherapistPassword(address.id)

        if (crypto.originalPassword(password, String(hashPassword))) {
            return {
                isUser: true,
                user: address,
                success: 'Usuário autentificado !'
            }
        } else {
            return {
                isUser: false,
                error: 'Usuário não encontrado !'
            }
        }
    }
}

module.exports = Authentification