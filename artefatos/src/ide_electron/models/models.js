const blocksTask = require('./BlocksTask.js')
const feedback = require('./Feedback.js')
const myTask = require('./MyTasks.js')
const password = require('./Password.js')
const patient = require('./Patient.js')
const performance = require('./Performance.js')
const task = require('./Task.js')
const therapist = require('./Therapist.js')

module.exports = function syncTables() {
    blocksTask.sync()
    feedback.sync()
    myTask.sync()
    password.sync()
    patient.sync()
    performance.sync()
    task.sync()
    therapist.sync()
}