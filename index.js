const marked = require('marked');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const isAbs = (route) => {
  let newRoute = '';
  if (path.isAbsolute(route)) newRoute = route;
  else newRoute = path.resolve(route);
  return newRoute;
};

const recursion = (route) => {
  const files = [];
  const array = (docs) => {
    if (!fs.statSync(docs).isDirectory()) {
      if (path.extname(docs) === '.md') files.push(path.resolve(docs));
      return files;
    }
    fs.readdirSync(docs, 'utf-8').forEach(doc => array(path.resolve(docs, doc)));
    return files;
  };
  array(isAbs(route));
  return files;
};

const createObjLink = (route) => {
  const links = [];
  const renderer = new marked.Renderer();
  recursion(route).forEach((docMd) => {
    renderer.link = (href, title, text) => links.push({ href, text, file: docMd });
    marked(fs.readFileSync(docMd, 'utf8'), { renderer });
  });
  return links;
};

const getHttp = (route) => {
  const promise = new Promise((resolve, reject) => {
    const arrayPromise = [];
    createObjLink(route).forEach((element) => {
      arrayPromise.push(fetch(`${element.href}`)
        .then((res) => {
          let statusRoute;
          if (res.ok) statusRoute = 'ok';
          else statusRoute = 'fail';
          const obj = { ...element, port: res.status, status: statusRoute };
          return obj;
        })
        .catch((err) => {
          console.log(err);
          const obj = { ...element, port: 'No hay puerto', status: 'Link interno' };
          return obj;
        }));
    });
    resolve(Promise.all(arrayPromise));
    reject(new Error('La ruta es incorrecta'));
  });
  return promise;
};

const options = (arr, option) => {
  let text = ''; let text2 = ''; let data = '';
  let count = 0;
  let cantUnique;
  const hrefString = [];
  arr.forEach((obj) => {
    text += `${obj.file} ${obj.href} ${obj.status} ${obj.port} ${obj.text}\n`;
    hrefString.push(obj.href);
    if (obj.status === 'fail') count += 1;
  });
  if (option === 'validate') data = text;
  if (option === 'stats') {
    cantUnique = [...new Set(hrefString)].length;
    text2 = `Total: ${arr.length} \nUnique: ${cantUnique}`;
    data = text2;
  }
  if (option === 'valStat') {
    cantUnique = [...new Set(hrefString)].length;
    text2 = `Total: ${arr.length} \nUnique: ${cantUnique} \nBroken: ${count}`;
    data = text2;
  }
  return data;
};

const mdLinks = (route, option) => {
  const promise = new Promise((resolve, reject) => {
    if (option.validate === true) resolve(getHttp(route));
    if (option.validate === false) resolve(createObjLink(route));
    reject(new Error('Segundo argumento es incorrecto'));
  });
  return promise;
};


module.exports = {
  isAbs,
  createObjLink,
  recursion,
  getHttp,
  mdLinks,
  options,
};
