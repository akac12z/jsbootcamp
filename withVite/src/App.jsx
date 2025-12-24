import { useState } from "react";

import jobsData from "../../data.json";

import JobSearch from "./components/JobSearch";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";

const MAX_RESULT_PER_PAGE = 5;

function App() {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia arriba
	// const totalPages = Math.floor(jobsData.length / MAX_RESULT_PER_PAGE); // redondea hacia abajo
	
	
	const pageResults = jobsData.slice(
		(currentPage - 1) * MAX_RESULT_PER_PAGE, // esto es para que la página 1 sea la primera que es el primer elemento del array
		currentPage * MAX_RESULT_PER_PAGE); // esto es para que la página 2 sea la segunda que es el segundo elemento del array y cada vez que cambie de página se vayan sumando 5. del 0 al 5 resultados, del 5 al 10 resultados, del 10 al 15 resultados, etc
	
	const handlePageChange = (page) => {
		// console.log("Page changed to:", page);
		setCurrentPage(page);
	};


	return (
		<>
			<Header />
			<main>
				<JobSearch />

				<section>
					<JobListing jobsData={pageResults}/>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
