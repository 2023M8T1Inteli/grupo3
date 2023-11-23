const password = require('../services/password.js')

function controllerPassword (ipc) {
    ipc.on('register-password', async (event, message) => {
        const result = await password.create(message)

        event.sender.send('resposta-register-password', result)
    })

    ipc.on('delete-password', async (event, message) => {
        const result = await password.delete(message)

        event.sender.send('resposta-delete-password', result)
    })

    ipc.on('read-password', async (event, message) => {
        const result = await password.read(message)

        event.sender.send('resposta-read-password', result)
    })

    ipc.on('read-therapist-password', async (event, message) => {
        const result = await password.readTherapistPassword(message)

        event.sender.send('reposta-therapist-password', result)
    })

    ipc.on('update-password', async (event, message) => {
        var {id: id, body: body} = message
        const result = await password.update(id, body)

        event.sender.send('resposta-update-password', result)
    })
}

module.exports = controllerPassword