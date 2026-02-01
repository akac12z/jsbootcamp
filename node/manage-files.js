import { mkdir, readFile, writeFile } from "node:fs/promises";
// para manejar rutas no es correcto usar el / porque no funciona en todos los sistemas operativos (concretamente en windows...) para solucionarlo lo que tinee node es una libreria llamada join que viene de path lo que te permite es concatenar rutas de forma correcta y automática sin poner "/" o "\"
import { join, basename, extname } from "node:path";

// const content = await readFile( './archivo.txt', 'utf-8' );
// al readFile le pasamos la ruta que quieres que lea, el archivo.txt y el encoding utf-8 para que entienda los símbolos y no lo lea como un buffer binario
// console.log( content );


// para dar o denegar persmisos y no tener problemas de inyection
if ( process.permission.has( 'fs.read', 'archivo.txt' ) ) {
  const content = await readFile( 'archivo.txt', 'utf-8' );
  console.log( content );
} else {
  console.log( 'Permiso de lectura denegado' );
}

/*
esta forma no funciona porque no tiene el recursive = true

const outputDir2 = 'output2/documents2'; // la ruta que quiero crear
await mkdir( outputDir2, { recursive: false } ); // el recursive es para que cree las carpetas anidadas
await writeFile( `${ outputDir2 }/archivo-uppercase.txt`, uppercaseContent ); // este archivo se crea en la ruta que le indico con el outputDir -> esto no se podría hacer pq no tiene el recursive = true por ende, lo que hace es que no crea la carpeta output2 y da error
*/

// y lo mismo para con el writefile
if ( process.permission.has( 'fs.write', 'archivo-uppercase.txt' ) ) {




  // const outputDir = 'output/documents'; // la ruta que quiero crear -> forma mal hecha
  const outputDir = join( 'output', 'documents', 'new-folder' ); // la ruta que quiero crear -> forma correcta
  await mkdir( outputDir, { recursive: true } ); // el recursive es para que cree las carpetas anidadas

  // ahora voy a crear un archivo de escritura
  const lowercaseContent = content.toLocaleLowerCase();
  const uppercaseContent = content.toLocaleUpperCase();
  await writeFile( 'archivo-uppercase.txt', lowercaseContent ); // creo el nuevo archivo con el writefile pq si hago sobre el archivo que ya tengo lo sobreescribiría

  // aquí tb usarías ese join para que sepa donde crearlo
  const outputFilePath = join( outputDir, 'archivo-uppercase.txt' );
  await writeFile( outputFilePath, uppercaseContent ); // este archivo se crea en la ruta que le indico con el outputDir y de manera dinámica crea la carpeta si no existe con el / o \ pertinente al sistema operativo
  // await writeFile( `${ outputDir }/archivo-uppercase.txt`, uppercaseContent ); // este archivo se crea en la ruta que le indico con el outputDir
  console.log( 'Archivo reescrito' );

  // para recuperar el nombre del archivo sin la extensión
  const fileName = basename( outputFilePath );
  console.log( fileName );

  // para recuperar la extensión del archivo
  const fileExtension = extname( outputFilePath );
  console.log( fileExtension );

} else {
  console.log( 'Permiso de escritura denegado' );
}