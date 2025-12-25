import { useRouter } from "../hooks/useRouter";
import styles from "./link.module.css";


export function Link({href, children, ...restProps}) {
  const {navigateTo} = useRouter();
	
  const handleClick =(e) => {
    e.preventDefault();

    navigateTo(href);
    // cuando haces click en el link, se va a la página que corresponde. el .pushState() es el que va a actualizar el estado de la historia (pagina) y que no devuelva nada como dato, el segundo dato no se usa y el tercero es la url que se va a actualizar
    // window.history.pushState({}, "", href);

    // cuando haces click en el link, se va a la página que corresponde. el .dispatchEvent() es el que va a disparar el evento que se va a ejecutar. el PopStateEvent es el evento que se va a disparar
    // window.dispatchEvent(new PopStateEvent("popstate"));
  }
  return (
		<a href={href} {...restProps} onClick={handleClick} className={styles.link}>{children}</a>
	)
}