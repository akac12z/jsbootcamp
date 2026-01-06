// ASI ES COMO FUNCIONA REACT ROUTER A MUY GROSO MODO. ESTÁ BIEN SABER CÓMO SE HACEN CIERTAS COSAS PERO USAR REACT ROUTER ES MÁS ÚTIL Y POTENTE

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

// CUSTOM HOOK
export function useRouter() {
	const navigate = useNavigate(); // para navegar
	const location = useLocation(); // para encontrar la url en la que estoy

	const navigateTo = (path) => {
		navigate(path);
	};
	return {
		currentPath: location.pathname,
		navigateTo,
	};
}
// // CUSTOM HOOK
// export function useRouter() {
// 	// necesito poder saber en qué path estoy para poder moverme entre páginas
// 	const [currentPath, setCurrentPath] = useState(window.location.pathname);

// 	// este use effect se crea para que cada vez que cambie la url, actualice el estado y poder navegar entre las páginas simulando una SPA (single page application) y así no recargar todos los recursos cada vez que cambia de pag el user
// 	useEffect(() => {
// 		const handleLocationChange = () => {
// 			// creamos una función que maneje el cambio de url a través de mirar en el window el pathname
// 			setCurrentPath(window.location.pathname); // cada vez que cambie la url, actualizara el estado a la nueva url
// 		};

// 		// haremos que la handleLocationChange se ejecute cada vez que se de el evento popstate ("popstate acording to MDN is fired when the active history entry changes while the user navigates the session history") por ende, escuchamos este evento y ejecutamos la función handleLocationChange
// 		window.addEventListener("popstate", handleLocationChange);

// 		// cuando se haya ejecutado la funcion y guardado el pathname, nos "desuscribimos" del evento popstate para evitar que se repita hasta que se vuelva a ejecutar el useEffect en una nueva renderización
// 		return () => {
// 			window.removeEventListener("popstate", handleLocationChange);
// 		};
// 	}, []);

// 	function navigateTo(path) {
// 		// cuando haces click en el link, se va a la página que corresponde. el .pushState() es el que va a actualizar el estado de la historia (pagina) y que no devuelva nada como dato, el segundo dato no se usa y el tercero es la url que se va a actualizar
// 		window.history.pushState({}, "", path);

// 		// cuando haces click en el link, se va a la página que corresponde. el .dispatchEvent() es el que va a disparar el evento que se va a ejecutar. el PopStateEvent es el evento que se va a disparar
// 		window.dispatchEvent(new PopStateEvent("popstate"));
// 	}
// 	return { currentPath, navigateTo };
// }
