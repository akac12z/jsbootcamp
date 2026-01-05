import { useState, useRef } from "react";

// let timeOutId = null; // no puede estar dentro del componente proqeu si no se cambiaría el valor cada vez que se ejecuta el hook y esto es para saber si se ha hecho una llamada <- esto es temporal porque tiene qe ser con el useRef y es mala práctica porque la variable se compartiría la variable

export function useSearchForm({
	onSearch,
	onFilter,
	idText,
	idTech,
	idLocation,
	idExperience,
	styles,
}) {
	const timeOutId = useRef(null); // permite mantener un valor independientemente del renderizado
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

		// esto siguiente es para el DEBOUNCE
		if (e.target.name === idText) return; // esto se debe a que ya estás manejando el estado del texto con el handleTextChange vs aquí que tb lo estarías haciendo y saría redundante

		const formData = new FormData(e.currentTarget); // esto devuelve todos los datos que tiene el form porqe está "mirando" hace el elemento <form>...</form> al cual estás clicando y está guardando es info en el formDara
		// console.log(formData);

		const filters = {
			// cons los filters estoy creando un objeto con los datos que vienen del form cada uno con su id que sería el name del select
			search: formData.get(idText),
			technology: formData.get(idTech),
			location: formData.get(idLocation),
			experienceLevel: formData.get(idExperience),
			// location: formData.get(idLocation),
			// experience: formData.get(idExperience),
		};
		// console.log("Filtros enviados:", filters); // Debug para ver qué se está enviando
		onSearch(filters); // esta sería la forma de aplicar los filtros que sería una propiedad que
		onFilter(filters.search);
		// console.log(e.currentTarget);
	};

	const handleTextChange = (e) => {
		// 	// maneja cuando cambia el texto de la búsqueda en real time gracias al evento onChange del input
		const text = e.target.value;
		setSearchText(text); // actualiza el input inmediatamente por lo que acada vez que el usuarios escribe, se hace tb una llamada a la API

		// DEBOUNCE: Cancela el timeout anterior con tal de esperar a que el usuario escriba y no haga peticiones incontroladas

		/* esto hace lo siguiente:
			si tengo un timeOutId distinto de null, cosa que pasará si el usuario escribe, el timeOut esperará 500 milisegundo hasta escuchar el cambio del texto y solo se mantendrá la última petición que se haya hecho en el onFilter(text)
		*/
		if (!timeOutId.current) clearTimeout(timeOutId.current); // tinees que acceder al .current porque es donde está el valor ya que el useRef te devuelve un objeto tal que así -> {current: "tu valor"}
		timeOutId.current = setTimeout(() => {
			onFilter(text); // esto no funciona porqeu solo retrasa pero los acumula, es decir, mantiene el estado de las teclas
		}, 500); // entre 300 y 500 ms es lo indicado para darle espacio al usuario a que le muestre sin que se note demasiado

		// onFilter(text);
	};

	// const handleReset = () => {
	// 	onSearch({});
	// 	onFilter("");
	// };

	//! tarea: unificar handleTextChange y handleChange

	const handleSearchChange = (e) => {
		// e.preventDefatult();

		const text = e.target.value;
		const formData = new FormData(e.currentTarget);
		const filters = {
			technology: formData.get(idTech),
			location: formData.get(idLocation),
			experienceLevel: formData.get(idExperience),
		};

		if (e.target.name === idText) {
			if (!timeOutId.current) clearTimeout(timeOutId.current);
			timeOutId.current = setTimeout(() => {
				onFilter(text);
			}, 500);
		} else {
			onSearch(filters);
		}
	};

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
		handleSearchChange,
		handleSubmit,
		handleTextChange,
		handleFocus,
		handleBlur,
	};
}
