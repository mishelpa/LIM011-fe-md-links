/* eslint-disable no-console */


const newLink = require('./index');

newLink.mdLinks('/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md', { validate: true })
  .then((data) => {
    console.log(data);
  });
