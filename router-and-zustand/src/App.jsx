import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router";

import { allPages } from "./global/pages";
// import { Router } from "./components/router/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";

// import { HomePage } from "./pages/Home";
// import { SearchPage } from "./pages/Search";
// import { NotFoundPage } from "./pages/404";
// import { ContactPage } from "./pages/Contact";
// import { JobDatail } from "./pages/Jobs";

// cargamos los componentes de forma lazy para que no carga js innecesario. para hacer esto, los componentes que estás trayendo deben estar con el 'default' en el import
const HomePage = lazy(() => import("./pages/Home.jsx"));
const SearchPage = lazy(() => import("./pages/Search.jsx"));
const NotFoundPage = lazy(() => import("./pages/404.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const JobDatail = lazy(() => import("./pages/Jobs.jsx"));

function App() {
	// para tener la autenticación para los usuarios
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const handleLogIn = () => {
		setisLoggedIn(true);
	};
	const handleLogOut = () => {
		setisLoggedIn(false);
	};

	// // necesito poder saber en qué path estoy para poder moverme entre páginas
	// const [currentPath, setCurrentPath] = useState(window.location.pathname);

	// comento esto porque está hardcodeado y teniendo el Route puedes usarlo de manera dinámica
	// const { currentPath } = useRouter();
	// let page = <NotFoundPage />;
	// if (currentPath === "/") {
	// 	page = <HomePage />;
	// } else if (currentPath === "/search") {
	// 	page = <SearchPage />;
	// }

	// // este use effect se crea para que cada vez que cambie la url, actualice el estado y poder navegar entre las páginas simulando una SPA (single page application) y así no recargar todos los recursos cada vez que cambia de pag el user
	// useEffect(() => {
	// 	const handleLocationChange = () => {
	// 		// creamos una función que maneje el cambio de url a través de mirar en el window el pathname
	// 		setCurrentPath(window.location.pathname); // cada vez que cambie la url, actualizara el estado a la nueva url
	// 	}

	// 	// haremos que la handleLocationChange se ejecute cada vez que se de el evento popstate ("popstate acording to MDN is fired when the active history entry changes while the user navigates the session history") por ende, escuchamos este evento y ejecutamos la función handleLocationChange
	// 	window.addEventListener('popstate', handleLocationChange)

	// 	// cuando se haya ejecutado la funcion y guardado el pathname, nos "desuscribimos" del evento popstate para evitar que se repita hasta que se vuelva a ejecutar el useEffect en una nueva renderización
	// 	return () => {
	// 		window.removeEventListener('popstate', handleLocationChange);
	// 	}

	// }, [])

	return (
		<>
			<Header
				// el header necesita saber si está logged para mostrar o no el botón por ende, necesita saber el estado
				isLoggedIn={isLoggedIn}
				onLogIn={handleLogIn}
				onLogOut={handleLogOut}
			/>
			{/* {allPages.map((page) => {
					const { key, path, component } = page;
					
					return (
						<Router
						key={key}
						path={path}
						component={component}
						/>
						);
						})} */}
			<Suspense
				fallback={
					<div
						style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 auto" }}
					>
						Cargando...
					</div>
				}
			>
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/search"
						element={<SearchPage />}
					/>
					<Route
						path="/contact"
						element={<ContactPage />}
					/>
					<Route
						path="/jobs/:id" // este :id es para buscar por el id del job pero :id puedes poiner lo que quieras, :keyword, :data, :job-description... pero siempre que en el componente que estás renderizando el useParams (en este caso en el Datail.jsx) tenga el mismo nombre
						element={<JobDatail isLoggedIn={isLoggedIn} />}
					/>
					<Route
						path="*" // para el resto de componentes usará el NotFound
						element={<NotFoundPage />}
					/>
				</Routes>
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
