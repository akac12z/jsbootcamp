import { createServer } from 'node:http'

// CUANDO CREAS UN SERVIDOR LO MÍNIMO INDISPENSABLE ES DECIRLE EL PUERTO
// const port = 3000; // aunque las buenas prácticas son usar las variables de entorno para que no sepa nadie cuál usas

// para simplificar la forma de mandar json cerar una función que lo haga
const sendJSON = ( resp, data, statusCode ) => {
  resp.setHeader( 'Content-Type', 'application/json; charset=utf-8' )
  resp.end( JSON.stringify( data ) )
  resp.statusCode = statusCode;
}

process.loadEnvFile(); // esto le dice a node que cargue el archivo .env
const port = process.env.PORT ?? 3000;

const server = createServer( ( req, resp ) => {
  // para solo soportar el m´étodo GET pq no queires qeu pudan hacer cualquier cosa
  const { method, url } = req;
  if ( method !== 'GET' ) {
    return sendJSON( resp, { error: 'method not allowed' }, 405 )
  }

  // un servidor como mínimo tiene que tener 2 cosas: request y response. una forma de escuchar y otra de devolvercosas
  // resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )

  if ( url === "/" ) {
    resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )
    return resp.end( 'ola de locos 😅' )
  }

  // para ver qué tan bien está tu servidor se suele usar el /health que se llama healthcheck y es interesante para saber si se ha caido, si se ha tenido que reiniciar o el tiempo que lleva en funcionamiento
  if ( url === "/health" ) {
    return sendJSON( resp, { status: 'ok', 'uptime': process.uptime() }, 200 )
  }

  if ( url === "/users" ) {
    // resp.setHeader( 'Content-Type', 'application/json; charset=utf-8' )// la cabecera aquí es json
    // return resp.end( JSON.stringify( [ { id: 1, name: 'chema' } ] ) )
    return sendJSON( resp, [ { id: 1, name: 'chema' }, { id: 2, name: 'bob' } ], 200 )
  }

  return sendJSON( resp, { error: 'not found' }, 404 )
} )

server.listen( port, () => {
  console.log( `Server running on localhost:${ port }` );
} )


// si quiero que los cambios se vean sin tener que bajar y subir el server, necesito la flag --watch cuando lo vaya a levantas -> node --watch server.js