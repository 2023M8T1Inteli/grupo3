const myTask = require('../services/my_task.js')

function controllerMyTask (ipc) {
    ipc.on('register-myTask', async (event, message) => {
        const result = await myTask.create(message)

        event.sender.send('resposta-register-myTask', result)
    })

    ipc.on('delete-myTask', async (event, message) => {
        const result = await myTask.delete(message)

        event.sender.send('resposta-delete-myTask', result)
    })

    ipc.on('read-myTask', async (event, message) => {
        const result = await myTask.read(message)

        event.sender.send('resposta-read-myTask', result)
    })

    ipc.on('read-patient-myTask', async (event, message) => {
        const result = await myTask.readAllTaskPatient(message)

        event.sender.send('resposta-read-patient-myTask', result)
    })

    ipc.on('update-myTask', async (event, message) => {
        var {id: id, body: body} = message
        const result = await myTask.update(id, body)

        event.sender.send('resposta-update-myTask', result)
    })
}

module.exports = controllerMyTask