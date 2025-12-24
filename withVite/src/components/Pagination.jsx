function Pagination({ currentPage = 1, totalPages = 6, onPageChange }) {
	// generar un array de páginas a mostrar
	const pages = Array.from({ length: totalPages }, (_, index) => index + 1); // el Array.from da un array con el length que le pasamos sea estricto o dinámico y tiene un segundo parámetro donde está el indice y como quieres que se incilialice es + 1 para que no empiece en 0 en la paginación no tendría sentido

	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	const styleLeftPagination = {
		opacity: isFirstPage ? 0.5 : 1,
		pointerEvents: isFirstPage ? "none" : "auto",
	};

	const styleRightPagination = {
		opacity: isLastPage ? 0.5 : 1,
		pointerEvents: isLastPage ? "none" : "auto",
	};

	const handlePrevClick = (e) => {
		// si le das a la flechita para atrás, vas una pagina menos
		e.preventDefault();
		if (!isFirstPage) {
			onPageChange(currentPage - 1);
		}
	};
	const handleNextClick = (e) => {
		// si le das a la flechita para adelante, vas una pagina más
		e.preventDefault();
		if (!isLastPage) {
			onPageChange(currentPage + 1);
		}
	};
	const handleChangePage = (e, page) => {
		e.preventDefault();
		if (page !== currentPage) {
			onPageChange(page);
		}
	};

	return (
		<nav className="pagination">
			<a
				href="#"
				onClick={handlePrevClick}
				style={styleLeftPagination}
				className="arrowPagination arrowLeftPagination"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M15 6l-6 6l6 6" />
				</svg>
			</a>

			{pages.map((page) => {
				return (
					<a
						href="#"
						onClick={(e) => handleChangePage(e, page)}
						className={currentPage === page ? "isActive" : ""}
					>
						{page}
					</a>
				);
			})}

			{/* botón de siguiente página */}

			<a
				href="#"
				className="arrowPagination arrowRightPagination"
				style={styleRightPagination}
				onClick={handleNextClick}
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
				>
					<path
						stroke="none"
						d="M0 0h24v24H0z"
						fill="none"
					/>
					<path d="M9 6l6 6l-6 6" />
				</svg>
			</a>
		</nav>
	);
}

export default Pagination;
