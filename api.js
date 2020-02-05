/* eslint-disable no-console */


const newLink = require('./index');

newLink.mdLinks('.', { validate: false })
  .then((data) => {
    console.log(data);
  });


console.log(process.argv);
