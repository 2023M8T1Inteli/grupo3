const therapist = require('../services/therapist.js')
const authentification = require('../middlewares/authentification.js')

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

    ipc.on('login', async (event, message) => {
        var {email: email, password: password} = message

        const verify = await authentification.verify(email, password)

        console.log(verify)
        var result;
        if (verify.isUser) {
            result = await verify.user
        }
        else {
            result = await verify.error
        }

        event.sender.send('resposta-login', verify)
    })

}

module.exports = controllerTherapist
