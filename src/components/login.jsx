import { NavLink } from "react-router-dom";
import LoginForm from "./forms/loginForm";


import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";

const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Login() {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<>
			{" "}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
					Logged in successfully !
				</Alert>
			</Snackbar>
			
			<div
				className="flex justify-center   h-full bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-yellow-100 via-yellow-200 to-yellow-300"
			>
				<div
					className="h-screen w-screen bg-center bg-no-repeat"
					style={{ backgroundImage: "url(/loginBg.png)" }}
				>
					<div className=" italic font-bold text-xs flex absolute right-[22%] top-[12%] gap-3">
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

					<div className="flex-row absolute right-[22%] bottom-[13%] shadow rounded h-[68%] w-[24%] bg-white">
						<img className="w-full h-3/6" src="loginImage.png" />
						<div className="flex mx-5 mt-4">
							<LoginForm handleClick={handleClick} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
