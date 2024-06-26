const fs = require('fs');
const path = require('path');

// Especifica el directorio donde están tus archivos
const directorio = '.';

// Lee los archivos en el directorio
fs.readdir(directorio, (err, archivos) => {
  if (err) {
    console.error('Error leyendo el directorio:', err);
    return;
  }

  archivos.forEach((archivo) => {
    const rutaCompleta = path.join(directorio, archivo);

    if (archivo.includes('.rocket')) {
      // Nuevo nombre de archivo sin la parte ".rocket"
      const nuevoNombre = archivo.replace('.rocket', '');
      const nuevaRuta = path.join(directorio, nuevoNombre);

      // Renombra el archivo
      fs.rename(rutaCompleta, nuevaRuta, (err) => {
        if (err) {
          console.error(`Error renombrando el archivo ${archivo}:`, err);
        } else {
          console.log(`Archivo renombrado: ${archivo} -> ${nuevoNombre}`);
        }
      });
    }

    if (archivo.includes('-generated')) {
      // Elimina el archivo
      fs.unlink(rutaCompleta, (err) => {
        if (err) {
          console.error(`Error eliminando el archivo ${archivo}:`, err);
        } else {
          console.log(`Archivo eliminado: ${archivo}`);
        }
      });
    }
  });
});
