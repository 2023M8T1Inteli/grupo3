// Import necessary modules and functions from Electron and Node.js
const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const fs = require('fs');
const { spawn } = require('child_process'); // Import child_process to spawn Python
const {sequelize, testarConexao} = require('./config/database.js')
const syncTables = require('./models/models.js')
const allControllers = require('./controllers/controllers.js')

// Connection with the database
async function inicia () {
  await testarConexao()
  await syncTables()
}

inicia()
// Declare variables for windows
let newPageWindow;
let registerPage;

// Event handler for when the Electron app is ready
app.on('ready', () => {
  // Create a new window for the home.html screen
  newPageWindow = new BrowserWindow({
    width: 1280,
    height: 832,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load the home.html screen
  newPageWindow.loadFile('./main/Home/home.html');

  // Load the lab.html screen (You might want to add this to a separate event)
  newPageWindow.loadFile('./main/Lab/lab.html');

  // Create a new window for the register.html screen
  registerPage = new BrowserWindow({
    width: 1280,
    height: 832,
  });

  // Load the register.html screen (You might want to add this to a separate event)
  registerPage.loadFile('./main/Register/register.html');

  // Event listener for opening the home page
  ipcMain.on('open-home-page', () => {
    newPageWindow.show();
  });

  allControllers(ipcMain)

  // newPageWindow.webContents.send('register-patient', {
  //   first_name: 'Maria',
  //   last_name: 'Nora',
  //   email: 'melyssa@'
  // })

  // Event listener for receiving code for analysis
  ipcMain.on('code-for-analysers', (event, message) => {
    // Save the message to a file
    fs.writeFile('../test_file/programa.txt', message, function(err) {
      if (err) {
        console.log(err);
      }
    });

    try {
      // Spawn a new Python process to execute the analysis
      const pythonProcess = spawn('python', ['../analysers/app.py', message]);

      // Event listeners for Python process output and completion
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);

        // Show a dialog box with the status of the program execution
        dialog.showMessageBox(newPageWindow, {
          type: 'info',
          title: 'Status do Envio',
          message: 'Tarefa enviada com sucesso!',
          buttons: ['OK'],
          icon: 'None'
        });
      });

    } catch (e) {
        // Show a dialog box in case of internal service failures
        dialog.showMessageBox(newPageWindow, {
          type: 'info',
          title: 'Status do Envio',
          message: 'Houve falha em nossos serviços internos!',
          buttons: ['OK'],
          icon: 'None'
        });
    }
  });
});
