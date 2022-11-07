import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../actions/loginAction";
import jwt_decode from "jwt-decode";
import AlertBox from "./common/alertBox";
import { useState } from "react";

import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import {
	clearNotification,
	getAllNotifications,
} from "../actions/notifyAction";
import { changeClearance, getAllUsers } from "../actions/userAction";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//----------State variable to open and close notification panel-----------

	const [notify, setNotify] = useState("false");
	const notifications = useSelector(
		(state) => state.notifyReducer.notifications
	);
	const users = useSelector((state) => state.userReducer.users);
	useEffect(() => {
		dispatch(getAllNotifications());
		dispatch(getAllUsers());
	}, []);
	useEffect(() => {
		dispatch(getAllNotifications());
	}, [notifications]);

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

	//------------------Handle notififcation click ---------------------------

	const handleNotify = () => {
		notify === false ? setNotify(true) : setNotify(false);
	};
	//---------------------------Handle if notification request is accepted aby admin----------------------------------------------
	const handleAccept = (e, n) => {
		const user = users.find((u) => u.userName === n.userName);
		dispatch(changeClearance(user));
		dispatch(clearNotification(n));
	};

	//----------------------Handle notification request rejected----------------------------

	const handleReject = (n) => {
		dispatch(clearNotification(n));
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
					<div className="">
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
								{notify === true ? (
									<div className="z-10 flex-row absolute right-[10%] top-[80px]">
										{notifications.map((n) =>
											n.isActive === true ? (
												<div
													key={n._id}
													className="p-3 backdrop-blur-xl shadow my-2 border-l-4 border-purple-400"
												>
													{/* <div>{n.userName}</div>
												<div>{n.documentNo}</div> */}
													<div>{n.description}</div>
													<div className="mt-2">
														<button
															onClick={(e) => handleAccept(e, n)}
															className="p-1 mr-3 rounded-full outline outline-2 outline-green-300"
														>
															Accept
														</button>
														<button
															onClick={() => handleReject(n)}
															className="p-1 mr-3 rounded-full outline outline-2 outline-red-300"
														>
															Reject
														</button>
													</div>
												</div>
											) : null
										)}
									</div>
								) : null}
								<div onClick={handleNotify}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="orange"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-8 h-8 mr-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
										/>
									</svg>
								</div>

								<img
									className="h-[50px] w-[50px] rounded-full"
									src={`/profile-images/${profileImageSrc}`}
									alt="Profile Photo"
								/>
								<div className="flex-row ml-2">
									<div className=" text-orange-500 font-bold">{`Hi ${decoded.firstName}`}</div>
									<div className=" text-purple-400">{decoded.role}</div>
									<div
										style={{ cursor: "pointer" }}
										onClick={handleLogout}
										className={
											"h-[10px] w-[60px] text-red-500 font-bold focus:border-b-2  w-full"
										}
									>
										LOG OUT
									</div>
								</div>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}

export default Navbar;
