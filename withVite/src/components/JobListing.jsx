import jobsData from "../../../data.json";

import JobCard from "./JobCard";

function JobListing() {
	return (
		<>
			<h2>Resultados de búsqueda</h2>

			<section className="jobs-listings">
				{jobsData.map((job) => {
					const { id, title, company, location, description } = job;
					// console.log(description);

					return (
						<JobCard
							key={id}
							title={title}
							company={company}
							location={location}
							description={description}
						/>
					);
				})}
				{
					// tanto esta forma como la de arriba son correctas y funcionan pero la de arriba quizá para la gente novel se ve más clara
					/*jobsData.map((job) => (
								<JobCard
									key={job.id}
									title={job.title}
									company={job.company}
									location={job.location}
									description={job.description}
								/>
							))*/
				}
			</section>
		</>
	);
}

export default JobListing;
