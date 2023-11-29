// Importing the task service module
const task = require('../services/task.js');

/**
 * Controller function for handling IPC events related to task operations
 * @param {Object} ipc - IPC communication object
 */
function controllerTask(ipc) {
    // Event listener for registering a task
    ipc.on('register-task', async (event, message) => {
        // Call the task service to create a task
        const result = await task.create(message);

        // Send the response back to the renderer process
        event.sender.send('response-register-task', result);
    });

    // Event listener for deleting a task
    ipc.on('delete-task', async (event, message) => {
        // Call the task service to delete a task
        const result = await task.delete(message);

        // Send the response back to the renderer process
        event.sender.send('response-delete-task', result);
    });

    // Event listener for reading a task
    ipc.on('read-task', async (event, message) => {
        // Call the task service to read a task
        const result = await task.read(message);

        // Send the response back to the renderer process
        event.sender.send('response-read-task', result);
    });

    // Event listener for reading all tasks
    ipc.on('read-all-task', async (event, message) => {
        // Call the task service to read all tasks
        const result = await task.readAll();

        // Send the response back to the renderer process
        event.sender.send('response-readAll-task', result);
    });

    // Event listener for updating a task
    ipc.on('update-task', async (event, message) => {
        // Extract id and body from the message
        const { id, body } = message;

        // Call the task service to update a task
        const result = await task.update(id, body);

        // Send the response back to the renderer process
        event.sender.send('response-update-task', result);
    });
}

// Export the controller function for task operations
module.exports = controllerTask;