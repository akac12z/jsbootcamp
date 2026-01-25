import { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router";

import { allPages } from "./global/pages";
// import { Router } from "./components/router/Router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/protectedRoute.jsx";

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
const ProfilePage = lazy(() => import("./pages/Profile.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));

function App() {
	// para tener la autenticación para los usuarios pero tenerlo aquí es un problema.
	// se crea el PROP DRILLING y el rendimiento disminuye mucho cuanto más profundo sea la autenticación (haciendola de esta manera) porque renderiza "todo" cada vez que hacer login/logout por tenerlo tan arriba
	// para solucionarlo, tb exite el React Context -> crea un estado global
	// este prop drilling se podría usar para apps pequeñas, donde tienes que bajar 1 o 2 capas como mucho. si es más grande y granular, necesitas usar el cnotext api (este context api está pensado para estados que no cambien mucho, por ejemplo, inicio o cierre de sesión) pero para apps a´nu más grandes necesitas bibliotecas como zustand

	/*
COMENTO ESTO PORQUE AHORA LO VOY A HACER CON EL AUTH CONTEXT y tiene que estar allí
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const handleLogIn = () => {
		setIsLoggedIn(true);
	};
	const handleLogOut = () => {
		setIsLoggedIn(false);
	};
*/
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
			// ya. no me hace falta :down gracias al context
			// isLoggedIn={isLoggedIn}
			// onLogIn={handleLogIn}
			// onLogOut={handleLogOut}
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
						path="/profile"
						element={
							// el protected route debe envolver al componente pero los elementos routes no pueden estar envueltos. es el propio componente que renderiza el route el que puede envolverse
							<ProtectedRoute redirectTo="/login">
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/contact"
						element={<ContactPage />}
					/>
					<Route
						path="/jobs/:id" // este :id es para buscar por el id del job pero :id puedes poiner lo que quieras, :keyword, :data, :job-description... pero siempre que en el componente que estás renderizando el useParams (en este caso en el Datail.jsx) tenga el mismo nombre
						element={
							<JobDatail
							// isLoggedIn={isLoggedIn} -> gracias al contexto lo puedo comentar
							/>
						}
					/>
					<Route
						path="*" // para el resto de componentes usará el NotFound
						element={<NotFoundPage />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/register"
						element={<Register />}
					/>
				</Routes>
			</Suspense>
			<Footer />
		</>
	);
}

export default App;
