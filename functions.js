const marked = require('marked');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const isUrl = require('valid-url');

const isAbs = route => (path.isAbsolute(route) ? route : path.join(process.cwd(), route));

const recursion = (route) => {
  const files = [];
  const array = (docs) => {
    if (!fs.statSync(docs).isDirectory()) {
      if (path.extname(docs) === '.md') files.push(docs);
      return files;
    }
    fs.readdirSync(docs, 'utf-8').forEach(doc => array(path.join(docs, doc)));
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

const fetchUrl = url => fetch(url);

const getHttp = (route) => {
  const promise = new Promise((resolve, reject) => {
    const arrayFetch = [];
    createObjLink(route).forEach((ele) => {
      // Si las URL son validas.
      if (isUrl.isUri(`${ele.href}`)) {
        arrayFetch.push(fetchUrl(`${ele.href}`)
          .then((res) => {
            let obj = {};
            if (res.ok) obj = { ...ele, port: res.status, status: 'OK' };
            else obj = { ...ele, port: res.status, status: 'FAIL' };
            return obj;
          }));
      }
      // Si las URL no son validas.ejm: Cuando son links al mismo documento.
      if (!isUrl.isUri(`${ele.href}`)) {
        const obj = { ...ele, port: 'null', status: 'INTERNO' };
        arrayFetch.push(obj);
      }
    });
    resolve(Promise.all(arrayFetch));
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
    if (obj.status === 'FAIL') count += 1;
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

module.exports = {
  isAbs,
  createObjLink,
  recursion,
  getHttp,
  options,
  fetchUrl,
};
