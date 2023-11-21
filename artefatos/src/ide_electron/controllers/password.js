const password = require('../services/password.js')

function controllerPassword (ipc) {
    ipc.on('register-password', async (event, message) => {
        const result = await password.create(message)

        event.sender.send('resposta-register-password', JSON.stringify(result.response))
    })

    ipc.on('delete-password', async (event, message) => {
        const result = await password.delete(message)

        event.sender.send('resposta-delete-password', JSON.stringify(result.response))
    })

    ipc.on('read-password', async (event, message) => {
        const result = await password.read(message)

        event.sender.send('resposta-read-password', JSON.stringify(result.response))
    })

    ipc.on('read-therapist-password', async (event, message) => {
        const result = await password.readTherapistPassword(message)

        event.sender.send('reposta-therapist-password', JSON.stringify(result.response))
    })

    ipc.on('update-password', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await password.update(id, body)

        event.sender.send('resposta-update-password', JSON.stringify(result.response))
    })
}

module.exports = controllerPassword