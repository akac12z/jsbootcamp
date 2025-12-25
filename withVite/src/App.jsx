import Header from "./components/Header";
import Footer from "./components/Footer";
import { HomePage } from "./pages/Home";
import { SearchPage } from "./pages/Search";
import { NotFoundPage } from "./pages/404";

function App() {
	// necesito poder saber en qué path estoy para poder moverme entre páginas
	const currentPage = window.location.pathname;

	let page = <NotFoundPage />;
	if (currentPage === "/") {
		page = <HomePage />;
	} else if (currentPage === "/search") {
		page = <SearchPage />;
	}

	return (
		<>
			<Header />

			{page}

			<Footer />
		</>
	);
}

export default App;
