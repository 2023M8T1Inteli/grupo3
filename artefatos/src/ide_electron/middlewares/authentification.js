// Importing required modules
const crypto = require('./crypto.js');
const Therapist = require('../models/Therapist.js');
const servicePassword = require('../services/password.js');

/**
 * Authentication class for verifying user credentials
 */
class Authentication {
    /**
     * Verifies the user's email and password.
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Object} - Authentication result object
     * @property {boolean} isUser - Indicates if the user is authenticated
     * @property {Object} user - Therapist object if authenticated
     * @property {string} success - Success message if authenticated
     * @property {boolean} error - Error message if authentication fails
     */
    static async verify(email, password) {
        try {
            // Find the therapist with the provided email
            const therapist = await Therapist.findOne({
                where: {
                    email: email,
                },
            });

            // Check if therapist with the given email exists
            if (!therapist) {
                return {
                    isUser: false,
                    error: 'Usuário não encontrado!',
                };
            }

            // Get the therapist's ID
            const therapistId = therapist.id;

            // Read the hashed password for the therapist
            const hashedPassword = await servicePassword.readTherapistPassword(therapistId);

            // Check if the provided password matches the stored hashed password
            if (crypto.originalPassword(password, String(hashedPassword))) {
                return {
                    isUser: true,
                    user: therapist,
                    success: 'Usuário autenticado!',
                };
            } else {
                return {
                    isUser: false,
                    error: 'Senha incorreta!',
                };
            }
        } catch (error) {
            // Handle errors during authentication
            console.error('Erro durante a autenticação:', error);
            return {
                isUser: false,
                error: 'Erro durante a autenticação.',
            };
        }
    }
}

// Exporting the Authentication class
module.exports = Authentication;