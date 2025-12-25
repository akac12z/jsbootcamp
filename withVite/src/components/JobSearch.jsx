import styles from "./jobSearch.module.css";
import { useId } from "react";

function JobSearch({ onSearch, onTextFilter }) {
	const idText = useId();
	const idTech = useId();
	const idLocation = useId();
	const idExperience = useId();

	// 2 formas distintas de manejar el submit
	// 1. Usando el evento onSubmit del form qeu es darle al botón una vez escrito y usado el filtro
	// 2. Usando el evento onChange del input que es el que maneja en "real time" el input de la búsqueda

	const handleSubmit = (e) => {
		e.preventDefault();
		// los useId crean un id único para cada elemento y dentro de los name del form, tener un magic string es algo que no es recomendable, es muy débil

		// recuperamos la información de los filtros
		const formData = new FormData(e.target); // esto devuelve todos los datos que tiene el form
		const filters = {
			// cons los filters estoy creando un objeto con los datos que vienen del form cada uno con su id que sería el name del select
			search: formData.get(idText),
			technology: formData.get(idTech),
			location: formData.get(idLocation),
			experience: formData.get(idExperience),
		};

		onSearch(filters); // esta sería la forma de aplicar los filtros que sería una propiedad que
		// viene de las props de la App
		onTextFilter(filters.search);
	};

	// const handleTextChange = (e) => {
	// 	// maneja cuando cambia el texto de la búsqueda en real time
	// 	const text = e.target.value;
	// 	onTextFilter(text);
	// 	// console.log(text);
	// }

	const handleReset = () => {
		onSearch({});
		onTextFilter("");
	};

	const handleFocus = () => {
		const drawForm = document.querySelector(".hd");
		drawForm.classList.add(styles.onFocus);
	};
	const handleBlur = () => {
		const drawForm = document.querySelector(".hd");
		drawForm.classList.remove(styles.onFocus);
	};

	return (
		<section className={styles.jobsSearch}>
			<h1>Encuentra tu próximo trabajo</h1>
			<p>Explora miles de oportunidades en el sector tecnológico.</p>

			<form
				onSubmit={handleSubmit}
				id="job-search-form"
				role="search"
			>
				<div className={`hd ${styles.searchBar}`}>
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
						// onChange={handleTextChange}
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
						</optgroup>
						<optgroup label="Otras tecnologías">
							<option value="java">Java</option>
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
						<option value="remote">Remoto</option>
						<option value="cdmx">Ciudad de México</option>
						<option value="guadalajara">Guadalajara</option>
						<option value="bogota">Bogotá</option>
						<option value="monterrey">Monterrey</option>
						<option value="barcelona">Barcelona</option>
					</select>

					<select
						name={idExperience}
						id="filter-experience-level"
					>
						<option value="">Nivel de experiencia</option>
						<option value="junior">Junior</option>
						<option value="mid">Mid-level</option>
						<option value="senior">Senior</option>
						<option value="lead">Lead</option>
					</select>
					<button
						className={styles.submitBtn}
						type="submit"
					>
						Buscar
					</button>
					<button
						onReset={handleReset}
						className={styles.resetBtn}
						type="reset"
					>
						Reset
					</button>
				</div>
			</form>

			<span id="filter-selected-value"></span>
		</section>
	);
}

export default JobSearch;
