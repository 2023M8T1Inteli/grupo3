const { ipcRenderer } = require('electron');

// ipcRenderer.send('' , {
//     first_name: 'Maria',
//     last_name: 'Souza',
//     email: 'maria@'
// })

ipcRenderer.send('delete-therapist', 1)