// Importe os módulos necessários do Electron e Node.js
const { app, BrowserWindow, ipcMain, dialog} = require('electron');
const fs = require('fs');
const { spawn } = require('child_process'); // Import child_process to spawn Python
const {sequelize, testConnection} = require('./config/database.js')
const syncTables = require('./models/models.js')
const allControllers = require('./controllers/controllers.js')

// Connection with the database
async function inicia () {
  await testConnection()
  await syncTables()
}

inicia()

// Declare variables for windows
let mainWindow;
let newPageWindow;
let registerPage;
let forgotPass;

// Evento para quando o aplicativo Electron estiver pronto
app.on('ready', () => {
  // Crie uma nova janela para a tela home.html
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 832,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Carregue a tela home.html
  mainWindow.loadFile('./main/Login/index.html');

  // Event listener para abrir a página home

  ipcMain.on('open-home-page', () => {
    // Certifique-se de que a janela principal esteja visível
    mainWindow.show();
  });

  allControllers(ipcMain)

  // Event listener para receber código para análise
  ipcMain.on('code-for-analysers', (event, message) => {
    // Salve a mensagem em um arquivo
    fs.writeFile('../programa.txt', message, function(err) {
      if (err) {
        console.log(err);
      }
    });

    try {
      // Inicie um novo processo Python para executar a análise
      const pythonProcess = spawn('python', ['../analysers/app.py', message]);

      // Ouvintes de eventos para saída e conclusão do processo Python
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
        fs.writeFile('../task.py', data, { encoding: 'utf-8' }, function(err) {
          if (err) {
            console.log(err);
          }
        });
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python stderr: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);

        // Mostre uma caixa de diálogo com o status da execução do programa
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Status do Envio',
          message: 'Tarefa enviada com sucesso!',
          buttons: ['OK'],
          icon: 'None'
        });
      });

      const task = spawn('python', ['../task.py']);

      task.stdout.on('data', (data) => {
        console.log(`Python stdout: ${data}`);
      })

    } catch (e) {
        // Mostre uma caixa de diálogo em caso de falhas nos serviços internos
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          title: 'Status do Envio',
          message: 'Houve falha em nossos serviços internos!',
          buttons: ['OK'],
          icon: 'None'
        });
    }
  });
});