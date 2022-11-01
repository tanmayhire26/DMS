import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../actions/loginAction";
import jwt_decode from "jwt-decode";
import AlertBox from "./common/alertBox";
import { useState } from "react";

import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		handleClick();

		return setTimeout(() => {
			dispatch(logout());
			navigate("/login");
		}, 1500);
	};

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
							</ul>
						</div>
						<div className="mx-4 text-xs flex">
							<img
								className="h-[50px] w-[50px] rounded-full"
								src={`/profile-images/${profileImageSrc}`}
								alt="Profile Photo"
							/>
							<div className="flex-row ml-2">
								<div className=" text-orange-500">{`Hi ${decoded.firstName}`}</div>
								<div className=" text-purple-400">{decoded.role}</div>
								<div
									style={{ cursor: "pointer" }}
									onClick={handleLogout}
									className={
										"h-[15px] w-[50px] text-white focus:border-b-2 bg-red-500 w-full focus:border-orange-300"
									}
								>
									LOG OUT
								</div>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}

export default Navbar;
