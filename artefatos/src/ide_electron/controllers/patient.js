const patient = require('../services/patient.js')

function controllerPatient (ipc) {
    ipc.on('register-patient', async (event, message) => {
        const result = await patient.create(message)

        event.sender.send('resposta-register-patient', JSON.stringify(result.response))
    })

    ipc.on('delete-patient', async (event, message) => {
        const result = await patient.delete(message)

        event.sender.send('resposta-delete-patient', JSON.stringify(result.response))
    })

    ipc.on('read-patient', async (event, message) => {
        const result = await patient.read(message)

        event.sender.send('resposta-read-patient', JSON.stringify(result.response))
    })

    ipc.on('read-all-patient', async (event, message) => {
        const result = await patient.readAll()

        event.sender.send('resposta-readAll-patient', JSON.stringify(result.response))
    })

    ipc.on('read-all-patient-chain', async (event, message) => {
        const result = await patient.readSpecificChain(message)

        event.sender.send('resposta-readAll-patient-chain', JSON.stringify(result.response))
    })

    ipc.on('read-all-therapist-patient', async (event, message) => {
        const result = await patient.readTherapistPatient(message)

        event.sender.send('resposta-readAll-therapist-patient', JSON.stringify(result.response))
    })

    ipc.on('update-patient', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await patient.update(id, body)

        event.sender.send('resposta-update-patient', JSON.stringify(result.response))
    })

}

module.exports = controllerPatient