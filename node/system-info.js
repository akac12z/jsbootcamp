import os from "node:os"; // es buena practica importar los modulos de node de esta forma "node:..." para diferenciarlo de los modulos de terceros que puedan tener el mismo nombre y así poder decirle a node si el que queremos es el suyo nativo u otra dependencia que hemso instalado

import ms from "ms"; // dependencia para cambiar el formato de número de tiempo

console.log( 'Tipo de OS:', os.type() );
console.log( 'Plataforma', os.platform() );
console.log( 'Arquitectura', os.arch() );
console.log( 'Memoria libre', os.freemem() );
console.log( 'Memoria total', os.totalmem() );
console.log( 'CPUs', os.cpus() );
console.log( 'Hostname', os.hostname() );
console.log( 'Uptime', os.uptime() );
console.log( 'Uptime con ms en días (si los hubiere)', ms( os.uptime() * 1000 ) );

console.log( 'UserInfo', os.userInfo() );

