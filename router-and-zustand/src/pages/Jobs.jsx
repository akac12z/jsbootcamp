import styles from "./jobs.module.css";
import snarkdown from "snarkdown";

import { Link } from "../components/Link";
import { useState, useEffect } from "react";
// import { useAuth } from "../context/authContext";
import { useParams, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";
import { useFavStore } from "../store/favStore";
// import { JobHeader } from "../components/JobHeaderPage";

const API_URL = "https://jscamp-api.vercel.app/api/jobs";

function DetailFavBtn({ jobId }) {
	const { toggleFav, isFav } = useFavStore();
	const { isLoggedIn } = useAuthStore();
	return (
		<button
			disabled={!isLoggedIn}
			style={{ marginLeft: "1rem" }}
			onClick={() => toggleFav(jobId)}
			aria-label={isFav(jobId) ? "Remove from favorites" : "Add to favorites"}
		>
			{isLoggedIn ? (isFav(jobId) ? "❤️" : "🤍") : "🤍"}
		</button>
	);
}

function JobDetailBreadcrumbs({ titulo }) {
	return (
		<div className={styles.container}>
			<nav className={styles.breadcrumb}>
				<Link
					href="/search"
					className={styles.breadcrumbButton}
				>
					Empleos
				</Link>
				<span className={styles.breadcrumbSeparator}>/</span>
				<span className={styles.breadcrumbCurrent}>{titulo}</span>
			</nav>
		</div>
	);
}

function JobApplyBtn() {
	const { isLoggedIn } = useAuthStore();
	return (
		<button
			disabled={!isLoggedIn}
			className={styles.applyButton}
		>
			{isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
		</button>
	);
}

function JobHeader({ titulo, empresa, ubicacion, id }) {
	// isLoggedIn ya no le llega por props sino por el context
	// const { isLoggedIn } = useAuth();
	// const { isLoggedIn } = useAuthStore();
	return (
		<section>
			<JobDetailBreadcrumbs titulo={titulo} />

			<header className={styles.header}>
				<h1 className={styles.title}>{titulo}</h1>
				<p className={styles.meta}>
					{empresa} · {ubicacion}
				</p>
			</header>

			<JobApplyBtn />
			<DetailFavBtn jobId={id} />
		</section>
	);
}

function JobSection({ title, content }) {
	const html = snarkdown(content); // porque la api me devuelve markdown y hay que transfirmarlo a HTML
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionTitle}>{title}</h2>

			<article
				className={`${styles.sectionContent} prose`}
				dangerouslySetInnerHTML={{
					// esto es para que React renderice bien el html que viene de la api ya que si no, lo aplana todo y lo hace en forma de texto incluidas las etiquetas html
					// este tipo de forma solo deberías hacerlo si sabes a ciencia cierta de donde viene el html para evitar inyecciones maliciosas ya que est´s 'obligando' a que react haga algo que no quiere
					__html: html,
				}}
			/>
		</section>
	);
}

export default function JobDatail() {
	// const { isLoggedIn } = useAuth();
	// const { isLoggedIn } = useAuthStore();

	const navigate = useNavigate();
	// ojo, el nombre del parámetro que vas a recuperar se lo pones tú pero debe ser el mismo que estás recuperando en en route. si le pones job-desription, tiene que ser igual en ambos lados
	const { id } = useParams(); // esto puede recuperar la id de la url.
	const [job, setJob] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, seterror] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/${id}`)
			.then((resp) => {
				// console.log(resp.status);

				if (!resp.ok) navigate("/not-found"); // la respuesta puede salir mal y si pasa esto, y no devolviera nada aquí, y pones el finally, iría directamente al finally haciendo ver que todo ha ido bien y no es buena práctica
				return resp.json(); // si ha ido bien, devuelves el json
			})
			.then((json) => {
				setJob(json);
			})
			.catch((err) => {
				seterror(err.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [id]);

	if (isLoading) {
		return (
			<section style={styles.loadSection}>
				<div className={styles.loading}>
					<p className={styles.loadingText}>Cargando...</p>
				</div>
			</section>
		);
	}

	if (error || !job) {
		return (
			<section>
				<div className={styles.error}>
					<h2 className={styles.errorTitle}>Oferta no encontrada</h2>
					<button
						onClick={navigate("/")}
						className={styles.errorButton}
					>
						Volver al inicio
					</button>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.page}>
			<JobHeader
				empresa={job.empresa}
				titulo={job.titulo}
				ubicacion={job.ubicacion}
				id={job.id} // si no le paso el job.id si me hace la animación y el toggle pero no muestra que esté o no en fav
				// isLoggedIn={isLoggedIn}
			/>

			<JobSection
				title="Descripción del Puesto"
				content={job.content.description}
			/>
			<JobSection
				title="Responsabilidades"
				content={job.content.responsibilities}
			/>
			<JobSection
				title="Requisitios"
				content={job.content.requirements}
			/>
			<JobSection
				title="Acerca de la empresa"
				content={job.content.about}
			/>
		</section>
	);
}
