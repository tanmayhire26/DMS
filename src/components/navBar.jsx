import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
	return (
		<>
			<div className="row mt-3 border-b">
				<div className="col-2 "></div>
				<div className="col">
					<nav className="navbar navbar-expand-lg ">
						<div className="collapse navbar-collapse" id="navbarNav">
							{" "}
							<ul className="navbar-nav">
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/adminDashboard/department"
									>
										DEPARTMENT
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/adminDashboard/user"
									>
										USER
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/adminDashboard/docType"
									>
										DOC TYPE
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/adminDashboard/fields"
									>
										FIELDS
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/adminDashboard/doctypeFields"
									>
										DOC TYPE FIELDS
									</NavLink>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Navbar;
