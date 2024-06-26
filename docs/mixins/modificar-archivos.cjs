const fs = require('fs');
const path = require('path');

// Función para leer archivos de forma recursiva
function leerArchivosRecursivamente(directorio, callback) {
  fs.readdir(directorio, (err, archivos) => {
    if (err) {
      console.error('Error leyendo el directorio:', err);
      return;
    }

    archivos.forEach((archivo) => {
      const rutaCompleta = path.join(directorio, archivo);

      fs.stat(rutaCompleta, (err, stats) => {
        if (err) {
          console.error('Error obteniendo estadísticas del archivo:', err);
          return;
        }

        if (stats.isDirectory()) {
          leerArchivosRecursivamente(rutaCompleta, callback);
        } else if (stats.isFile() && path.extname(archivo) === '.md') {
          callback(rutaCompleta);
        }
      });
    });
  });
}

// Función para convertir el nombre del archivo a un título
function convertirNombreArchivoATitulo(nombreArchivo) {
  // Eliminar la extensión y el prefijo 'dile-'
  const nombreSinExtension = path.basename(nombreArchivo, '.md').replace('dile-', '');
  // Convertir el nombre a título
  return nombreSinExtension
    .split('-')
    .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
}

// Función para modificar el contenido del archivo
function modificarArchivo(rutaArchivo) {
  fs.readFile(rutaArchivo, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo el archivo:', err);
      return;
    }

    let contenido = data;

    // Agregar frontmatter si no existe
    if (!contenido.startsWith('---')) {
      const titulo = convertirNombreArchivoATitulo(path.basename(rutaArchivo));
      const frontmatter = `---\ntitle: ${titulo}\n---\n\n`;
      contenido = frontmatter + contenido;
    }

    // Eliminar líneas que comienzan con "npm i @dile/ui--"
    const lineas = contenido.split('\n');
    const nuevasLineas = lineas.map(linea => {
      if (linea.startsWith('npm i @dile/ui--')) {
        return 'npm i @dile/ui';
      }
      if (linea.startsWith('import "@dile/dile-')) {
        return linea.replace('import "@dile/dile-', 'import \'@dile/ui/components/');
      }
      return linea;
    });

    // Unir las líneas de nuevo para trabajar con bloques de código
    contenido = nuevasLineas.join('\n');

    // Expresión regular para eliminar bloques de código JS delimitados por ```js script y ```
    const bloqueJsScriptRegex = /```js script[\s\S]*?```/g;
    contenido = contenido.replace(bloqueJsScriptRegex, '');

    // Expresión regular para eliminar bloques de código JS delimitados por ```js server y ```
    const bloqueJsServerRegex = /```js server[\s\S]*?```/g;
    contenido = contenido.replace(bloqueJsServerRegex, '');

    // Escribir el contenido modificado de nuevo en el archivo
    fs.writeFile(rutaArchivo, contenido, 'utf8', (err) => {
      if (err) {
        console.error('Error escribiendo el archivo:', err);
      } else {
        console.log(`Archivo modificado: ${rutaArchivo}`);
      }
    });
  });
}

// Directorio actual
const directorioActual = process.cwd();

// Leer archivos y modificar si es necesario
leerArchivosRecursivamente(directorioActual, modificarArchivo);
