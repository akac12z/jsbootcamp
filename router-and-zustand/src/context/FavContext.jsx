import { useState, createContext, use } from "react";

export const FavContext = createContext();

export function FavProvider({ children }) {
	const [fav, setFav] = useState([]);

	// para añadir fav
	const addFav = (job) => {
		setFav((prevFav) => [...prevFav, job]);
	};

	// eliminar fav
	const removeFav = (jobId) => {
		setFav((prevFac) => prevFac.filter((job) => job.id !== jobId));
	};

	// saber si hay algún fav y mostrarlo
	const isFav = (jobId) => {
		return fav.some((job) => job.id === jobId);
	};

	const value = {
		fav,
		addFav,
		removeFav,
		isFav,
	};

	return <FavContext value={value}>{children}</FavContext>;
}

export function useFav() {
	const context = use(FavContext);

	if (context === undefined)
		throw new Error("useFav must be used within a FavProvider");

	return context;
}
