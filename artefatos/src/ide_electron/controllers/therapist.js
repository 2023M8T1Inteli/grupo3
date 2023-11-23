const therapist = require('../services/therapist.js')

function controllerTherapist (ipc) {
    ipc.on('register-therapist', async (event, message) => {
        const result =  await therapist.create(message)

        event.sender.send('resposta-register-therapist', result)
    })

    ipc.on('delete-therapist', async (event, message) => {
        const result = await therapist.delete(message)

        event.sender.send('resposta-delete-therapist', result)
    })

    ipc.on('read-therapist', async(event, message) => {
        const result = await therapist.read(message)

        event.sender.send('resposta-read-therapist', result)
    })

    ipc.on('update-therapist', async(event, message) => {
        var {id: id, body: body} = message
        const result = await therapist.update(id, body)

        event.sender.send('resposta-update-therapist', result)
    })

}

module.exports = controllerTherapist
