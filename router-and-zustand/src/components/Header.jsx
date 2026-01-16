import { NavLink } from "react-router";
import { Link } from "./Link";
import styles from "./header.module.css";

function Header({ isLoggedIn, onLogIn, onLogOut }) {
	return (
		<header className={styles.header}>
			<Link href="/">
				<h1>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
					</svg>
					DevJobs
				</h1>
			</Link>

			<nav className={styles.forNav}>
				{isLoggedIn ? (
					<button onClick={onLogOut}>Cerrar Sesion</button>
				) : (
					<button onClick={onLogIn}>Iniciar Sesión</button>
				)}
				<NavLink
					className={({ isActive }) =>
						isActive ? `${styles.nav_link_active}` : ""
					}
					to="/"
				>
					Inicio
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? `${styles.nav_link_active}` : ""
					}
					to="/search"
				>
					Empleo
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive ? `${styles.nav_link_active}` : ""
					}
					to="/contact"
				>
					Contact
				</NavLink>
				{/* <Link href="/search">Empleos</Link>
				<Link href="/contact">Contacto</Link> */}
			</nav>
		</header>
	);
}
export default Header;
