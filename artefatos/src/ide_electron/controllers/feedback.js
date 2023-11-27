// Importing the feedback service module
const feedback = require('../services/feedback.js');

/**
 * Controller function for handling IPC events related to feedback operations
 * @param {Object} ipc - IPC communication object
 */
function controllerFeedback(ipc) {
    // Event listener for registering feedback
    ipc.on('register-feedback', async (event, message) => {
        const result = await feedback.create(message);
        event.sender.send('response-register-feedback', result);
    });

    // Event listener for deleting feedback
    ipc.on('delete-feedback', async (event, message) => {
        const result = await feedback.delete(message);
        event.sender.send('response-delete-feedback', result);
    });

    // Event listener for reading feedback
    ipc.on('read-feedback', async (event, message) => {
        const result = await feedback.read(message);
        event.sender.send('response-read-feedback', result);
    });

    // Event listener for reading feedback related to a task
    ipc.on('read-task-feedback', async (event, message) => {
        const result = await feedback.readTaskFeedback(message);
        event.sender.send('response-read-task-feedback', result);
    });

    // Event listener for updating feedback
    ipc.on('update-feedback', async (event, message) => {
        const { id, body } = message;
        const result = await feedback.update(id, body);
        event.sender.send('response-update-feedback', result);
    });
}

// Export the controller function for feedback operations
module.exports = controllerFeedback;