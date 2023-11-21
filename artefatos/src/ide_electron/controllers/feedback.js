const feedback = require('../services/feedback.js')

function controllerFeedback (ipc) {
    ipc.on('register-feedback', async (event, message) => {
        const result = await feedback.create(message)

        event.sender.send('resposta-register-feedback', JSON.stringify(result.response))
    })

    ipc.on('delete-feedback', async (event, message) => {
        const result = await feedback.delete(message)

        event.sender.send('resposta-delete-feedback', JSON.stringify(result.response))
    })

    ipc.on('read-feedback', async (event, message) => {
        const result = await feedback.read(message)

        event.sender.send('resposta-read-feedback', JSON.stringify(result.response))
    })

    ipc.on('read-task-feedback', async (event, message) => {
        const result = await feedback.readTaskFeedback(message)

        event.sender.send('resposta-read-task-feedback', JSON.stringify(result.response))
    })

    ipc.on('update-feedback', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await feedback.update(id, body)

        event.sender.send('resposta-update-feedback', JSON.stringify(result.response))
    })
}

module.exports = controllerFeedback