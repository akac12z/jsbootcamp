

// evento para cuando cambia un valor de los select
const filterLocationsForm = document.querySelector( '#filter-location' );
// const jobsListings = document.querySelectorAll( '.job-listing-card' ); // si tengo esto fuera del listener y estoy usando el fetch, no tendrá la capacidad de usar los filtros porque en el momento en el que se ejecuta este código, los artículos aún no existen en el DOM, por lo que no los puede seleccionar. Hay que ponerlo dentro del fetch o como lo he puesto yo aquí, fuera del listener pero después de que se hayan creado los artículos

filterLocationsForm.addEventListener( 'change', ( event ) => {
  const jobsListings = document.querySelectorAll( '.job-listing-card' ); // para asegurarme de que los artículos ya existen en el DOM cuando se ejecuta este listener
  // console.log( jobsListings );

  // console.log( filterLocationsForm.value ); // esto da el valor de la selección y no el nombre del elemento
  // console.log( event.target.value );
  const selectedValue = filterLocationsForm.value;
  console.log( selectedValue );


  jobsListings.forEach( job => {
    // es location o techonology porque es justo lo que tengo después del "data-"
    const jobTechnology = job.dataset.technology; // accedo al atributo data-technology del artículo
    // const jobLocation = job.dataset.location; // accedo al atributo data-location del artículo


    // otra forma de recuperar el dataset usando getAttributre -> pero no solo puedes recuperar el data sino cualquier atributo que tenga el elemento, lo único que tienes que hacer es pasarle el nombre del atributo
    // const jobLocation = job.getAttribute( 'data-location' ); // pero hay que el atributo entero
    // si quiero el atributo class
    const jobLocation = job.getAttribute( 'data-location' );
    // la forma "nativa" es la de dataset aunque ambas funcionan igual

    /*if ( selectedValue === '' || selectedValue === jobLocation ) {
      // job.style.display = 'flex'; // muestro el trabajo -> pero es un poco mala practica porque estoy añadiendo un estilo en línea que no existe, lo ideal es tener un dilplay none y quitarlo desde js y así es más sencillo de mantener
      job.classList.remove( 'is-hidden' ); // quito la clase hidden para mostrar el trabajo
    } else {
      job.classList.add( 'is-hidden' ); // oculto el trabajo
    }*/

    // otra forma de modificar los estilos siendo mucho más específicos entendiendo cuando se tienen qeu mostrar los estilos
    const isShown = selectedValue === '' || selectedValue === jobLocation;
    job.classList.toggle( 'is-hidden', !isShown ); // si isShown es true, quita la clase is-hidden, si es false, añade la clase is-hidden
    // con este condicional nos podemos quitar el if else de arriba y dejarlo todo en una sola línea
  } )
} )
