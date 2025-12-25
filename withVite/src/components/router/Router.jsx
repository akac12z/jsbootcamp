// este componente Router se encargará de renderizar el componente que le pasemos por props solo si la ruta actual coincide con la ruta que le pasamos por props y no tener que tener el código hardcodeado en el App.jsx
import { useRouter } from "../../hooks/useRouter";

export function Router({ path, component: Component }) {
	const { currentPath } = useRouter();

	if (currentPath !== path) return null;
	return <Component />;
}
