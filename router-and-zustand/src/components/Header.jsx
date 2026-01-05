import { Link } from "./Link";
import styles from "./header.module.css";

function Header() {
	return (
		<header className={styles.header}>
			<Link href="/">
				<h1>
					<svg
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<polyline points="16 18 22 12 16 6"></polyline>
						<polyline points="8 6 2 12 8 18"></polyline>
					</svg>
					DevJobs
				</h1>
			</Link>

			<nav className={styles.forNav}>
				<Link href="/"> Inicio </Link>
				<Link href="/search">Empleos</Link>
				<Link href="/contact">Contacto</Link>
			</nav>
		</header>
	);
}
export default Header;
