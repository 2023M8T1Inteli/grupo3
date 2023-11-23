const feedback = require('../services/feedback.js')

function controllerFeedback (ipc) {
    ipc.on('register-feedback', async (event, message) => {
        const result = await feedback.create(message)

        event.sender.send('resposta-register-feedback', result)
    })

    ipc.on('delete-feedback', async (event, message) => {
        const result = await feedback.delete(message)

        event.sender.send('resposta-delete-feedback', result)
    })

    ipc.on('read-feedback', async (event, message) => {
        const result = await feedback.read(message)

        event.sender.send('resposta-read-feedback', result)
    })

    ipc.on('read-task-feedback', async (event, message) => {
        const result = await feedback.readTaskFeedback(message)

        event.sender.send('resposta-read-task-feedback', result)
    })

    ipc.on('update-feedback', async (event, message) => {
        var {id: id, body: body} = message
        const result = await feedback.update(id, body)

        event.sender.send('resposta-update-feedback', result)
    })
}

module.exports = controllerFeedback