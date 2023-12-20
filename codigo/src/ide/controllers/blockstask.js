const blocksTask = require('../services/blocks_task.js');

function controllerBlocksTask(ipc) {
    // Event listener for registering blocks tasks
    ipc.on('register-blocks-task', async (event, message) => {
        const result = await blocksTask.create(message);
        event.sender.send('response-register-blocks-task', result);
    });

    // Event listener for deleting blocks tasks
    ipc.on('delete-blocks-task', async (event, message) => {
        const result = await blocksTask.delete(message);
        event.sender.send('response-delete-blocks-task', result);
    });

    // Event listener for reading blocks tasks
    ipc.on('read-blocks-task', async (event, message) => {
        const result = await blocksTask.read(message);
        event.sender.send('response-read-blocks-task', result);
    });

    // Event listener for reading task blocks tasks
    ipc.on('read-task-blocks-task', async (event, message) => {
        const result = await blocksTask.readTaskBlocks(message);
        event.sender.send('response-read-task-blocks-task', result);
    });

    // Event listener for updating blocks tasks
    ipc.on('update-blocks-task', async (event, message) => {
        const { id, body } = message;
        const result = await blocksTask.update(id, body);
        event.sender.send('response-update-blocks-task', result);
    });
}

// Export the controller function for blocks tasks
module.exports = controllerBlocksTask;