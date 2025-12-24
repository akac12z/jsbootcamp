import JobSearch from "./components/JobSearch";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";

function App() {
	const handlePageChange = (page) => {
		console.log("Page changed to:", page);
	};
	return (
		<>
			<Header />
			<main>
				<JobSearch />

				<section>
					<JobListing />

					<Pagination
						currentPage={1}
						totalPages={5}
						onChange={handlePageChange}
					/>
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
