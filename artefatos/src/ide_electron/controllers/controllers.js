const controllerBlocksTask = require('./blockstask.js')
const controllerFeedback = require('./feedback.js')
const controllerMyTask = require('./my_task.js')
const controllerPassword = require('./password.js')
const controllerPatient = require('./patient.js')
const controllerPerformance = require('./performance.js')
const controllerTask = require('./task.js')
const controllerTherapist = require('./therapist.js')

module.exports = function allControllers(ipc) {
    controllerBlocksTask(ipc)
    controllerFeedback(ipc)
    controllerMyTask(ipc)
    controllerPassword(ipc)
    controllerPatient(ipc)
    controllerPerformance(ipc)
    controllerTask(ipc)
    controllerTherapist(ipc)
}