#!/usr/bin/env node

const cli = require('./index');

const path = process.argv[2];
const option = { validate: false, stats: false };

process.argv.forEach((element) => {
  if (element === '--validate') option.validate = true;
  if (element === '--stats') option.stats = true;
});

if (!path) {
  console.log('No existe ruta/ Ingrese ruta');
}

if (path && option.validate) {
  cli.mdLinks(path, { validate: true })
    .then((arr) => {
      let text = '';
      if (option.stats) text = cli.options(arr, 'valStat');
      if (!option.stats) text = cli.options(arr, 'validate');
      console.log(text);
    });
}
if (path && !option.validate) {
  cli.mdLinks(path, { validate: false })
    .then((arr) => {
      let valor;
      if (option.stats) valor = cli.options(arr, 'stats');
      if (!option.stats) valor = arr;
      console.log(valor);
    });
}
