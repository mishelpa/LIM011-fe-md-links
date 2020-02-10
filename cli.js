#!/usr/bin/env node

const cli = require('./functions');
const mdLinks = require('./index');

const [, , ...[path, validate, stats]] = process.argv;

if (!path) console.log('Colocar ruta y opciones');

if (path && (stats === '--stats' || !stats)) {
  if (validate === '--validate') {
    mdLinks(path, { validate: true })
      .then(arr => ((stats === '--stats') ? cli.options(arr, 'valStat') : cli.options(arr, 'validate')))
      .then(data => console.log(data));
  }
  if (path && validate === '--stats') {
    mdLinks(path, { validate: false })
      .then(arr => cli.options(arr, 'stats'))
      .then(data => console.log(data));
  }
} else {
  console.log('Las opciones validas son:\n--validate\n--stats\n--validate --stats');
}

if (path && !validate) {
  mdLinks(path, { validate: false })
    .then(data => console.log(data));
}
