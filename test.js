/* eslint-disable */
const fs = require('fs');

fs.readdir('./src', (err, dir) => {
  console.log(dir);
});
