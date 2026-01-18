// esto se puede tener para la autenticación y crear un constexto global y evitar el problema de prop drilling
import { useState, createContext, useContext } from "react";

export const AuthContext = createContext();
/* cuando tienes un contexto necesitas:
  1. el proveedor -> el que teine la info -> AuthProvider
  2. el consumidor -> aquel que va a consimir el estado
*/

export function AuthProvider({ children }) {
	// provee los valores que quiees tener. en este caso, login y logout y si está logged
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	const value = { isLoggedIn, login, logout };

	return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
