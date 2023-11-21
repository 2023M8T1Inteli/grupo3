const performance = require('../services/performance.js')

function controllerPerformance (ipc) {
    ipc.on('register-performance', async (event, message) => {
        const result = await performance.create(message)

        event.sender.send('resposta-register-performance', JSON.stringify(result.response))
    })

    ipc.on('delete-performance', async (event, message) => {
        const result = await performance.delete(message)

        event.sender.send('resposta-delete-performance', JSON.stringify(result.response))
    })

    ipc.on('read-performance', async (event, message) => {
        const result = await performance.read(message)

        event.sender.send('resposta-read-performance', JSON.stringify(result.response))
    })

    ipc.on('read-my-task-performance', async (event, message) => {
        const result = await performance.readSpecificTask(message)

        event.sender.send('resposta-read-my-task-performance', JSON.stringify(result.response))
    })

    ipc.on('update-performance', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await performance.update(id, body)

        event.sender.send('resposta-update-performance', JSON.stringify(result.response))
    })
}

module.exports = controllerPerformance