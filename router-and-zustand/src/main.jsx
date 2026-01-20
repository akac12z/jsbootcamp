import { BrowserRouter } from "react-router";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { AuthProvider } from "./context/authContext.jsx"; // importando esto, permite a la app poder ver los estados que tu quieres (los que tienes el el context) desde cualquier para de la app sin prop drilling y no joder el rendimiento
// import { FavProvider } from "./context/FavContext.jsx";

// tanto providers tengas, tantos tienes que añadir
// voy a quitar los provider porque estoy usando zustand no me hace falta
createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		{/* <FavProvider> */}
		{/* <AuthProvider> */}
		<App />
		{/* </AuthProvider> */}
		{/* </FavProvider> */}
	</BrowserRouter>,
);
