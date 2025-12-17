//querySelectorAll devuelve una NodeList, por lo que podemos usar forEach directamente. es decir, siempre te va a devolver una lista pero el querySelector solo un elemento y si no existe devuelve null por ende, para que no diese error tendrías que hacer un ternario

/*
const btn = document.querySelector( '.btn-apply-job' );
if (btn !== null) {
  btn.addEventListener( 'click', () => {
    btn.textContent = 'Aplicado!';
    btn.classList.add( 'isApplied' );
    btn.disabled = true;
  } );
}
*/

// esto funciona pero no se hace así de la manera correcta
/*const btn = document.querySelectorAll( '.btn-apply-job' );
btn.forEach( ( button ) => {
  button.addEventListener( 'click', () => {
    button.textContent = 'Aplicado!';
    button.classList.add( 'isApplied' );
    button.disabled = true;
  } );
} );
*/

//EJEMPLOS DE FILTROS 

/*
const searchJobInput = document.querySelector( "#job-search-input" );
searchJobInput.addEventListener( 'input', ( e ) => {
  console.log( searchJobInput.value );
} )
searchJobInput.addEventListener( 'blur', ( e ) => {
  console.log( "se pierde el foco" );
  // este (blur) se dispara cuando el campo pierde el foco
} )*/

// para manejar formularios es muy importante el evento submit
/*const jobSearchForm = document.querySelector( "#job-search-form" );
jobSearchForm.addEventListener( 'submit', ( e ) => {
  e.preventDefault(); // con esto evitamos que se recargue la página al hacer submit
  
  // en el manejo de formularios, cuando ponese name en los inputs, esos name son los que se envían al servidor
  // por ejemplo, si tenemos un input con name="search", al hacer submit se enviará search=valorDelInput y en la url se verá ?search=valorDelInput mientras que si no lo pones, esa breadcrumb no se verá y quizá sea una "mala" practica
  

  console.log( "formulario enviado" );
} )*/

// document.addEventListener( "keydown", ( e ) => {
//   // para saber qué tecla ha pulsado
//   console.log( e.key );

// } )



//la buena practica es crear una sección que englobe todos los botones (que en este caso está dentro de la sección jobs-listing y dentro de cada una de las jobs-cards está el btn) y hacer un solo event listener a esa sección y luego identificar el botón que se ha clickeado usando event.target
// a este efecto se le llama event delegation, es decir, que burbujea el evento hasta el elemento padre que tiene el event listener. va del btn al siguiente padre, de este, al siguiente hasta llegar al elemento que tiene el event listener que es el jobs-listings
const jobListingSections = document.querySelector( '.jobs-listings' );

jobListingSections?.addEventListener( 'click', ( event ) => {
  console.log( event.target );

  const elementTarget = event.target;

  if ( elementTarget.classList.contains( 'btn-apply-job' ) ) {
    elementTarget.textContent = 'Aplicado!';
    elementTarget.classList.add( 'isApplied' );
    elementTarget.disabled = true;
  }
} )

// evento para cuando cambia un valor de los select
const filterLocationsForm = document.querySelector( '#filter-location' );
const jobsListings = document.querySelectorAll( '.job-listing-card' );

filterLocationsForm?.addEventListener( 'change', ( event ) => {
  console.log( filterLocationsForm.value ); // esto da el valor de la selección y no el nombre del elemento
  // console.log( event.target.value );
  const selectedValue = filterLocationsForm.value;

  jobsListings.forEach( job => {
    // es location o techonology porque es justo lo que tengo después del "data-"
    const jobTechnology = job.dataset.technology; // accedo al atributo data-technology del artículo
    const jobLocation = job.dataset.location; // accedo al atributo data-location del artículo

    if ( selectedValue === '' || selectedValue === jobLocation ) {
      job.style.display = 'flex'; // muestro el trabajo
    } else {
      job.style.display = 'none'; // oculto el trabajo
    }
  } )
} )