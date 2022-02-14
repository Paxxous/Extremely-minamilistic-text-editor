/*
  Code being run by the html, the link between this, and 
  the main index.js
*/


const { ipcMain, ipcRenderer } = require('electron');
const fs = require('fs');




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

    document.getElementById('body').style.color = 'white';
    document.getElementById('body').style.backgroundColor = 'rgb(56, 56, 56)';
  }
});
