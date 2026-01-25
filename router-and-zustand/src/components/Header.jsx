import { NavLink } from "react-router";

import { Link } from "./Link";
import styles from "./header.module.css";
// import { useContext } from "react";
// import { useAuth } from "../context/authContext";
import { useAuthStore } from "../store/authStore";
// import { useAuth } from "../hooks/useAuth";
import { useFavStore } from "../store/favStore";

const FavCount = () => {
	const { isLoggedIn } = useAuthStore();
	const { countFav } = useFavStore();
	return (
		isLoggedIn && (
			<NavLink
				className={(isActive) => (isActive ? "nav-link-active" : "")}
				to="/profile"
			>
				Profile ❤️ {countFav()}
			</NavLink>
		)
	);
};

const HeaderUserButton = () => {
	// esta ya no me haría falta porqeu uso zustand, por tanto lo importo de mi store
	// const { isLoggedIn, login, logout } = useAuth();
	const { isLoggedIn, login, logout } = useAuthStore();

	return isLoggedIn ? (
		<button onClick={logout}>Cerrar sesión</button>
	) : (
		<button onClick={login}>Iniciar sesión</button>
	);
};

export default function Header() {
	// las props que recibia el header como ya no le llegan como propos sino que es a través del contexto, tienes que importarlo de forma "normal"
	// { isLoggedIn, onLogIn, onLogOut
	// }

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
				<FavCount />
				<HeaderUserButton />
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
					to="/profile"
				>
					Perfil
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
