const { app, BrowserWindow, globalShortcut, ipcRenderer, ipcMain, contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

// Setup the settings.json
const setUp = `{
  "darkmode": false,
}`

if (!fs.existsSync(path.join(__dirname, 'settings.json'))) {
  fs.writeFileSync(path.join(__dirname, 'settings.json'), setUp);
}


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
    
    icon: path.join(__dirname + '/one.png'),
    
    // Change the window title
    title: "text editor",

    webPreferences: {
      // Preload so that the javascript can access the text you write
      preload: path.join(__dirname, 'preload.js'),

      // Allow for node code to be run on index.html
      nodeIntegration: 'true',
      contextIsolation: false,

      devTools: true,
    },

    // Trying to add some custom menu items, this is defintley a project for another day
    // frame: false
  });
  
  win.loadFile(path.join(__dirname, 'index.html'));

  // Remove that ugly title bar and remove unnecessary keyboard shortcuts
  // win.removeMenu();
}


// Create window on ready so that no nasty errors happen
app.whenReady().then(() => {
  createWindow();
});



// when all windows close this app actually closes
app.on('window-all-closed', () => {
  if (process !== 'darwin') app.quit();
});



// If the simpletext directory doesn't exist, make one.
const osDocuments = app.getPath('documents');
if (!fs.existsSync(path.join(osDocuments, 'simpletext'))) {
  console.log('creating simpletext directory :D')
  fs.mkdirSync(path.join(osDocuments, 'simpletext'));
}


// Recieve the save ipc method and then save the file to the documents folder by default
ipcMain.on('save', (e, data) => {
  console.log('recived save...')

  fs.writeFileSync(path.join(osDocuments, 'simpletext', 'text.txt'), data, {mode: 0o777})
});

ipcMain.on('saveCustom', (e, text, nof, eof) => {
  // If there's blank input cancel the save
  if (!nof && !eof) {
    console.log('Canceled save, blank input.');
    return;
  }

  // Just to debug the input
  console.log(nof + '.' + eof);

  // Actually save the file onto your OS' documents directory
  file = nof + '.' + eof

  fs.writeFileSync(path.join(osDocuments, 'simpletext', file), text, {mode: 0o777});
});