// Importing the performance service module and performance calculation utility
const performance = require('../services/performance.js');
const calc = require('../utils/performance.js');

/**
 * Controller function for handling IPC events related to performance operations
 * @param {Object} ipc - IPC communication object
 */
function controllerPerformance(ipc) {
    // Event listener for registering performance data
    ipc.on('register-performance', async (event, message) => {
        // Call the performance service to create performance data
        const result = await performance.create(message);

        // Send the response back to the renderer process
        event.sender.send('response-register-performance', result);
    });

    // Event listener for deleting performance data
    ipc.on('delete-performance', async (event, message) => {
        // Call the performance service to delete performance data
        const result = await performance.delete(message);

        // Send the response back to the renderer process
        event.sender.send('response-delete-performance', result);
    });

    // Event listener for reading performance data
    ipc.on('read-performance', async (event, message) => {
        // Call the performance service to read performance data
        const result = await performance.read(message);

        // Send the response back to the renderer process
        event.sender.send('response-read-performance', result);
    });

    // Event listener for reading performance data for a specific task
    ipc.on('read-my-task-performance', async (event, message) => {
        // Call the performance service to read performance data for a specific task
        const result = await performance.readSpecificTask(message);

        // Send the response back to the renderer process
        event.sender.send('response-read-my-task-performance', result);
    });

    // Event listener for updating performance data
    ipc.on('update-performance', async (event, message) => {
        // Extract id and body from the message
        const { id, body } = message;

        // Call the performance service to update performance data
        const result = await performance.update(id, body);

        // Send the response back to the renderer process
        event.sender.send('response-update-performance', result);
    });

    // Event listener for reading performance data with percentage calculation
    ipc.on('read-performance-with-porcentagem', async (event, message) => {
        // Call the performance service to read performance data
        const result = await performance.read(message);

        // Extract hits and mistakes from the result
        const { hits, mistakes } = result;

        // Calculate the percentage using the utility function
        const porcentagem = calc(hits, mistakes);

        // Send the percentage response back to the renderer process
        event.sender.send('response-performance-with-porcentagem', porcentagem);
    });
}

// Export the controller function for performance operations
module.exports = controllerPerformance;