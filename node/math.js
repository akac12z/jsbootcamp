/* usar exports de la misma forma que la usas en el frontend export/import en node no es como node por defecto funciona
en node, si queiro tener algo importado, la extensión a la hora de imporar es obligatorioa. en los archivos del frontend no es necesario pq está siendo compilado en buildtime mientras que node lo hace en runtime

hay 2 formas de hacer los imports/exports en node:

1. usar este export / import -> esto era common js
  export const add = ( a, b ) => a + b;
  import { add } from "./math.js"; <- tendrás que tener muy en cuenta que la extensión esté

2. usar module.exports / require 
  module.exports = {
    add: ( a, b ) => a + b,
  };
  const sum = require("./math.js");

  esta segunda es pq antes node usaba su propio sistema de módulos nativo

  ---
  en todos los proyectos qeu hagas, hasta que node no lo implemente de manera nativa y oficial, que lo harán antes o después, te toca indicar en el package.json quí tipo de módulo quieres usar para que no haya problemas de rendimiento ni warnings en la terminal.

  para crarlo necesitas:
  1. tener en tu proyecto un package.json
  2. indicar en el package.json el type: "module" -> como mínimo debe haber eso, ya luego puedes ir añadiendo más cosas
*/

export const add = ( a, b ) => a + b;