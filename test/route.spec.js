require('jest-fetch-mock').enableMocks();
const fetch = require('node-fetch');
const index = require('../index');

const ruta = ['/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md'];
const array = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown/',
    text: 'Markdown',
    file: '/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown/',
    text: 'Markdown',
    file: '/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md',
  },
];

const array2 = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown/',
    text: 'Markdown',
    file: '/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md',
    status: 'ok',
    port: 200,
  },
];


const text = '/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/testFolder/read.md https://es.wikipedia.org/wiki/Markdown/ ok 200 Markdown\n';

const text2 = 'Total: 1 \nUnique: 1';

const text3 = 'Total: 1 \nUnique: 1 \nBroken: 0';

// Test de la funcion isAbsolutePath
describe('isAbs', () => {
  it('debería retornar true para ruta absoluta', () => {
    expect(index.isAbs(process.argv[1])).toBe(process.argv[1]);
  });

  it('deberia retornar false para ruta relativa', () => {
    expect(index.isAbs('.')).toEqual(process.cwd());
  });
});

describe('recursion', () => {
  it('deberia mostrar una array de rutas de archivos md', () => {
    expect(index.recursion('./src/testFolder/')).toStrictEqual(ruta);
  });
});

describe('createObjLink', () => {
  it('deberia mostrar un array de objetos', () => {
    expect(index.createObjLink('./src/')).toStrictEqual(array);
  });
});

describe('getHttp', () => {
  it('deberia retornar un array de objetos de 5 propiedades', () => index.getHttp('./src').then((data) => {
    expect(data[0].text).toBe('Markdown');
  }));
});

describe('options', () => {
  it('deberia mostrar un string', () => {
    expect(index.options(array2, 'validate')).toEqual(text);
  });
  it('deberia mostrar 2 estadisticas', () => {
    expect(index.options(array2, 'stats')).toEqual(text2);
  });
  it('deberia mostrar 3 estadisticas', () => {
    expect(index.options(array2, 'valStat')).toBe(text3);
  });
});

describe('mdLinks', () => {
  it('deberia brindar array de objetos con 5 propiedades', () => index.mdLinks('./src', { validate: true }).then((data) => {
    expect(typeof data).toBe('object');
  }));

  it('deberia brindar array de objetos con 3 propiedades', () => index.mdLinks('./src', { validate: false }).then((data) => {
    expect(typeof data).toBe('object');
  }));
});

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('calls google and returns data to me', () => {
    fetch.mockResponseOnce(JSON.stringify(array2[0]));

    // assert on the response
    index.getHttp('./src').then((res) => {
      expect(res[0].status).toEqual('ok');
    });

    // assert on the times called and arguments given to fetch
    expect(fetch.mock.calls[0][0]).toEqual('https://es.wikipedia.org/wiki/Markdown/');
  });
});
