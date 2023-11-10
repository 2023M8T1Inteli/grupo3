const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const { spawn } = require('child_process'); // Import child_process to spawn Python

let newPageWindow;
let registerPage;

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

  registerPage = new BrowserWindow({
    width: 1280,
    height: 832,
  });

  // Load the register.html screen (You might want to add this to a separate event)
  registerPage.loadFile('./main/Register/register.html');

  ipcMain.on('open-home-page', () => {
    newPageWindow.show();
  });

  ipcMain.on('mensagem-para-processo-renderizador', (event, mensagem) => {
    // Save the message to a file
    fs.writeFile('../test_file/programa.txt', mensagem, function(err) {
      if (err) {
        console.log(err);
      }
    });

    try {
      const pythonProcess = spawn('python', ['../analysers/app.py', mensagem]);

      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        event.reply('resposta-do-processo-renderizador', 'Sucesso!');

        dialog.showMessageBox(newPageWindow, {
          type: 'info',
          title: 'Feedback',
          message: 'Sucesso!',
          buttons: ['OK'],
          icon: 'None'
        });
      });

    } catch (e) {
      event.reply('resposta-do-processo-renderizador', e);
    }
  });
});