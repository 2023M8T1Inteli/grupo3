const bCrypt = require('bcrypt')

class SecurityPassword {

    static hashPassword (password) {
        const saltRounds = 10;
        const salt = bCrypt.genSaltSync(saltRounds);
        const hash = bCrypt.hashSync(password, salt);

        return hash
    }

    static originalPassword(password, hash) {
        const result = bCrypt.compare(password, hash)

        return result
    }
}

module.exports = SecurityPassword