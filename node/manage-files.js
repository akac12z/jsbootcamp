import { mkdir, readFile, writeFile } from "node:fs/promises";

const content = await readFile( './archivo.txt', 'utf-8' );
// al readFile le pasamos la ruta que quieres que lea, el archivo.txt y el encoding utf-8 para que entienda los símbolos
console.log( content );

const outputDir = 'output/documents'; // la ruta que quiero crear
await mkdir( outputDir, { recursive: true } ); // el recursive es para que cree las carpetas si no exsisten de manera recursiva

// ahora voy a crear un archivo de escritura
const lowercaseContent = content.toLocaleLowerCase();
await writeFile( './archivo-uppercase.txt', lowercaseContent ); // creo el nuevo archivo con el writefile pq si hago sobre el archivo que ya tengo lo sobreescribiría
await writeFile( `${ outputDir }/archivo-uppercase.txt`, lowercaseContent ); // este archivo se crea en la ruta que le indico con el outputDir
console.log( 'Archivo reescrito' );

