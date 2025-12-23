import JobSearch from "./components/JobSearch";
import Pagination from "./components/Pagination";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobListing from "./components/JobListing";

function App() {
	return (
		<>
			<Header />
			<main>
				<JobSearch />

				<section>
					<JobListing />
					<Pagination />
				</section>
			</main>

			<Footer />
		</>
	);
}

export default App;
