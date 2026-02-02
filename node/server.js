import { createServer } from 'node:http'

// CUANDO CREAS UN SERVIDOR LO MÍNIMO INDISPENSABLE ES DECIRLE EL PUERTO
// const port = 3000; // aunque las buenas prácticas son usar las variables de entorno para que no sepa nadie cuál usas

process.loadEnvFile(); // esto le dice a node que cargue el archivo .env
const port = process.env.PORT ?? 3000;

const server = createServer( ( req, resp ) => {
  // un servidor como mínimo tiene que tener 2 cosas: request y response. una forma de escuchar y otra de devolvercosas
  resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )
  resp.end( 'ola de locos 😅' )
} )

server.listen( port, () => {
  console.log( `Server running on localhost:${ port }` );
} )


// si quiero que los cambios se vean sin tener que bajar y subir el server, necesito la flag --watch cuando lo vaya a levantas -> node --watch server.js