const fs = require('fs');

const thecontent = "Hello world!";

fs.writeFileSync('hello.txt', thecontent);