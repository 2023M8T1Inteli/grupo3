const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;
let newPageWindow;

app.on('ready', () => {
  // Cria a janela principal
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 832,
  });
  mainWindow.loadFile('./main/Login/index.html');

  // Cria uma nova janela para a tela home.html
  newPageWindow = new BrowserWindow({
    width: 1280,
    height: 832,
  });

  // Carrega a tela home.html
  newPageWindow.loadFile('./main/Home/home.html');

  ipcMain.on('open-home-page', () => {
    newPageWindow.show();
  });
});
