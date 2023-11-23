const patient = require('../services/patient.js')

function controllerPatient (ipc) {
    ipc.on('register-patient', async (event, message) => {
        const result = await patient.create(message)

        event.sender.send('resposta-register-patient', result)
    })

    ipc.on('delete-patient', async (event, message) => {
        const result = await patient.delete(message)

        event.sender.send('resposta-delete-patient', result)
    })

    ipc.on('read-patient', async (event, message) => {
        const result = await patient.read(message)

        event.sender.send('resposta-read-patient', result)
    })

    ipc.on('read-all-patient', async (event, message) => {
        const result = await patient.readAll()

        event.sender.send('resposta-readAll-patient', result)
    })

    ipc.on('read-all-patient-chain', async (event, message) => {
        const result = await patient.readSpecificChain(message)

        event.sender.send('resposta-readAll-patient-chain', result)
    })

    ipc.on('read-all-therapist-patient', async (event, message) => {
        const result = await patient.readTherapistPatient(message)

        event.sender.send('resposta-readAll-therapist-patient', result)
    })

    ipc.on('update-patient', async (event, message) => {
        var {id: id, body: body} = message
        const result = await patient.update(id, body)

        event.sender.send('resposta-update-patient', result)
    })

}

module.exports = controllerPatient