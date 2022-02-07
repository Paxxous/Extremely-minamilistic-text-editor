const path = require('path');
const fs = require('fs');


window.addEventListener('DOMContentLoaded', () => {
  function readAndCreate() {
    // var content = document.getElementById('the-editor').innerHTML;
  
    // fs.writeFileSync(path.join(__dirname, "text.txt"), content)
    console.log("hello world")
  }
  
  console.log("Hello world");
  setInterval(readAndCreate(), 10);
})


