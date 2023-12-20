// Importing the patient service module
const patient = require('../services/patient.js');

/**
 * Controller function for handling IPC events related to patient operations
 * @param {Object} ipc - IPC communication object
 */
function controllerPatient(ipc) {
    // Event listener for registering a patient
    ipc.on('register-patient', async (event, message) => {
        // Call the patient service to create a patient record
        const result = await patient.create(message);

        // Send the response back to the renderer process
        event.sender.send('response-register-patient', result);
    });

    // Event listener for deleting a patient
    ipc.on('delete-patient', async (event, message) => {
        // Call the patient service to delete a patient record
        const result = await patient.delete(message);

        // Send the response back to the renderer process
        event.sender.send('response-delete-patient', result);
    });

    // Event listener for reading a patient
    ipc.on('read-patient', async (event, message) => {
        // Call the patient service to read a patient record
        const result = await patient.read(message);

        // Send the response back to the renderer process
        event.sender.send('response-read-patient', result);
    });

    // Event listener for reading all patients
    ipc.on('read-all-patient', async (event, message) => {
        // Call the patient service to read all patient records
        const result = await patient.readAll();

        // Send the response back to the renderer process
        event.sender.send('response-readAll-patient', result);
    });

    // Event listener for reading all patients in a specific chain
    ipc.on('read-all-patient-chain', async (event, message) => {
        // Call the patient service to read all patient records in a specific chain
        const result = await patient.readSpecificChain(message);

        // Send the response back to the renderer process
        event.sender.send('response-readAll-patient-chain', result);
    });

    // Event listener for reading all patients associated with a therapist
    ipc.on('read-all-therapist-patient', async (event, message) => {
        // Call the patient service to read all patient records associated with a therapist
        const result = await patient.readTherapistPatient(message);

        // Send the response back to the renderer process
        event.sender.send('response-readAll-therapist-patient', result);
    });

    // Event listener for updating a patient
    ipc.on('update-patient', async (event, message) => {
        // Extract id and body from the message
        const { id, body } = message;

        // Call the patient service to update a patient record
        const result = await patient.update(id, body);

        // Send the response back to the renderer process
        event.sender.send('response-update-patient', result);
    });
}

// Export the controller function for patient operations
module.exports = controllerPatient;