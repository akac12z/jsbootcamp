import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { JobHeader } from "../components/JobHeaderPage";

const API_URL = "https://jscamp-api.vercel.app/api/jobs";

export function JobDatail() {
	const navigate = useNavigate();
	// ojo, el nombre del parámetro que vas a recuperar se lo pones tú pero debe ser el mismo que estás recuperando en en route. si le pones job-desription, tiene que ser igual en ambos lados
	const { id } = useParams(); // esto puede recuperar la id de la url.
	const [job, setJob] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, seterror] = useState(null);

	useEffect(() => {
		fetch(`${API_URL}/${id}`)
			.then((resp) => {
				console.log(resp.status);

				if (!resp.ok) throw new Error("Job Not Found"); // la respuesta puede salir mal y si pasa esto, y no devolviera nada aquí, y pones el finally, iría directamente al finally haciendo ver que todo ha ido bien y no es buena práctica
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
		<>
			<JobHeader
				empresa={job.empresa}
				titulo={job.titulo}
				ubicacion={ubicacion}
				// isLoggedIn={isLoggedIn}
			/>
		</>
	);
}
