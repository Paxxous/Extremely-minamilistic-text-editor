/*
  Code being run by the html, the link between this, and 
  the main index.js
*/

const { ipcMain, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');


// Save setting such as darkmode
const settingsData = `{
  "darkmode": false
}`;

// Save your settings :0
if (!fs.existsSync(path.join(__dirname, 'settings.json'))) {
  fs.writeFileSync(path.join(__dirname, 'settings.json'), settingsData);
} else if (fs.existsSync(path.join(__dirname, 'settings.json'))) {
  var fullData = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));

  if (fullData.darkmode) {
    document.getElementById('body').style.color = 'white';

    document.getElementById('body').style.backgroundColor = 'rgb(56, 56, 56)';
    document.getElementById('bottombar').style.backgroundColor = 'rgb(56, 56, 56)';
  }

  if (!fullData.darkmode) {
    console.log('light');
  }

}

console.log(fullData.darkmode);


// Save to file shortcut
document.addEventListener('keydown', function(key) {
  if (key.ctrlKey && key.key == 's') {

    console.log('saving...');
    let data = document.getElementById('the-editor').innerText;
    ipcRenderer.send('save', data);

  };
});

// Get the values of the advanced save and packages it to be sent to index
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
    var fullData = JSON.parse(fs.readFileSync(path.join(__dirname, 'settings.json')));


    // Swap between darkmode and lightmode (it saves)
    if (fullData.darkmode) {
      fullData.darkmode = false;
      fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(fullData));
      document.getElementById('body').style.color = 'black';
      document.getElementById('body').style.backgroundColor = 'white';
      document.getElementById('bottombar').style.backgroundColor = 'white';

      console.log('dark');


    } else if (fullData.darkmode == false) {
      fullData.darkmode = true;
      fs.writeFileSync(path.join(__dirname, 'settings.json'), JSON.stringify(fullData));
      document.getElementById('body').style.color = 'white';
      document.getElementById('body').style.backgroundColor = 'rgb(56, 56, 56)';
      document.getElementById('bottombar').style.backgroundColor = 'rgb(56, 56, 56)';

      console.log('light');

    }
  }
});
