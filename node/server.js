import { createServer } from 'node:http'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'

// CUANDO CREAS UN SERVIDOR LO MÍNIMO INDISPENSABLE ES DECIRLE EL PUERTO
// const port = 3000; // aunque las buenas prácticas son usar las variables de entorno para que no sepa nadie cuál usas

process.loadEnvFile(); // esto le dice a node que cargue el archivo .env
const port = process.env.PORT ?? 3000;

// para simplificar la forma de mandar json cerar una función que lo haga
const sendJSON = ( resp, statusCode, data ) => {
  resp.statusCode = statusCode;
  resp.setHeader( 'Content-Type', 'application/json; charset=utf-8' )
  resp.end( JSON.stringify( data ) )
}

// creamos los users "maual" por ahora
const users = [
  {
    "id": 1,
    "name": "chema"
  },
  {
    "id": 2,
    "name": "bob"
  },
  {
    "name": "luluchia",
    "id": "096c6f67-b777-4de1-9096-0e2beddf470c"
  },
  {
    "name": "luffy",
    "id": "097d7db9-fb5d-4aa3-8535-fe8872191e5e"
  },
  {
    "name": "cz",
    "id": "fd04cea2-f5e4-4744-b3ef-7de3d6b6e7e2"
  }
]


const server = createServer( async ( req, resp ) => {
  // para solo soportar el m´étodo GET pq no queires qeu pudan hacer cualquier cosa
  const { method, url } = req;
  if ( method === 'GET' ) { // el método GET es para pedir información
    // return sendJSON( resp, { error: 'method not allowed' }, 405 )
    // un servidor como mínimo tiene que tener 2 cosas: request y response. una forma de escuchar y otra de devolvercosas
    // resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )

    if ( url === "/" ) {
      resp.setHeader( 'Content-Type', 'text/plain; charset=utf-8' )
      return resp.end( 'ola de locos 😅' )
    }

    if ( url === "/users" ) {
      return sendJSON( resp, 200, users )
    }

    // para ver qué tan bien está tu servidor se suele usar el /health que se llama healthcheck y es interesante para saber si se ha caido, si se ha tenido que reiniciar o el tiempo que lleva en funcionamiento
    if ( url === "/health" ) {
      return sendJSON( resp, 200, { status: 'ok', uptime: process.uptime() } )
    }
  }


  // para crear usuarios necesitas el método POST
  if ( method === 'POST' ) {
    if ( url === "/users" ) {
      // resp.setHeader( 'Content-Type', 'application/json; charset=utf-8' )// la cabecera aquí es json
      // return resp.end( JSON.stringify( [ { id: 1, name: 'chema' } ] ) )
      // return sendJSON( resp, users, 200 )

      // necesitas recuperar el JSON que le pasa el usuario con su nombre -> usamos el metodo nativo de node: json
      const body = await json( req );

      if ( !body || !body.name ) {
        return sendJSON( resp, 400, { error: 'name is required' } )
      }

      const newUser = {
        name: body.name,
        id: randomUUID()
      }

      users.push( newUser )

      return sendJSON( resp, 201, { message: 'user created', user: newUser.name } )
    }

  }

  return sendJSON( resp, 404, { error: 'not found' } )
} )

server.listen( port, () => {
  console.log( `Server running on localhost:${ port }` );
} )


// si quiero que los cambios se vean sin tener que bajar y subir el server, necesito la flag --watch cuando lo vaya a levantas -> node --watch server.js