import snarkdown from "snarkdown"; // nos hace falta prqoue de la api en la descripción y algunas otras devuelve un markdown y tenemso que pasarlo a HTML

export function JobSection({ title, content }) {
	const html = snarkdown(content);
	return (
		<section className={styles.section}>
			<h2 className={styles.sectionList}>{title}</h2>

			<div className={styles.sectionContent}>{html}</div>
		</section>
	);
}
