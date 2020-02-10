const allFunct = require('./functions');

const mdLinks = (route, option) => {
  const promise = new Promise((resolve) => {
    if (option.validate) resolve(allFunct.getHttp(route));
    if (!option.validate) resolve(allFunct.createObjLink(route));
  });
  return promise;
};

module.exports = mdLinks;
