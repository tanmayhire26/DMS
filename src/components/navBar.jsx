import { useDispatch } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../actions/loginAction";

function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};
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
										to="/admin/departments"
									>
										DEPARTMENT
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/admin/users"
									>
										USER
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/admin/docTypes"
									>
										DOC TYPE
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/admin/fields"
									>
										FIELDS
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/admin/doctypeFields"
									>
										DOC TYPE FIELDS
									</NavLink>
								</li>
								<li className="nav-item">
									<button
										onClick={handleLogout}
										className={
											" ml-[90%] nav-link focus:border-b-2 bg-red-500 w-full focus:border-orange-300"
										}
									>
										LOG OUT
									</button>
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
