import { useState } from "react";

import JobSearch from "./components/JobSearch";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 5;
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
					<JobListing />

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
