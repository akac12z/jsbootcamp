import styles from "./jobListing.module.css";
import JobCard from "./JobCard";

function JobListing({ jobsData }) {
	return (
		<section>
			<section className={styles.jobsListings}>
				{jobsData.length === 0 && (
					<h3
						style={{ textAlign: "center", margin: "12px", textWrap: "balance" }}
					>
						Lo siento, no hay empleos con esos resultados.
					</h3>
				)}
				{jobsData.map((job) => {
					// const { id, title, company, location, description } = job;
					const { id, titulo, empresa, ubicacion, descripcion } = job; // lo tengo que cambiar a español porque el backend está en español
					// console.log(description);
					// uso el map y no el .forEach porque el map me devuelve un array mientras que el .forEach solo ejecuta una función y no devuelve nada
					// para React, necesitamos una key porque es un identificador único que ayuda a React a identificar qué elementos cambiaron, se agregaron o se eliminaron
					// es importante no hacer el key con el índice porque puede que el índice cambie cuando se agregan o eliminan elementos lo que hace que React no pueda identificar correctamente los elementos ya que han cambiado pero el índice no
					return (
						<>
							<JobCard
								key={id}
								id={id}
								title={titulo}
								company={empresa}
								location={ubicacion}
								description={descripcion}
							/>
						</>
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
