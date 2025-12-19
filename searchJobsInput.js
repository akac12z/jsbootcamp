// tarea: capturar el valor del input de búsqueda y filtrar por título de empleo
const searchJobInput = document.querySelector( "#job-search-form" );
const jobsTitleElements = document.querySelectorAll( ".job-listing-card" );

searchJobInput.addEventListener( "input", ( event ) => {
  event.preventDefault();
  const updatedValue = event.target.value;
  console.log( updatedValue );

  const jobsListings = document.querySelectorAll( '.job-listing-card' ); // para asegurarme de que los artículos ya existen en el DOM cuando se ejecuta este listener
  // console.log( jobsListings );

  jobsListings.forEach( job => {
    const jobTitle = job.querySelector( "h3" ).textContent.toLowerCase().trim();
    const searchTerm = updatedValue.toLowerCase().trim();

    const isShow = jobTitle.includes( searchTerm );

    job.classList.toggle( "is-hidden", !isShow ); // si isShow es true, quita la clase is-hidden, si es false, añade la clase is-hidden
  } )
} )
