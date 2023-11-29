// Importing the password service module and crypto middleware
const password = require('../services/password.js');
const crypto = require('../middlewares/crypto.js');

/**
 * Controller function for handling IPC events related to password operations
 * @param {Object} ipc - IPC communication object
 */
function controllerPassword(ipc) {
    // Event listener for registering a password
    ipc.on('register-password', async (event, message) => {
        // Hash the provided password using the crypto middleware
        const hash = crypto.hashPassword(message.password);
        message.password = hash;

        // Call the password service to create a password record
        const result = await password.create(message);

        // Send the response back to the renderer process
        event.sender.send('response-register-password', result);
    });

    // Event listener for deleting a password
    ipc.on('delete-password', async (event, message) => {
        // Call the password service to delete a password record
        const result = await password.delete(message);

        // Send the response back to the renderer process
        event.sender.send('response-delete-password', result);
    });

    // Event listener for reading a password
    ipc.on('read-password', async (event, message) => {
        // Call the password service to read a password record
        const result = await password.read(message);

        // Send the response back to the renderer process
        event.sender.send('response-read-password', result);
    });

    // Event listener for reading a therapist's password
    ipc.on('read-therapist-password', async (event, message) => {
        // Call the password service to read a therapist's password
        const result = await password.readTherapistPassword(message);

        // Send the response back to the renderer process
        event.sender.send('response-therapist-password', result);
    });

    // Event listener for updating a password
    ipc.on('update-password', async (event, message) => {
        // Extract id and body from the message
        const { id, body } = message;

        // Call the password service to update a password record
        const result = await password.update(id, body);

        // Send the response back to the renderer process
        event.sender.send('response-update-password', result);
    });
}

// Export the controller function for password operations
module.exports = controllerPassword;