const path = require('path');

const entryArr = [
  'demo',
];

const entry = Object.create(null);

entryArr.forEach((item) => {
  entry[item] = path.resolve(__dirname, `../src/${item}/main.js`);
});

module.exports = entry;
