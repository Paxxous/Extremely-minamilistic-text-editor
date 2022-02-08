const { app, BrowserWindow, globalShortcut, ipcRenderer, ipcMain, contextBridge } = require('electron');
const { writeFileSync, readFileSync, fstat } = require('fs');
const path = require('path');

// Create the main window
const createWindow = () => {

  // Adjust a few settings
  const win = new BrowserWindow({
    // What the height and width that you open up to
    width: 500,
    height: 600,

    // Minimun width and height
    minWidth: 400,
    minHeight: 400,

    icon: __dirname + '/icon.png',
    
    // Change the window title
    title: "text editor",

    webPreferences: {
      // Preload so that the javascript can access the text you write
      preload: path.join(__dirname, 'preload.js'),

      // Allow for node code to be run on index.html
      nodeIntegration: 'true',
      contextIsolation: false,
    }
  });
  
  win.loadFile('index.html');

  // Remove that ugly title bar and remove unnecessary keyboard shortcuts
  win.removeMenu();
}

// Create window on ready so that no nasty errors happen
app.whenReady().then(() => {
  createWindow();
});

app.whenReady().then(() => {

  // Global shortcut so the user has the ablitiy to exit
  globalShortcut.register('ctrl+e', () => {
    console.log("exiting...");
    app.exit();
  });

  globalShortcut.register('ctrl+s', () => {
    console.log("saving...");

    // Get the constantly sent ipc that holds the text that will be saved :D
    ipcMain.on('async', (e, arg1) => {
      writeFileSync('test.txt', arg1, {mode: 0o777})
    })

    console.log("Saved")

  });
});



// when all windows close this app actually closes
app.on('window-all-closed', () => {
  if (process !== 'darwin') app.quit();
});