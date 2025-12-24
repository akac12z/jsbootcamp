import JobCard from "./JobCard";

function JobListing({ jobsData }) {
	return (
		<section>
			<h2>Resultados de búsqueda</h2>

			<section className="jobs-listings">
				{jobsData.map((job) => {
					const { id, title, company, location, description } = job;
					// console.log(description);
					// uso el map y no el .forEach porque el map me devuelve un array mientras que el .forEach solo ejecuta una función y no devuelve nada
					// para React, necesitamos una key porque es un identificador único que ayuda a React a identificar qué elementos cambiaron, se agregaron o se eliminaron
					// es importante no hacer el key con el índice porque puede que el índice cambie cuando se agregan o eliminan elementos lo que hace que React no pueda identificar correctamente los elementos ya que han cambiado pero el índice no
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
		</section>
	);
}

export default JobListing;
