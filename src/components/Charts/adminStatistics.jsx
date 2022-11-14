import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { getAllUsers } from "../../actions/userAction";
import Logo from "../logo";

function AdminStatistics() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUsers());
	}, []);
	return (
		<>
			<div className="row flex divide-x">
				<div className="col-2 divide-y flex-row justify-center h-screen">
					<div className="mt-3 flex justify-center pb-3">
						<Logo />
					</div>
					<div></div>
				</div>
				<div className="col">
					<div className="mt-5">
						<div className="flex gap-4">
							<NavLink
								to="users"
								style={{ textDecoration: "none" }}
								className="bg-purple-400 text-white font-bold rounded-full p-2"
							>
								USERS
							</NavLink>
							<NavLink
								to="documents"
								style={{ textDecoration: "none" }}
								className="bg-purple-400 text-white font-bold rounded-full p-2"
							>
								DOCUMENTS
							</NavLink>
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminStatistics;
