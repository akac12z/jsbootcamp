import styles from "./jobCard.module.css";
import { Link } from "./Link";
import { useState } from "react";

function JobCard({ title, company, location, description, id }) {
	const [isApplied, setIsApplied] = useState(false);

	function handleClick() {
		setIsApplied(!isApplied);
	}

	const btnText = isApplied ? "Aplicado" : "Aplicar";
	const buttonClass = isApplied
		? `${styles.btnApplyJob} ${styles.isApplied}`
		: styles.btnApplyJob;

	return (
		<article className={styles.jobListingCard}>
			<div>
				<h3>
					<Link href={`/jobs/${id}`}>{title}</Link>
				</h3>
				<div>
					<small>
						{company} - {location}
					</small>
					<span className={styles.link}>
						<Link href={`/jobs/${id}`}>Ver Detalles</Link>
					</span>
				</div>
				<p>{description}</p>
			</div>
			<button
				className={buttonClass}
				onClick={handleClick}
				disabled={isApplied}
			>
				{btnText}
			</button>
		</article>
	);
}
export default JobCard;
