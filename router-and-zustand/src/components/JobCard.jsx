import styles from "./jobCard.module.css";
import { Link } from "./Link";
import { useState } from "react";
import { useFavStore } from "../store/favStore";
import { useAuthStore } from "../store/authStore";

function JobCardFavsBtn({ jobId }) {
	// desde esta línea le decimos que se suscriba a los cambios de mi store, a TODOS, pero luego solo quieres usar algunos. de ahí que se rendericen todos los botones cuando solo tocas uno
	const { toggleFav, isFav } = useFavStore();
	const { isLoggedIn } = useAuthStore();

	// solo vas a querer suscribirte a la parte de la store que te interesa y lo tines que hacer de manera "manual" e individual pero haciéndolo así no funciona pq no se actualiza el estado dentro del botón pero sí se ve reflejado en el estado global que es el objeto fav que contine todos los fav
	// const isFav = useFavStore((state) => state.isFav);
	// const toggleFav = useFavStore((state) => state.toggleFav);

	return (
		<button
			disabled={!isLoggedIn}
			onClick={() => toggleFav(jobId)}
			aria-label={isFav(jobId) ? "Remove from favorites" : "Add to favorites"}
		>
			{isLoggedIn ? (isFav(jobId) ? "❤️" : "🤍") : "🤍"}
		</button>
	);
}

function JobCardApplyBtn({ jobId }) {
	const [isApplied, setIsApplied] = useState(false);
	const { isLoggedIn } = useAuthStore();

	function handleClick() {
		setIsApplied(!isApplied);
	}

	const btnText = isLoggedIn ? (isApplied ? "Aplicado" : "Aplicar") : "Aplicar";
	const buttonClass = isLoggedIn
		? isApplied
			? `${styles.btnApplyJob} ${styles.isApplied}`
			: styles.btnApplyJob
		: styles.btnApplyJob;

	return (
		<button
			disabled={!isLoggedIn}
			className={buttonClass}
			onClick={handleClick}
		>
			{btnText}
		</button>
	);
}

function JobCard({ title, company, location, description, id }) {
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
			<JobCardApplyBtn jobId={id} />
			<JobCardFavsBtn jobId={id} />
		</article>
	);
}
export default JobCard;
