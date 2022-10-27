import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../actions/loginAction";

function IndexerNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
										to="/indexer/indexerView"
									>
										INDEX
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										className={
											"nav-link focus:border-b-2 focus:border-orange-300"
										}
										to="/indexer/addDoc"
									>
										ADD DOC
									</NavLink>
								</li>

								<li className="nav-item">
									<button
										onClick={() => {
											console.log("logging out ?");
											dispatch(logout());
											navigate("/");
										}}
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

export default IndexerNavbar;
