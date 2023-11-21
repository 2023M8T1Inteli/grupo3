const myTask = require('../services/my_task.js')

function controllerMyTask (ipc) {
    ipc.on('register-myTask', async (event, message) => {
        const result = await myTask.create(message)

        event.sender.send('resposta-register-myTask', JSON.stringify(result.response))
    })

    ipc.on('delete-myTask', async (event, message) => {
        const result = await myTask.delete(message)

        event.sender.send('resposta-delete-myTask', JSON.stringify(result.response))
    })

    ipc.on('read-myTask', async (event, message) => {
        const result = await myTask.read(message)

        event.sender.send('resposta-read-myTask', JSON.stringify(result.response))
    })

    ipc.on('read-patient-myTask', async (event, message) => {
        const result = await myTask.readAllTaskPatient(message)

        event.sender.send('resposta-read-patient-myTask', JSON.stringify(result.response))
    })

    ipc.on('update-myTask', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await myTask.update(id, body)

        event.sender.send('resposta-update-myTask', JSON.stringify(result.response))
    })
}

module.exports = controllerMyTask