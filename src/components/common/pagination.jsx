import { useDispatch } from "react-redux";

const _ = require("underscore");

function Pagination(props) {
	const dispatch = useDispatch();
	const { itemsCount, pageSize, onPageChange, currentPage } = props;
	const pageCount = Math.ceil(itemsCount / pageSize);
	if (pageCount === 1) return;
	const pages = _.range(1, pageCount + 1);

	return (
		<>
			<nav aria-label="Pages">
				<ul className="pagination">
					{pages.map((page, i) => (
						<li
							key={i}
							className={
								currentPage === page ? "page-item-active" : "page-item"
							}
						>
							<button className="page-link" onClick={() => onPageChange(page)}>
								{page}
							</button>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}

export default Pagination;
