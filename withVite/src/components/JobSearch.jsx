import styles from "./jobSearch.module.css";
import { useId } from "react";
import { useSearchForm } from "../hooks/useSearchForm";

function JobSearch({ onSearch, onFilter, onResetFilters }) {
	const idText = useId();
	const idTech = useId();
	const idLocation = useId();
	const idExperience = useId();

	const { handleTextChange, handleSubmit, handleFocus, handleBlur } =
		useSearchForm({
			idExperience,
			idLocation,
			idTech,
			idText,
			onSearch,
			onFilter,
			styles,
		});

	// 2 formas distintas de manejar el submit
	// 1. Usando el evento onSubmit del form qeu es darle al botón una vez escrito y usado el filtro
	// 2. Usando el evento onChange del input que es el que maneja en "real time" el input de la búsqueda

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	// console.log(e);

	// 	// los useId crean un id único para cada elemento y dentro de los name del form, tener un magic string es algo que no es recomendable, es muy débil
	// 	// console.log(e.target);

	// 	// recuperamos la información de los filtros
	// 	// hya diferencia entre el e.target y el e.currentTarget. el e.target es el elemento que está recibiendo el evento y el e.currentTarget es el elemento que está escuchando el evento por tanto, para hacerlo real time el que te interesa es el e.currentTaget para que no te salte el error de no hay un elemento del estilo HTMLInputElement en el target
	// 	//! el e.target es el input y el e.currentTarget es el form y como estamos escuchando el evento del formulario y no del input (ese es el del text) te interesa el e.currentTarget
	// 	const formData = new FormData(e.currentTarget); // esto devuelve todos los datos que tiene el form
	// 	// console.log(formData);

	// 	const filters = {
	// 		// cons los filters estoy creando un objeto con los datos que vienen del form cada uno con su id que sería el name del select
	// 		search: formData.get(idText),
	// 		technology: formData.get(idTech),
	// 		location: formData.get(idLocation),
	// 		experience: formData.get(idExperience),
	// 	};
	// 	onSearch(filters); // esta sería la forma de aplicar los filtros que sería una propiedad que
	// 	// viene de las props de la App
	// 	onFilter(filters.search);
	// };

	// const handleChanegeText = (e) => {
	// 	// 	// maneja cuando cambia el texto de la búsqueda en real time gracias al evento onChange del input
	// 	const text = e.target.value;
	// 	onFilter(text);
	// };

	// // const handleReset = () => {
	// // 	onSearch({});
	// // 	onFilter("");
	// // };

	// const handleFocus = () => {
	// 	const drawForm = document.querySelector(".onFocusClass");
	// 	drawForm.classList.add(styles.onFocus);
	// };
	// const handleBlur = () => {
	// 	const drawForm = document.querySelector(".onFocusClass");
	// 	drawForm.classList.remove(styles.onFocus);
	// };

	return (
		<section className={styles.jobsSearch}>
			<h1>Encuentra tu próximo trabajo</h1>
			<p>Explora miles de oportunidades en el sector tecnológico.</p>

			<form
				onChange={handleSubmit}
				// onSubmit={handleSubmit}
				id="job-search-form"
				role="search"
			>
				<div className={`onFocusClass ${styles.searchBar}`}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-search"
					>
						<path
							stroke="none"
							d="M0 0h24v24H0z"
							fill="none"
						/>
						<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
						<path d="M21 21l-6 -6" />
					</svg>

					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						onChange={handleTextChange}
						name={idText}
						id="job-search-input"
						// required // hago esto no required porque al hacer la tarea toda con el submit, si lo dejo required y uso los filtros, me obliga a tener que poner algo en el text y quiero poder poner o no, text
						type="text"
						placeholder="Buscar trabajos, empresas o habilidades"
					/>
				</div>

				<div className={styles.searchFilters}>
					<select
						name={idTech}
						id="filter-technology"
					>
						<option value="">Tecnología</option>
						<optgroup label="Tecnologías populares">
							<option value="javascript">JavaScript</option>
							<option value="python">Python</option>
							<option value="react">React</option>
							<option value="nodejs">Node.js</option>
							<option value="java">Java</option>
						</optgroup>
						<optgroup label="Otras tecnologías">
							<option value="csharp">C#</option>
							<option value="c">C</option>
							<option value="c++">C++</option>
							<option value="ruby">Ruby</option>
							<option value="php">PHP</option>
						</optgroup>
					</select>

					<select
						name={idLocation}
						id="filter-location"
					>
						<option value="">Ubicación</option>
						<option value="remoto">Remoto</option>
						<option value="guadalajara">Guadalajara</option>
						<option value="bogota">Bogotá</option>
						<option value="barcelona">Barcelona</option>
						<option value="madrid">Madrid</option>
						<option value="valencia">Valencia</option>
						<option value="bsas">Buenos Aires</option>
					</select>

					<select
						name={idExperience}
						id="filter-experience-level"
					>
						<option value="">Nivel de experiencia</option>
						<option value="junior">Junior</option>
						<option value="mid-level">Mid-level</option>
						<option value="senior">Senior</option>
					</select>
					{/* <button
						className={styles.submitBtn}
						type="submit"
					>
						Buscar
					</button>
					*/}

					<button
						onClick={onResetFilters}
						className={styles.resetBtn}
						type="reset"
					>
						Unfilter'
					</button>
				</div>
			</form>

			<span id="filter-selected-value"></span>
		</section>
	);
}

export default JobSearch;
