export function HomePage() {
	return (
		<main>
			<section>
				<img
					src="../../public/background.webp"
					alt="dev coding"
					width="200"
				/>

				<h2>Encuentra tu próximo trabajo en tecnología</h2>
				<p>
					Explora las mejores ofertas laborales en el sector tecnológico y da el
					siguiente paso en tu carrera profesional.
				</p>
				<form role="search">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="1.5"
							className="icon icon-tabler icons-tabler-outline icon-tabler-search"
							viewBox="0 0 24 24"
						>
							<path
								fill="none"
								stroke="none"
								d="M0 0h24v24H0z"
							/>
							<path d="M3 10a7 7 0 1 0 14 0 7 7 0 1 0-14 0m18 11-6-6" />
						</svg>
						<input
							type="text"
							placeholder="Buscar empleos..."
						/>

						<button type="submit">Buscar</button>
						{/* <!-- cualquier btn que esté al final de un form siempre va a ser de tipo submit --> */}
					</div>
				</form>
			</section>

			<section>
				<header>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						aria-hidden="true"
						viewBox="0 0 256 256"
					>
						<path d="M216 56h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V72a16 16 0 0 0-16-16M96 48a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm120 24v41.61A184 184 0 0 1 128 136a184.1 184.1 0 0 1-88-22.38V72Zm0 128H40v-68.36A200.2 200.2 0 0 0 128 152a200.25 200.25 0 0 0 88-20.37zm-112-88a8 8 0 0 1 8-8h32a8 8 0 0 1 0 16h-32a8 8 0 0 1-8-8" />
					</svg>
					<h3>¿Por qué DevJobs?</h3>
					<p>
						DevJobs es la principal plataforma de búsqueda de empleo para
						desarrolladores. Conectamos a los mejores talentos con las empresas
						más innovadoras.
					</p>
				</header>
				<footer>
					<article>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							aria-hidden="true"
							viewBox="0 0 256 256"
						>
							<path d="M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71M40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44m210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07" />
						</svg>
						<h3>Encuentra el tabajo de tus sueños</h3>
						<p>
							Busca miles de empleos de las mejores empresas de todo el mundo.
						</p>
					</article>

					<article>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="currentColor"
							aria-hidden="true"
							viewBox="0 0 256 256"
						>
							<path d="M240 208h-16V96a16 16 0 0 0-16-16h-64V32a16 16 0 0 0-24.88-13.32L39.12 72A16 16 0 0 0 32 85.34V208H16a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16M208 96v112h-64V96ZM48 85.34 128 32v176H48ZM112 112v16a8 8 0 0 1-16 0v-16a8 8 0 1 1 16 0m-32 0v16a8 8 0 0 1-16 0v-16a8 8 0 1 1 16 0m0 56v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0m32 0v16a8 8 0 0 1-16 0v-16a8 8 0 0 1 16 0" />
						</svg>
						<h3>Conecta con las mejores empresas</h3>
						<p>
							Conecta con empresas que están contratando por tus habilidades.
						</p>
					</article>
				</footer>
			</section>
		</main>
	);
}
