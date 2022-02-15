/*
  Code being run by the html, the link between this, and 
  the main index.js
*/

const { ipcMain, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Setup the settings.json
const setUp = `{
  "darkmode": false
}`

if (!fs.existsSync(path.join(__dirname, 'settings.json'))) {
  fs.writeFileSync(path.join(__dirname, 'settings.json'), setUp);
}

var jsonSettings = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));
console.log(jsonSettings.darkmode);


// Convert on startup
if (!jsonSettings.darkmode) {

  document.getElementById('body').style.color = 'black';
  document.getElementById('body').style.backgroundColor = 'white';
  document.getElementById('bottombar').style.backgroundColor = 'white';

} else if (jsonSettings.darkmode) {

  document.getElementById('body').style.color = 'white';
  document.getElementById('body').style.backgroundColor = 'rgb(56, 56, 56)';
  document.getElementById('bottombar').style.backgroundColor = 'rgb(56, 56, 56';

}


// Save to file shortcut
document.addEventListener('keydown', function(key) {
  if (key.ctrlKey && key.key == 's') {

    console.log('saving...');
    let data = document.getElementById('the-editor').innerText;
    ipcRenderer.send('save', data);

  };
});

function getandsave() {
  console.log('sent')
  let text = document.getElementById('the-editor').innerText;

  let nof = document.getElementById('nameOfFile').value;
  let eof = document.getElementById('endOfFile').value;

  ipcRenderer.send('saveCustom', text, nof, eof);
  document.getElementById('bottombar').style.visibility = 'hidden';
}



// Advanced file save, basically the name of the file that you want to be saved
document.addEventListener('keydown', (key) => {
  if (key.ctrlKey && key.key == 'd') {
    // Change visibility
    document.getElementById('bottombar').style.visibility = 'visible';
  }

  // Atmempting to add darkmode
  if (key.ctrlKey && key.key == 'g') {
    console.log('Attempting change...');

    if (!jsonSettings.darkmode) {
      jsonSettings.darkmode = true;

      fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(jsonSettings, null, 2));

      document.getElementById('body').style.color = 'white';
      document.getElementById('body').style.backgroundColor = 'rgb(56, 56, 56)';
      document.getElementById('bottombar').style.backgroundColor = 'rgb(56, 56, 56';
    } else if (jsonSettings.darkmode) {
      jsonSettings.darkmode = false;

      fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(jsonSettings, null, 2));

      document.getElementById('body').style.color = 'black';
      document.getElementById('body').style.backgroundColor = 'white';
      document.getElementById('bottombar').style.backgroundColor = 'white';
    }

  }
});
