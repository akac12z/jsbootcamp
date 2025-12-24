import styles from "./jobCard.module.css";
import { useState } from "react";

function JobCard({ title, company, location, description }) {
	const [isApplied, setIsApplied] = useState(false);

	function handleClick() {
		setIsApplied(!isApplied);
	}

	const btnText = isApplied ? "Aplicado" : "Aplicar";
	const buttonClass = isApplied ? `${styles.btnApplyJob} ${styles.isApplied}` : styles.btnApplyJob;

	return (
		<article className={styles.jobListingCard}>
			<div>
				<h3>{title}</h3>
				<small>
					{company} - {location}
				</small>
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
