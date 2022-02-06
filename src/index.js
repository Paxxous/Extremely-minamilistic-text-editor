const { app, BrowserWindow, globalShortcut, Menu } = require('electron')

// Create the main window
const createWindow = () => {

  // Adjust a few settings
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    icon: 'src\\icon.png',
    
    // Change the window title
    title: "text editor"
    
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
})


// when all windows close this app actually closes
app.on('window-all-closed', () => {
  if (process !== 'darwin') app.quit();
})
