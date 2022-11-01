import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loadLogin, logout } from "../../actions/loginAction";
import jwt_decode from "jwt-decode";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function IndexerNavbar() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadLogin());
	}, []);
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	const token = useSelector((state) => state.loginReducer.token);
	const decoded = jwt_decode(token);
	const profileImageName = decoded.userName;
	const profileImageSrc = profileImageName + ".jpg";

	return (
		<>
			<div className="row mt-3 border-b">
				<div className="col-2 "></div>
				<div className="col">
					<Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity="warning"
							sx={{ width: "100%" }}
						>
							Logged Out !
						</Alert>
					</Snackbar>
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
							</ul>
							<div className=" flex text-xs absolute right-[5%]">
								<img
									alt="profile photo"
									className="h-[50px] w-[50px] rounded-full"
									src={`/profile-images/${profileImageSrc}`}
								/>
								<div className="flex-row ml-2">
									<div className="text-orange-600">{`Hi! ${profileImageName}`}</div>
									<div className="text-purple-400">{`${decoded.role}`}</div>
									<div
										onClick={() => {
											console.log("logging out ?");
											handleClick();
											return setTimeout(() => {
												dispatch(logout());
												navigate("/login");
											}, 1500);
										}}
										style={{ cursor: "pointer" }}
										className={
											" w-[50px] h-[15px] text-white nav-link focus:border-b-2 bg-red-500 w-full focus:border-orange-300"
										}
									>
										LOG OUT
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

export default IndexerNavbar;
