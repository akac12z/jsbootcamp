import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { NotFoundPage } from "./pages/404";

function App() {
	// necesito poder saber en qué path estoy para poder moverme entre páginas
	const [currentPage, setCurrentPath] = useState(window.location.pathname);

	let page = <NotFoundPage />;
	if (currentPage === "/") {
		page = <HomePage />;
	} else if (currentPage === "/search") {
		page = <SearchPage />;
	}

	// este use effect se crea para que cada vez que cambie la url, actualice el estado y poder navegar entre las páginas simulando una SPA (single page application) y así no recargar todos los recursos cada vez que cambia de pag el user
	useEffect(() => {
		const handleLocationChange = () => {
			// creamos una función que maneje el cambio de url a través de mirar en el window el pathname
			setCurrentPath(window.location.pathname); // cada vez que cambie la url, actualizara el estado a la nueva url
		}

		// haremos que la handleLocationChange se ejecute cada vez que se de el evento popstate ("popstate acording to MDN is fired when the active history entry changes while the user navigates the session history") por ende, escuchamos este evento y ejecutamos la función handleLocationChange
		window.addEventListener('popstate', handleLocationChange)

		// cuando se haya ejecutado la funcion y guardado el pathname, nos "desuscribimos" del evento popstate para evitar que se repita hasta que se vuelva a ejecutar el useEffect en una nueva renderización
		return () => {
			window.removeEventListener('popstate', handleLocationChange);
		}

	}, [])

	return (
		<>
			<Header />
			{page}
			<Footer />
		</>
	);
}

export default App;
