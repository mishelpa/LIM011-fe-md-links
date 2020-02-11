const hi = require('./index');

hi('/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/README.md', { validate: false })
  .then((data) => {
    console.log(data);
  });
