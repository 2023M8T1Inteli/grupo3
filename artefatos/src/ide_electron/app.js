const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');

let newPageWindow;
let registerPage;

app.on('ready', () => {
  // Cria uma nova janela para a tela home.html
  newPageWindow = new BrowserWindow({
    width: 1280,
    height: 832,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  }  
  );

  // Carrega a tela home.html
  newPageWindow.loadFile('./main/Home/home.html');


  newPageWindow.loadFile('./main/Lab/lab.html');
  registerPage = new BrowserWindow({
    width: 1280,
    height: 832,
  });

  // Carrega a tela register.html
registerPage.loadFile('./main/Register/register.html')

  ipcMain.on('open-home-page', () => {
    newPageWindow.show();
  });

  ipcMain.on('mensagem-para-processo-renderizador', (event, mensagem) => {


    fs.writeFile('../test_file/programa.txt', mensagem, function(err) {
      if (err) {
        console.log(err)
    }
      }
    )

    try {

      event.reply('resposta-do-processo-renderizador', 'Sucesso!');

      dialog.showMessageBox(newPageWindow, {
        type: 'info',
        title: 'Feedback',
        message: 'Sucesso!',
        buttons: ['OK'],
        icon: 'None'
      });
      

    } catch (e) {
      event.reply('resposta-do-processo-renderizador', e);
    }

  });
});
