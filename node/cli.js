import { readdir, stat } from "node:fs/promises";
import { join } from "node:path"; // siempre que se trabaje con archivos vamos a tener que traer el join

// 1. recuperar la carpeta a listar
const dir = process.argv[ 2 ] ?? '.' // es la 2 pq la 0 es el propio ejecutable de node y la 1 es el archivo
// console.log( args );

// 2. formateo de tamaños
const formatBytes = ( size ) => {
  if ( size < 1024 ) return `${ size } B`
  return ( size / 1024 ).toFixed( 2 ) + ' KB'
}

// 3. leer los nombres, sin info de la carpeta

const files = await readdir( dir )
// console.log( files );

// 4. recuperar la info de los files a través de un Promise.all (pq son operaciones asíncronas y .all pq son muchas y no un único)
const entries = await Promise.all(
  files.map( async ( name ) => {
    const fullPath = join( dir, name )
    const info = await stat( fullPath )
    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes( info.size )
    }
  } ) )


// 5. ordenar alfabéticamente
entries.sort( ( a, b ) => a.name.localeCompare( b.name ) )

// 6. poner promero los folders y luego los archivos
entries.sort( ( a, b ) => { // hacemos un sort por tipo pero la diferencia que ahora vamos a comparar por tipo y no por nombre
  if ( a.isDir && !b.isDir ) return -1
  if ( !a.isDir && b.isDir ) return 1
  return 0
  // cuando es -1 le dices a sort que a es true (en este caso un dir) y lo pone antes que b, pero si a no es un dir, sale 1 lo que dice que b es el dir y a un file. y si es 0 es qeu ambos son iguales y los dejes com están
} )

for ( const entry of entries ) {
  // para renderizar la info
  // console.log( entry );

  const icon = entry.isDir ? '📁' : '📄'
  const size = entry.isDir ? '-' : entry.size

  console.log( `${ icon } ${ entry.name.padEnd( 30 ) } ${ size }` );

}
