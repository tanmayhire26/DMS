import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { loadLogin, logout } from "../actions/loginAction";
import jwt_decode from "jwt-decode";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {
	let token = useSelector((state) => state.loginReducer.token);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLogin());
		
	}, []);
	let dash = "/";
	let decoded = "";
	if (token) {
		decoded = jwt_decode(token);
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

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		dispatch(logout());
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div
			className="flex justify-center items-center   h-screen w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
		>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
					Logged Out !
				</Alert>
			</Snackbar>
			<div
				className="h-[95%] w-[80%] bg-center  bg-contain bg-no-repeat"
				style={{ backgroundImage: "url(/homeImage.png)" }}
			>
				<div className=" italic font-bold text-xs flex absolute right-[22%] top-[18%] gap-3">
					{token ? (
						<div className="text-purple-600 flex">
							<img
								className="mx-2 h-[30px] w-[30px] rounded-full"
								src={`/profile-images/${decoded.userName}.jpg`}
							/>
							<div>Hi, {decoded.firstName}</div>
						</div>
					) : null}
					<div>
						<NavLink
							style={{ textDecoration: "none" }}
							className={"focus:text-orange-300 text-gray-600"}
							to=""
						>
							ABOUT US
						</NavLink>
					</div>
					{token ? (
						<div className="flex">
							<div className="mr-2">
								<NavLink
									style={{ textDecoration: "none" }}
									className={"text-gray-600"}
									to={`${dash}`}
								>
									DASHBOARD
								</NavLink>
							</div>
							<div
								style={{ cursor: "pointer" }}
								onClick={handleClick}
								className="text-red-500"
							>
								LOG OUT
							</div>
						</div>
					) : (
						<div>
							<NavLink
								style={{ textDecoration: "none" }}
								className={"focus:text-orange-300 text-gray-600"}
								to="/login"
							>
								LOGIN
							</NavLink>
						</div>
					)}
				</div>
			</div>
			{/* <img className="w-5/6 z-1" src="homeImage.png" /> */}
		</div>
	);
}

export default Home;
