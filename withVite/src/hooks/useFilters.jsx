import { useEffect, useState, useRef } from "react";

// import jobsData from "../../../data.json";

const MAX_RESULT_PER_PAGE = 7;
const FIRST_PAGE_RESULT = 1;
const FIRST_TEXT_FILTER = "";
const FIRST_JOBS = [];
const FIRST_TOTAL_JOBS = 0;
const IS_LOADING = true;
const apiRUL = "https://jscamp-api.vercel.app/api/jobs";
const VOID_FILTERS = { technology: "", location: "", experienceLevel: "" };

export function useFilters() {
	const [filters, setFilters] = useState(VOID_FILTERS);

	const [textToFilter, setTextToFilter] = useState(FIRST_TEXT_FILTER);
	const [currentPage, setCurrentPage] = useState(FIRST_PAGE_RESULT);
	const [jobs, setJobs] = useState(FIRST_JOBS); // este primer estado es un problema porque no está teniendo nada y al hacer el primer .map no puede recuperar nada del undefined. por esto creo el total y setTotal
	const [total, setTotal] = useState(FIRST_TOTAL_JOBS);
	const [isLoading, setIsLoading] = useState(IS_LOADING);

	const searchBarRef = useRef(); // esta variable es la que va a hacer que los inputs del search Bar se borren al pulsar el botón unfliter

	/*LOS FILTROS DEBERÍAN HACERSE EN EL BACKEND, POR ENDE, DE AQUÍ LOS VAMOS A COMENTAR*/
	/*

	// esta es par ala búsqueda por filtro
	const jobFilterByFilters = jobsData.filter((job) => {
		// .filter() recorre cada trabajo y decide si incluirlo en el resultado final.
		// Para cada criterio (tecnología, ubicación, experiencia):
		// 1. Si el filtro está vacío (""), la condición es true y no filtra nada.
		// 2. Si tiene un valor, lo compara con la propiedad del trabajo ignorando mayúsculas/minúsculas.
		// Se usa && para asegurar que el trabajo cumpla con todos los filtros activos simultáneamente.

		// hacemos la lógica para entender cómo hacen match los filtros
		const matchText =
			textToFilter === "" ||
			job.title.toLowerCase().includes(textToFilter?.toLowerCase()) ||
			job.description.toLowerCase().includes(textToFilter?.toLowerCase()); // significa si no hay nada escrito, la condición es true y no filtra nada y se muestra todo O si lo que escribe el usuario en minuscula hace match (está incluido) en el título que ha puesto la persona en el json hará match
		const matchTech =
			filters.technology === "" ||
			job.data.technology.toLowerCase() === filters.technology.toLowerCase(); // si no filtra por nada, se muestra todo O si filta y el filtro en lower case hace match con la tecnología del json habvrá hecho match y así tanto para el location como para el experience
		const matchLocation =
			filters.location === "" ||
			job.data.location.toLowerCase() === filters.location.toLowerCase();
		const matchExperience =
			filters.experience === "" ||
			job.data.level.toLowerCase() === filters.experience.toLowerCase();

		return (
			// como queremos que los filtros hagan match todos ya que si uno no hace match se mostrará todo lo relacionado con ese filtro, devolvemos topdas las const
			matchText && matchTech && matchLocation && matchExperience
		);
	});

	// esta es para la búsqueda por texto (pero si el filtrado del texto es vacio y está usando el filtrado por filtro, usa el filtro)
	const jobFilterByTextFilter =
		textToFilter === ""
			? jobFilterByFilters // si el texto es vacio, muestra todos los resultados o lo que haya en los filters
			: jobFilterByFilters.filter(
					(job) =>
						job.title.toLowerCase().includes(textToFilter?.toLowerCase()) ||
						job.description.toLowerCase().includes(textToFilter?.toLowerCase())
			  ); // si no, filtra por el texto y a través del título hace match con el texto que se escribe

				
				// const totalPages = Math.ceil(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia arriba
				// const totalPages = Math.floor(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia abajo
				
				const pageResults = jobFilterByTextFilter.slice(
					(currentPage - 1) * MAX_RESULT_PER_PAGE, // esto es para que la página 1 sea la primera que es el primer elemento del array
					currentPage * MAX_RESULT_PER_PAGE
					); // esto es para que la página 2 sea la segunda que es el segundo elemento del array y cada vez que cambie de página se vayan sumando 5. del 0 al 5 resultados, del 5 al 10 resultados, del 10 al 15 resultados, etc
					
	*/

	// en componentes de react, el fetch de datos tienes que hacerlos dentro de un useEffecr
	useEffect(() => {
		async function fetchJobs() {
			try {
				setIsLoading(true);
				// para que la funcionalidad de filers a través del fetch funcione, tienes que tener primero la llamado a los filtros y leerlos y estos pasárselo a la url
				const params = new URLSearchParams(); // para obtener y crear los params en la url
				if (textToFilter) params.append("text", textToFilter);
				if (filters.technology) params.append("technology", filters.technology);
				if (filters.location) params.append("type", filters.location);
				if (filters.experienceLevel)
					params.append("level", filters.experienceLevel);

				// y para mostrar el offset y el page limit necesitas los siguientes cálculos
				const offset = (currentPage - 1) * MAX_RESULT_PER_PAGE; // calculamos la cantidad de resultados que quieres "saltarte" -> en la primera página 0, en la segunda quieres los MAX_RESULT... primeros y así sucesavamente
				params.append("limit", MAX_RESULT_PER_PAGE); // crear un param que te diga cuántos resultados por búsqueda
				params.append("offset", offset); // mandamos el offset

				const queryParams = params.toString(); // para pasar los parámetros que tengo en params

				const queryUrl = apiRUL + `?${queryParams}`;
				// console.log("URL con parámetros:", queryUrl); // Debug para ver la URL completa
				// console.log("Filtros actuales:", filters); // Debug para ver los filtros

				const response = await fetch(queryUrl);
				// console.log(response);

				const json = await response.json();
				// console.log(json);

				setJobs(json.data); // guardamos el array de la data de la api
				setTotal(json.total); // devuelvo el total de los results
			} catch (error) {
				console.error("Error al recuperar los datos");
				setIsLoading(false);
			} finally {
				setIsLoading(false);
			}
		}

		fetchJobs();
	}, [filters, textToFilter, currentPage]); // si esto está vacío, solo se renderizará una vez, y es útil si no quieres interactividad pero si necesitas que se refresque la llamada a la api cada vez que un filtro se modifica, necesitas decirle qué tiene que estar observando para que cuando cambie, hacer la llamada

	const totalPages = Math.ceil(total / MAX_RESULT_PER_PAGE); // como estoy filtrando los resultados, el total de páginas se va a ir cambiando y por ende, la paginación y esta dependerá de la cantidad de resultados que tenga y el MAX_RESULT_PER_PAGE
	const handlePageChange = (page) => {
		// console.log("Page changed to:", page);
		setCurrentPage(page);
	};
	const handleSearch = (filters) => {
		// maneja la búsqueda
		setFilters(filters);
		setCurrentPage(1);
		// console.log(filters);
	};

	const handleTextFilter = (text) => {
		// esta es para filtrar mientras se está escribiendo en el input
		setTextToFilter(text); // empieza a filtrar desde un "" y mientras escribe va escuchando el texto que se escribe y va aplicando el filtro
		setCurrentPage(1); // cuando se aplica el filtro se vuelve a la página 1 porque no tiene sentido mantener en la página ya que puede ser que no hayan mas páginas
	};

	// tarea: crear un btn para eliminar los filtros

	const hasActiveFilters =
		filters.experienceLevel || filters.technology || filters.location;
	// console.log({ "has filters?": hasActiveFilters });

	const handleResetFilters = () => {
		if (hasActiveFilters !== VOID_FILTERS) setFilters(VOID_FILTERS);
		// e.preventDefault();

		searchBarRef.current.value = ""; // hago el que current sea ""
		// textToFilter(""); // hago que el texto sea "" -> esto no funciona porque no es una función, no puedo llamar a un valor para que se ejecute, necesito llamar a una función que sete el valor
		handleTextFilter(""); // hago que el texto sea ""
	};

	return {
		handlePageChange,
		handleSearch,
		handleTextFilter,
		handleResetFilters,
		jobs,
		total,
		isLoading,
		totalPages,
		currentPage,
		textToFilter,
		searchBarRef,
	};
}
