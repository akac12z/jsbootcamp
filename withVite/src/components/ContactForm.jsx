import { useId } from "react";
import styles from "./contactForm.module.css";

export function ContactForm() {
	const nameID = useId();
	const surnameID = useId();
	const emailID = useId();
	const countryID = useId();
	const addressID = useId();
	const zipID = useId();
	const cityID = useId();
	const provinceID = useId();
	const mssgID = useId();

	return (
		<div className={styles.contactForm}>
			<section>
				<h2>Ponte en contacto con nosotros</h2>
				<p>Déjanos tus datos y te contactaremos en menos de 24 horas.</p>
			</section>
			<section>
				<form role="form">
					<div className={styles.nameSection}>
						<div>
							<label htmlFor="name-input">Nombre</label>
							<input
								id="name-input"
								name={nameID}
								required
								type="text"
								placeholder="Jonh"
							/>
						</div>
						<div>
							<label htmlFor="survame-input">Apellido(s)</label>
							<input
								id="survame-input"
								type="text"
								name={surnameID}
								required
								placeholder="Smith"
							/>
						</div>
					</div>
					<div className={styles.emailSection}>
						<label htmlFor="email-input">Email</label>
						<input
							type="email"
							name={emailID}
							id="email-input"
							placeholder="jonh@gexample.com"
						/>
					</div>
					<div className={styles.countrySection}>
						<label htmlFor="filter-country">País</label>
						<div className={styles.thridSection}>
							<select
								name={countryID}
								id="filter-country"
								required
							>
								<option value="spain">España</option>
								<option value="united-state-of-america">Estados Unidos</option>
								<option value="mexico">Mexico</option>
								<option value="colombia">Colombia</option>
								<option value="france">Francia</option>
								<option value="chile">Chile</option>
								<option value="argentina">Argentina</option>
								<option value="venezuela">Venezuela</option>
								<option value="brazil">Brazil</option>
								<option value="germany">Alemania</option>
							</select>
						</div>
					</div>
					<div className={styles.addressSection}>
						<label htmlFor="address-input"></label>
						<input
							required
							id="address-input"
							type="text"
							name={addressID}
							placeholder="Your address"
						/>
					</div>
					<div>
						<div>
							<label htmlFor="city-input">Ciudad</label>
							<input
								type="text"
								id="city-input"
								placeholder="Madrid"
								required
								name={cityID}
							/>
						</div>
						<div>
							<label htmlFor="province-state-input">Provincia/Estado </label>
							<input
								type="text"
								id="province-state-input"
								name={provinceID}
								placeholder="Madrid"
								required
							/>
						</div>
						<div>
							<label htmlFor="zip-input">Código Postal</label>
							<input
								id="zip-input"
								placeholder="03300"
								required
								name={zipID}
								type="text"
							/>
						</div>
					</div>
					<div>
						<label htmlFor="mssg-input">Mensaje</label>
						<input
							type="text"
							name={mssgID}
							id="mssg-input"
						/>
					</div>
					<button
						className={styles.submitBtn}
						type="submit"
					>
						Enviar
					</button>
				</form>
			</section>
		</div>
	);
}
