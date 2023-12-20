// Importing required models
const blocksTask = require('./BlocksTask.js');
const feedback = require('./Feedback.js');
const myTask = require('./MyTasks.js');
const password = require('./Password.js');
const patient = require('./Patient.js');
const performance = require('./Performance.js');
const task = require('./Task.js');
const therapist = require('./Therapist.js');

// Function to synchronize tables
module.exports = function syncTables() {
    // Synchronizing each model with the database
    blocksTask.sync();
    feedback.sync();
    myTask.sync();
    password.sync();
    patient.sync();
    performance.sync();
    task.sync();
    therapist.sync();
};