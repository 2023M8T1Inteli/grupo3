const performance = require('../services/performance.js')

function controllerPerformance (ipc) {
    ipc.on('register-performance', async (event, message) => {
        const result = await performance.create(message)

        event.sender.send('resposta-register-performance', result)
    })

    ipc.on('delete-performance', async (event, message) => {
        const result = await performance.delete(message)

        event.sender.send('resposta-delete-performance', result)
    })

    ipc.on('read-performance', async (event, message) => {
        const result = await performance.read(message)

        event.sender.send('resposta-read-performance', result)
    })

    ipc.on('read-my-task-performance', async (event, message) => {
        const result = await performance.readSpecificTask(message)

        event.sender.send('resposta-read-my-task-performance', result)
    })

    ipc.on('update-performance', async (event, message) => {
        var {id: id, body: body} = message
        const result = await performance.update(id, body)

        event.sender.send('resposta-update-performance', result)
    })
}

module.exports = controllerPerformance