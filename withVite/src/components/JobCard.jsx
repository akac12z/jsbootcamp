import { useState } from "react";

function JobCard({ title, company, location, description }) {
	const [isApplied, setIsApplied] = useState(false);

	function handleClick() {
		setIsApplied(!isApplied);
	}

	const text = isApplied ? "Aplicado" : "Aplicar";
	const buttonClass = isApplied ? "isApplied" : "";
	const isAppliedText = isApplied ? "Sí" : "No";

	return (
		<article className="job-listing-card">
			<div>
				<h3>{title}</h3>
				<small>
					{company} - {location} - ¿He aplicado? {isAppliedText}
				</small>
				<p>{description}</p>
			</div>
			<button
				className={`btn-apply-job ${buttonClass}`}
				onClick={handleClick}
				disabled={isApplied}
			>
				{text}
			</button>
		</article>
	);
}
export default JobCard;
