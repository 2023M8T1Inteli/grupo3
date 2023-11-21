const therapist = require('../services/therapist.js')

function controllerTherapist (ipc) {
    ipc.on('register-therapist', async (event, message) => {
        const result =  await therapist.create(message)

        event.sender.send('resposta-register-therapist', JSON.stringify(result.response))
    })

    ipc.on('delete-therapist', async (event, message) => {
        const result = await therapist.delete(message)

        event.sender.send('resposta-delete-therapist', JSON.stringify(result.response))
    })

    ipc.on('read-therapist', async(event, message) => {
        const result = await therapist.read(message)

        event.sender.send('resposta-read-therapist', JSON.stringify(result.response))
    })

    ipc.on('update-therapist', async(event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await therapist.update(id, body)

        event.sender.send('resposta-update-therapist', JSON.stringify(result.response))
    })

}

module.exports = controllerTherapist
