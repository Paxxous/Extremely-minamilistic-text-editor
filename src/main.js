/*
  WARNING: THIS ISN'T THE NODEJS JAVASCRIPT,
  DO NOT TRY AND WRITE NODE JS CODE IN HERE IT WILL NOT WORK.

  lmao I'm pretty much arguing with myself now
*/

const { ipcMain, ipcRenderer } = require('electron')


const getText = setInterval(function() {
  var data = document.getElementById('the-editor').innerText
  ipcRenderer.send('async', data)
}, 1)