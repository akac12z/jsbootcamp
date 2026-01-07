import styles from "./jobHeaderPage.module.css";
import { Link } from "./Link";

export function JobHeader({ isLoggedIn, titulo, empresa, ubicacion }) {
	return (
		<section
			style={{ maxWidth: "1280px", margin: "o auto", padding: "0 1rem" }}
		>
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

			<header className={styles.header}>
				<h1 className={styles.title}>{titulo}</h1>
				<p className={styles.meta}>
					{empresa} · {ubicacion}
				</p>
			</header>

			<button
				disabled={!isLoggedIn}
				className={styles.applyButton}
			>
				{isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
			</button>
		</section>
	);
}
