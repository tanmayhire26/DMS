import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Form } from "react-router-dom";
import { sendResetLink } from "../actions/registerAction";

function ForgotPassword() {
	const { handleSubmit, register } = useForm();
	const [view, setView] = useState(true);
	const dispatch = useDispatch();
	const onSubmitHandler = (data) => {
		setView(false);
		dispatch(sendResetLink(data.email));
	};
	return (
		<>
			<div
				className="h-screen flex justify-center items-center bg-cover bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
				from-white via-purple-200 to-red-300"
			>
				
					{view ? (
						<Form
							onSubmit={handleSubmit(onSubmitHandler)}
							className="form w-1/6 p-2 shadow backdrop-blur"
						>
							<label htmlFor="mail" className="form-label">
								Enter your email id
							</label>
							<input
								id="mail"
								className="form-control"
								type="email"
								required
								{...register("email")}
							/>
							<button
								type="submit"
								className="mt-2 w-full rounded-full bg-orange-400 text-white font-bold"
							>
								Reset Password
							</button>
						</Form>
					) : (
						<Alert severity="info">
							a link has been sent to your email id to reset password
						</Alert>
					)}
		
			</div>
			{/* ------------------------------------------------------------------------------------------------------------------- */}
		</>
	);
}

export default ForgotPassword;
