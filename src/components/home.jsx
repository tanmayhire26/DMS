import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { loadLogin } from "../actions/loginAction";
import jwt_decode from "jwt-decode";

function Home() {
	let token = useSelector((state) => state.loginReducer.token);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLogin());
	}, []);
	let dash = "/";

	if (token) {
		const decoded = jwt_decode(token);
		let role = decoded.role;
		dash =
			role === "Admin"
				? "/admin"
				: role === "Indexer"
				? "/indexer"
				: role === "General User"
				? "/generalUser"
				: "/login";
	}

	return (
		<div
			className="flex justify-center items-center   h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
		>
			<div
				className="h-[95%] w-[80%] bg-center  bg-contain bg-no-repeat"
				style={{ backgroundImage: "url(/homeImage.png)" }}
			>
				<div className=" italic font-bold text-xs flex absolute right-[22%] top-[18%] gap-3">
					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"bg-indigo-400 p-1 text-gray-600"}
							to={`${dash}`}
						>
							Dashboard
						</NavLink>
					</div>

					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"focus:text-orange-300 text-gray-600"}
							to=""
						>
							ABOUT US
						</NavLink>
					</div>

					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"focus:text-orange-300 text-gray-600"}
							to="/login"
						>
							LOGIN
						</NavLink>
					</div>
				</div>
			</div>
			{/* <img className="w-5/6 z-1" src="homeImage.png" /> */}
		</div>
	);
}

export default Home;
