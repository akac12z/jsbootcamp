import { useEffect, useState, useRef } from "react";
import { useRouter } from "../hooks/useRouter";

// import jobsData from "../../../data.json";

const MAX_RESULT_PER_PAGE = 7;
const FIRST_TOTAL_JOBS = 0;
const FIRST_PAGE_RESULT = 1;
const FIRST_TEXT_FILTER = "";
const FIRST_JOBS = [];
const IS_LOADING = true;
const API_URL = "https://jscamp-api.vercel.app/api/jobs";
const VOID_FILTERS = { technology: "", location: "", experienceLevel: "" };

export function useFilters() {
	const { navigateTo } = useRouter();
	const [total, setTotal] = useState(FIRST_TOTAL_JOBS);
	const [isLoading, setIsLoading] = useState(IS_LOADING);
	const totalPages = Math.ceil(total / MAX_RESULT_PER_PAGE); // como estoy filtrando los resultados, el total de páginas se va a ir cambiando y por ende, la paginación y esta dependerá de la cantidad de resultados que tenga y el MAX_RESULT_PER_PAGE
	const searchBarRef = useRef(); // esta variable es la que va a hacer que los inputs del search Bar se borren al pulsar el botón unfliter
	const [jobs, setJobs] = useState(FIRST_JOBS); // este primer estado es un problema porque no está teniendo nada y al hacer el primer .map no puede recuperar nada del undefined. por esto creo el total y setTotal

	// const [textToFilter, setTextToFilter] = useState(FIRST_TEXT_FILTER); // si mantengo esto, el problema que se crearía sería que no puedes mantener el estado de la url al refrescar. si tuvieras ?q=react, al refrescar, se volvería a la página inicial
	const [textToFilter, setTextToFilter] = useState(() => {
		const params = new URLSearchParams(window.location.search); // queremos que el valor por defecto sea el que existe en el urlSearchParams
		return params.get("text") || ""; // devolvemos la url con el param del text y si no hay, no se devuelve nada
	});
	// const [currentPage, setCurrentPage] = useState(FIRST_PAGE_RESULT); // pasaría exactamente lo mismo si asignas el valor por defecto 1, al refrescar  y volver a cargarlo todo, todo volvería al estado inicial
	const [currentPage, setCurrentPage] = useState(() => {
		const params = new URLSearchParams(window.location.search); // queremos que el valor por defecto sea el que existe en el urlSearchParams
		const page = Number(params.get("page")); // recuperamos de los params el page y los hacemos númeor para validar que nadie en la url pueda poner algo distintos y si lo pone, que lo redirija a donde yo quiero (la pgáina 1)
		const isValidURL = Number.isNaN(page) && page > 1 && page <= totalPages; // he intentado hacer todas las comprobaciones posibles para que no de error
		return isValidURL ? page : 1; // si el texto de la url es un número, le devuelve a la página de dicho número, y si no lo es, le da 1
	});
	// const [filters, setFilters] = useState(VOID_FILTERS); // igual que las anteriores, si lo hardcodeas, al refrescar se pierde el estado
	const [filters, setFilters] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		return {
			technology: params.get("technology") || "",
			location: params.get("type") || "",
			experienceLevel: params.get("level") || "",
		};
	});

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

				const queryUrl = API_URL + `?${queryParams}`;
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

	// efecto para ver el cambio en la url
	useEffect(() => {
		const params = new URLSearchParams(); // creas los parámetros

		// buscar tener todos los filtros que tienes y que pueden modificarse en los params
		if (textToFilter) params.append("text", textToFilter);
		if (filters.technology) params.append("technology", filters.technology);
		if (filters.location) params.append("type", filters.location);
		if (filters.experienceLevel)
			params.append("level", filters.experienceLevel);

		// si estás en la página 1 usas por defecto en la que estás, pero si es mayor a 1 es cuando vas a construir la url
		if (currentPage > 1) params.append("page", currentPage); // creas la paginación con el page

		//creas la nueva URL con los params,
		const newURL = params.toString()
			? `${window.location.pathname}?${params.toString()}` // si existen params le añado al pathname aquellos que existan
			: `${window.location.pathname}`; // si no hay params, devuelvo la url en la que está
		// tb podrías poner /search?{{aquí los params}} pero el problema de esto es que si cambia el /search, te toca buscar en el código a mano y cmabiarlo

		// usas el navigateTo del useRouter para navegar entre páginas
		navigateTo(newURL);
	}, [filters, currentPage, textToFilter, navigateTo]); // tb hay que pasarle el navigateTo por si cambiase

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
