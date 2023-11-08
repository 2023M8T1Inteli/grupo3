const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

let newPageWindow;

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

  ipcMain.on('open-home-page', () => {
    newPageWindow.show();
  });

  ipcMain.on('mensagem-para-processo-renderizador', (event, mensagem) => {
    event.reply('resposta-do-processo-renderizador', 'Olá, mundo!');

    fs.writeFile('teste.txt', mensagem, function(err) {
      if (err) {
        console.log(err)
    }
      }
    )

  });
});
