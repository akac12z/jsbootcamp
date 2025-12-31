import { useState } from "react";

export function useSearchForm({
	onSearch,
	onFilter,
	idText,
	idTech,
	idLocation,
	idExperience,
	styles,
}) {
	const [searchText, setSearchText] = useState("");
	const handleSubmit = (e) => {
		// No usar preventDefault aquí porque es un onChange, no un submit
		// e.preventDefault();
		// console.log(e);

		// los useId crean un id único para cada elemento y dentro de los name del form, tener un magic string es algo que no es recomendable, es muy débil
		// console.log(e.target);

		// recuperamos la información de los filtros
		// hya diferencia entre el e.target y el e.currentTarget. el e.target es el elemento que está recibiendo el evento y el e.currentTarget es el elemento que está escuchando el evento por tanto, para hacerlo real time el que te interesa es el e.currentTaget para que no te salte el error de no hay un elemento del estilo HTMLInputElement en el target
		//! el e.target es el input y el e.currentTarget es el form y como estamos escuchando el evento del formulario y no del input (ese es el del text) te interesa el e.currentTarget
		const formData = new FormData(e.currentTarget); // esto devuelve todos los datos que tiene el form
		// console.log(formData);

		const filters = {
			// cons los filters estoy creando un objeto con los datos que vienen del form cada uno con su id que sería el name del select
			search: formData.get(idText),
			technology: formData.get(idTech),
			modalidad: formData.get(idLocation),
			nivel: formData.get(idExperience),
			// location: formData.get(idLocation),
			// experience: formData.get(idExperience),
		};
		console.log("Filtros enviados:", filters); // Debug para ver qué se está enviando
		onSearch(filters); // esta sería la forma de aplicar los filtros que sería una propiedad que
		onFilter(filters.search);
	};
	const handleTextChange = (e) => {
		// 	// maneja cuando cambia el texto de la búsqueda en real time gracias al evento onChange del input
		const text = e.target.value;
		setSearchText(text);
		onFilter(text);
	};

	// const handleReset = () => {
	// 	onSearch({});
	// 	onFilter("");
	// };

	const handleFocus = () => {
		const drawForm = document.querySelector(".onFocusClass");
		drawForm.classList.add(styles.onFocus);
	};
	const handleBlur = () => {
		const drawForm = document.querySelector(".onFocusClass");
		drawForm.classList.remove(styles.onFocus);
	};
	return {
		onSearch,
		onFilter,
		handleSubmit,
		handleTextChange,
		handleFocus,
		handleBlur,
	};
}
