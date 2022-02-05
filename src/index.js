const { app, BrowserWindow, globalShortcut, Menu } = require('electron')

// Create the main window
const createWindow = () => {

  // Adjust a few settings
  const win = new BrowserWindow({
    width: 400,
    height: 400

  });

  win.loadFile('index.html');

  // Remove that ugly title bar and remove unnecessary keyboard shortcuts
  win.removeMenu();


  // Change the window title
  win.title = "Text editor";
}

// Create window on ready so that no nasty errors happen
app.whenReady().then(() => {
  createWindow();  

  // Global shortcut so the user has the ablitiy to exit
  globalShortcut.register('ctrl+e', () => {
    console.log("exiting...");
    app.exit();
  });
});


// when all windows close this app actually closes
app.on('window-all-closed', () => {
  if (process !== 'darwin') app.quit();
})

