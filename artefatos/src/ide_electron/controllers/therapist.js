// Importing the therapist service module and authentication middleware
const therapist = require('../services/therapist.js');
const authentification = require('../middlewares/authentification.js');

/**
 * Controller function for handling IPC events related to therapist operations
 * @param {Object} ipc - IPC communication object
 */
function controllerTherapist(ipc) {
    // Event listener for registering a therapist
    ipc.on('register-therapist', async (event, message) => {
        // Call the therapist service to create a therapist
        const result = await therapist.create(message);

        // Send the response back to the renderer process
        event.sender.send('resposta-register-therapist', result);
    });

    // Event listener for deleting a therapist
    ipc.on('delete-therapist', async (event, message) => {
        // Call the therapist service to delete a therapist
        const result = await therapist.delete(message);

        // Send the response back to the renderer process
        event.sender.send('resposta-delete-therapist', result);
    });

    // Event listener for reading a therapist
    ipc.on('read-therapist', async (event, message) => {
        // Call the therapist service to read a therapist
        const result = await therapist.read(message);

        // Send the response back to the renderer process
        event.sender.send('resposta-read-therapist', result);
    });

    // Event listener for updating a therapist
    ipc.on('update-therapist', async (event, message) => {
        // Extract id and body from the message
        const { id, body } = message;

        // Call the therapist service to update a therapist
        const result = await therapist.update(id, body);

        // Send the response back to the renderer process
        event.sender.send('resposta-update-therapist', result);
    });

    // Event listener for therapist login
    ipc.on('login', async (event, message) => {
        // Extract email and password from the message
        const { email, password } = message;

        // Call the authentication middleware to verify login credentials
        const verify = await authentification.verify(email, password);

        // Log the verification result to the console
        console.log(verify);

        // Initialize the result variable
        let result;

        // Check if the user is authenticated
        if (verify.isUser) {
            // If authenticated, set the result to the user object
            result = await verify.user;
        } else {
            // If not authenticated, set the result to the error message
            result = await verify.error;
        }

        // Send the login response back to the renderer process
        event.sender.send('resposta-login', verify);
    });
}

// Export the controller function for therapist operations
module.exports = controllerTherapist;