import { useState } from "react";

import jobsData from "../../../data.json";

const MAX_RESULT_PER_PAGE = 5;
const FIRST_PAGE_RESULT = 1;
const FIRST_TEXT_FILTER = "";

export function useFilters() {
	const [filters, setFilters] = useState({
		technology: "",
		location: "",
		experience: "",
	});

	const [textToFilter, setTextToFilter] = useState(FIRST_TEXT_FILTER);
	const [currentPage, setCurrentPage] = useState(FIRST_PAGE_RESULT);

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

	const totalPages = Math.ceil(
		jobFilterByTextFilter.length / MAX_RESULT_PER_PAGE
	); // como estoy filtrando los resultados, el total de páginas se va a ir cambiando y por ende, la paginación y esta dependerá de la cantidad de resultados que tenga y el MAX_RESULT_PER_PAGE

	// const totalPages = Math.ceil(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia arriba
	// const totalPages = Math.floor(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia abajo

	const pageResults = jobFilterByTextFilter.slice(
		(currentPage - 1) * MAX_RESULT_PER_PAGE, // esto es para que la página 1 sea la primera que es el primer elemento del array
		currentPage * MAX_RESULT_PER_PAGE
	); // esto es para que la página 2 sea la segunda que es el segundo elemento del array y cada vez que cambie de página se vayan sumando 5. del 0 al 5 resultados, del 5 al 10 resultados, del 10 al 15 resultados, etc

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

	return {
		handlePageChange,
		handleSearch,
		handleTextFilter,
		pageResults,
		totalPages,
		currentPage,
	};
}
