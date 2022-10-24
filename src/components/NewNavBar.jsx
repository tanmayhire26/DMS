import roles from "../services/navbarItems.json";
import jwt_decode from "jwt-decode";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function NewNavBar() {
	const token = useSelector((state) => state.loginReducer.token);
	console.log(token);let decoded = jwt_decode(token);
	return (
		<>
			<div className="row mt-3 border-b">
				<div className="col-2 "></div>
				<div className="col">
					<nav className="navbar navbar-expand-lg ">
						<div className="collapse navbar-collapse" id="navbarNav">
							{" "}
							<ul className="navbar-nav">
								{(decoded.role === "Admin"
									? roles.admin
									: decoded.role === "Indexer"
									? roles.indexerUser
									: roles.generalUser
								).map((r, index) => (
									<li className="nav-item">
										<NavLink
											key={index}
											className={
												"nav-link focus:border-b-2 focus:border-orange-300"
											}
											to={`${r?.path}`}
										>
											{r.name}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

export default NewNavBar;
