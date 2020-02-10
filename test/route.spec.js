require('jest-fetch-mock').enableMocks();
const path = require('path');
const all = require('../functions');
const mdLinks = require('../index');


const ruta = [path.join(process.cwd(), '/test/testFolder/read.md')];

const array = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
  },
  {
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
    href: '#1-resumen-del-proyecto',
    text: '1. Resumen del proyecto',
  },
  {
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
    href: 'https://github.com/merunga/pildora-recursion/hy',
    text: 'Recursion',
  },
];

const array2 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
    status: 'OK',
    port: 200,
  },
  {
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
    href: 'https://github.com/merunga/pildora-recursion/hy',
    text: 'Recursion',
    port: 200,
    status: 'OK',
  },
  {
    file: path.join(process.cwd(), '/test/testFolder/read.md'),
    href: '#1-resumen-del-proyecto',
    port: 'null',
    status: 'INTERNO',
    text: '1. Resumen del proyecto',
  },
];

const validate = `${path.join(process.cwd(), '/test/testFolder/read.md')} https://es.wikipedia.org/wiki/Markdown OK 200 Markdown\n${path.join(process.cwd(), '/test/testFolder/read.md')} https://github.com/merunga/pildora-recursion/hy OK 200 Recursion\n${path.join(process.cwd(), '/test/testFolder/read.md')} #1-resumen-del-proyecto INTERNO null 1. Resumen del proyecto\n`;

const stats = 'Total: 3 \nUnique: 3';

const valStat = 'Total: 3 \nUnique: 3 \nBroken: 0';

// Test de la funcion isAbsolutePath
describe('isAbs', () => {
  it('debería retornar true para ruta absoluta', () => {
    expect(all.isAbs(process.argv[1])).toBe(process.argv[1]);
  });

  it('deberia retornar false para ruta relativa', () => {
    expect(all.isAbs('.')).toEqual(process.cwd());
  });
});

describe('recursion', () => {
  it('deberia mostrar una array de rutas de archivos md', () => {
    expect(all.recursion('./test/testFolder/')).toStrictEqual(ruta);
  });
});

describe('createObjLink', () => {
  it('deberia mostrar un array de objetos', () => {
    expect(all.createObjLink('./test/')).toStrictEqual(array);
  });
});

describe('getHttp', () => {
  it('deberia retornar un array de objetos de 5 propiedades', () => all.getHttp('./test').then((data) => {
    expect(data).toStrictEqual(array2);
  }));
});

describe('options', () => {
  it('deberia mostrar un string', () => {
    expect(all.options(array2, 'validate')).toEqual(validate);
  });
  it('deberia mostrar 2 estadisticas', () => {
    expect(all.options(array2, 'stats')).toEqual(stats);
  });
  it('deberia mostrar 3 estadisticas', () => {
    expect(all.options(array2, 'valStat')).toBe(valStat);
  });
});

describe('mdLinks', () => {
  it('deberia brindar array de objetos con 5 propiedades', () => mdLinks('./test', { validate: true }).then((data) => {
    expect(data).toStrictEqual(array2);
  }));

  it('deberia brindar array de objetos con 3 propiedades', () => mdLinks('./test', { validate: false }).then((data) => {
    expect(data).toStrictEqual(array);
  }));
});
