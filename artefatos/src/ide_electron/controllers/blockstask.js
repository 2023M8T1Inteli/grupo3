const blocksTask = require('../services/blocks_task.js')

function controllerBlocksTask (ipc) {
    ipc.on('register-blocks-task', async (event, message) => {
        const result = await blocksTask.create(message)

        event.sender.send('resposta-register-blocksTask', JSON.stringify(result.response))
    })

    ipc.on('delete-blocksTask', async (event, message) => {
        const result = await blocksTask.delete(message)

        event.sender.send('resposta-delete-blocksTask', JSON.stringify(result.response))
    })

    ipc.on('read-blocksTask', async (event, message) => {
        const result = await blocksTask.read(message)

        event.sender.send('resposta-read-blocksTask', JSON.stringify(result.response))
    })

    ipc.on('read-task-blocksTask', async (event, message) => {
        const result = await blocksTask.readTaskBlocks(message)

        event.sender.send('resposta-read-task-blocksTask', JSON.stringify(result.response))
    })

    ipc.on('update-blocksTask', async (event, message) => {
        var temp = JSON.parse(message)
        var {id: id, body: body} = temp
        const result = await blocksTask.update(id, body)

        event.sender.send('resposta-update-blocksTask', JSON.stringify(result.response))
    })
}

module.exports = controllerBlocksTask