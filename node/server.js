import { createServer } from 'node:http'

// CUANDO CREAS UN SERVIDOR LO MÍNIMO INDISPENSABLE ES DECIRLE EL PUERTO
const port = 3000;

const server = createServer( ( req, resp ) => {
  // un servidor como mínimo tiene que tener 2 cosas: request y response. una forma de escuchar y otra de devolvercosas
  resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )
  resp.end( 'ola de locos 😅' )
} )

server.listen( port, () => {
  console.log( `Server running on localhost:${ port }` );
} )
