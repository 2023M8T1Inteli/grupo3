const task = require('../services/task.js')

function controllerTask (ipc) {
    ipc.on('register-task', async (event, message) => {
        const result = await task.create(message)

        event.sender.send('resposta-register-task', result)
    })

    ipc.on('delete-task', async (event, message) => {
        const result = await task.delete(message)

        event.sender.send('resposta-delete-task', result)
    })

    ipc.on('read-task', async (event, message) => {
        const result = await task.read(message)

        event.sender.send('resposta-read-task', result)
    })

    ipc.on('read-all-task', async (event, message) => {
        const result = await task.readAll()

        event.sender.send('resposta-readAll-task', result)
    })

    ipc.on('update-task', async (event, message) => {
        var {id: id, body: body} = message
        const result = await task.update(id, body)

        event.sender.send('resposta-update-task', result)
    })
}

module.exports = controllerTask