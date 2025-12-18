

// para añadir los listings al html
const jobsContainer = document.querySelector( '.jobs-listings' );
// console.log( 'antes del fetch' ); // primero se ejecuta este 

fetch( "./data.json" ) // es asíncrono
  .then( resp => resp.json() )
  .then( ( jobs ) => { // indistintamente ponga json o data o jobs da lo mismo
    // console.log( 'fetch' ); // terciero este log (por la asincronía)
    // console.log( jobs )
    jobs.forEach( ( job ) => {
      const article = document.createElement( 'article' );

      // para añadir las clases y data elements al elemento
      article.classList = 'job-listing-card';

      // console.log( job );


      article.dataset.level = job.data.level;
      article.dataset.location = job.data.location;
      article.dataset.technology = job.data.technology;

      // console.log( job.data.location );

      // creamos el html interno
      article.innerHTML = `
      <div>
          <h3>${ job.title }</h3>
          <small>${ job.company } | ${ job.location }</small>
          <p>
            ${ job.description }
          </p>
        </div>
        <button
          class="btn-apply-job"
          id="apply-button"
        >
          Aplicar
        </button>
    ` ;

      // añadimos el artículo al contenedor
      jobsContainer.appendChild( article );
    } )

  } )

// console.log( 'después del fetch' ); // segundo este log