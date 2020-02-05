# MD - LINKS - JM

*md-links-jm* es una libreria para archivos de extensión .md

## Tabla de contenidos

* [1. Resumen del proyecto](#1-resumen-del-proyecto)
* [2. Backlog](#2-backlog-del-proyecto)
* [3. Instalación](#3-instalación)
* [4. API](#5-API)
* [5. CLI](#6-CLI) 

***

## 1. Resumen del proyecto

Markdown es un lenguaje de marcado ligero muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional README.md).

Estos archivos Markdown normalmente contienen links (vínculos/ligas) que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

En este proyecto el objetivo es crear una herramienta usando Node.js, que lea y analice archivos en formato Markdown, para verificar los links que contengan y reportar algunas estadísticas.

## 2. Backlog

  ![Backlog](src/img/backlog.png)

  [Ver backlog completo](https://trello.com/invite/b/7VTjLYZJ/494a8b7b43e2f372089d830cd63f9f50/md-links-lab11)

## 3. Instalación y configuración

Para instalar md-links-jm, debe hacer lo siguiente: 

    npm install --save -dev mishelpa/LIM011-fe-md-links

Crear un archivo .js

```js
// Dentro del archivo creado, colocar
const mdLinks = require('md-links-jm').mdLinks;
 ```

## 4. API

  ### 4.1 Flujograma

  El flujograma muestra el proceso de creación del API. 

![Flujograma de desarrollo](src/img/flujograma.jpg)

### 4.2 Uso

El módulo se puede importar en otros scripts de Node.js y ofrece la siguiente interfaz:

#### `md-Links(path, options)`

##### Argumentos

- `path`: el usuario debe colocar una ruta absoluta o relativa al archivo o directorio.
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links encontrados. 

 ***Cuando options es igual a { validate: true }***

```js
const mdLinks = require('md-links-jm').mdLinks;

mdLinks("./some/example.md", { validate: true })
```
 ***Cuando options es igual a { validate: false }***
  
```js
const mdLinks = require('md-links-jm').mdLinks;

mdLinks("./some/example.md", { validate: false })
```

##### Valor de retorno

La función retorna una promesa que resuelve un `Array` de objetos, donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

***Cuando options es igual a { validate: true }***

```js
const mdLinks = require('md-links-jm').mdLinks;

mdLinks("./some/example.md", { validate: true })
  .then(data => {
    console.log(data)
  })
  .catch(console.error);
  ```

*Resultado* 

```js
[{  href: 'https://github.com/merunga/pildora-recursion',
    text: 'Pill de recursión - repositorio',
    file: '/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/README.md',
    port: 200,
    status: 'ok' }]

```
***Cuando options es igual a { validate: false }***

```js
const mdLinks = require("md-links-jm").mdLinks;

mdLinks("./some/example.md", { validate: false })
  .then(data => {
    console.log(data)
  })
  .catch(console.error);
```

*Resultado* 

```js
[{  href:'https://github.com/merunga/pildora-recursion',
    text:'Pill de recursión - repositorio',
    file:'/home/mishel/Desktop/Laboratoria/LIM011-fe-md-links/src/README.md' }]
```
## 5. CLI

Tambien se puede ejecutar a traves de la linea de comando.

`md-links <path-to-file> [options]`

## Inicio

md-links-lab11 es una herramienta que analiza archivos Markdown y verifica los links que contiene y reporta algunas estadisticas, ya que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de la información que se quiere compartir.

## Flujograma

![Flujograma de desarrollo](src/img/flujograma.jpg)



### CLI

- Expone ejecutable `md-links` en el path (configurado en `package.json`)
- Se ejecuta sin errores / output esperado.
- El ejecutable implementa `--validate`.
- El ejecutable implementa `--stats`.
- El ejecutable implementa `--validate` y `--stats` juntos.


Para comenzar este proyecto tendrás que hacer un _fork_ y _clonar_ este
repositorio.

Antes de comenzar a codear, es necesario que pensemos en la arquitectura y
boilerplate del proyecto, por lo que `antes de que empieces tu planificacion
y a trabajar en la funcionalidad de tu proyecto deberás de haber
creado tu boilerplate y tus tests`. Esto debería quedar
detallado en tu repo y haberte asegurado de haber recibido feedback de uno
de tus coaches. Una vez hayas terminado de definir la arquitectura y los tests
de tu proyecto estarás lista para iniciar con tu **planificacion** por lo cual
deberas de hacer uso de una serie de _issues_ y _milestones_ para priorizar
tus tareas y crear un _project_ para organizar el trabajo y poder hacer
seguimiento de tu progreso.

Dentro de cada _milestone_ se crearán y asignarán los _issues_ que cada quien
considere necesarios.

### JavaScript API

El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la
siguiente interfaz:

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa, debe resolverse como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

##### Valor de retorno

La función debe retornar una promesa (`Promise`) que resuelva a un arreglo
(`Array`) de objetos (`Object`), donde cada objeto representa un link y contiene
las siguientes propiedades:

- `href`: URL encontrada.
- `text`: Texto que aparecía dentro del link (`<a>`).
- `file`: Ruta del archivo donde se encontró el link.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación debe poder ejecutarse de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

El comportamiento por defecto no debe validar si las URLs responden ok o no,
solo debe identificar el archivo markdown (a partir de la ruta que recibe como
argumento), analizar el archivo Markdown e imprimir los links que vaya
encontrando, junto con la ruta del archivo donde aparece y el texto
que hay dentro del link (truncado a 50 caracteres).

#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh13d99df067c1
$ md-13d99df067c1
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

Vemos que el _output_ en este caso incluye la palabra `ok` o `fail` después de
la URL, así como el status de la respuesta recibida a la petición HTTP a dicha
URL.

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```
