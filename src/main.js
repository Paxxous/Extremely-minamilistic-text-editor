/*
  WARNING: THIS ISN'T THE NODEJS JAVASCRIPT,
  DO NOT TRY AND WRITE NODE JS CODE IN HERE IT WILL NOT WORK.
*/

const fs = require('fs');

const thecontent = "Hello world!";

fs.writeFileSync('hello.txt', thecontent);