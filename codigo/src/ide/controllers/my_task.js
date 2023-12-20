// Importing the myTask service module
const myTask = require('../services/my_task.js');

/**
 * Controller function for handling IPC events related to 'myTask' operations
 * @param {Object} ipc - IPC communication object
 */
function controllerMyTask(ipc) {
    // Event listener for registering 'myTask'
    ipc.on('register-myTask', async (event, message) => {
        const result = await myTask.create(message);
        event.sender.send('response-register-myTask', result);
    });

    // Event listener for deleting 'myTask'
    ipc.on('delete-myTask', async (event, message) => {
        const result = await myTask.delete(message);
        event.sender.send('response-delete-myTask', result);
    });

    // Event listener for reading 'myTask'
    ipc.on('read-myTask', async (event, message) => {
        const result = await myTask.read(message);
        event.sender.send('response-read-myTask', result);
    });

    // Event listener for reading all 'myTask' related to a patient
    ipc.on('read-patient-myTask', async (event, message) => {
        const result = await myTask.readAllTaskPatient(message);
        event.sender.send('response-read-patient-myTask', result);
    });

    // Event listener for updating 'myTask'
    ipc.on('update-myTask', async (event, message) => {
        const { id, body } = message;
        const result = await myTask.update(id, body);
        event.sender.send('response-update-myTask', result);
    });
}

// Export the controller function for 'myTask' operations
module.exports = controllerMyTask;