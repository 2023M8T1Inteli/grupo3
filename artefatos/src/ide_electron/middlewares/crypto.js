// Importing the bcrypt module for password hashing
const bCrypt = require('bcrypt');

/**
 * Class for handling password security operations using bcrypt.
 */
class SecurityPassword {
    /**
     * Hashes a given password using bcrypt.
     * @param {string} password - The plain-text password to be hashed.
     * @returns {string} - The hashed password.
     */
    static hashPassword(password) {
        // Number of salt rounds for bcrypt
        const saltRounds = 10;

        // Generate a salt
        const salt = bCrypt.genSaltSync(saltRounds);

        // Hash the password using the generated salt
        const hash = bCrypt.hashSync(password, salt);

        // Return the hashed password
        return hash;
    }

    /**
     * Compares a plain-text password with a hashed password to check for a match.
     * @param {string} password - The plain-text password to be compared.
     * @param {string} hash - The hashed password to compare against.
     * @returns {boolean} - True if the passwords match, false otherwise.
     */
    static originalPassword(password, hash) {
        // Compare the provided password with the stored hashed password
        const result = bCrypt.compareSync(password, hash);

        // Return the result of the comparison
        return result;
    }
}

// Exporting the SecurityPassword class for use in other modules
module.exports = SecurityPassword;