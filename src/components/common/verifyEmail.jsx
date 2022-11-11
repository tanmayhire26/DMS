import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { sendVerifyLink } from "../../actions/registerAction";
import { verifyEmail } from "../../actions/userAction";

function VerifyEmail(props) {
	const { email } = props;
	const [view, setView] = useState(false);
	const [flagError, setFlagError] = useState(false);
	const [verified, setVerified] = useState(false);
	console.log(view);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	//Generate Otp---------------------

	let otpG = Math.floor(1000 + Math.random() * 9000);
	let otp = useSelector((state) => state.registerReducer.otp);

	const { register, handleSubmit } = useForm();

	const onSubmitHandler = (data) => {
		console.log(data.otpE, otp.otp);
		if (data.otpE === otp.otp) {
			dispatch(verifyEmail(email));
			setVerified(true);
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		} else {
			setFlagError(true);
		}
	};

	//--------------------------------------------------------------------------------------------------------------------------
	return (
		<>
			<ToastContainer />
			<div className="flex w-full justify-center">
				<div className="mt-4">
					<h2>email verification of {email}</h2>
					{view === false ? (
						<button
							onClick={() => {
								console.log(otpG);
								dispatch(sendVerifyLink(email, otpG));
								setView(true);
								setTimeout(() => {
									setView(false);
								}, 30000);
							}}
							className="rounded-full bg-orange-400 text-white font-bold w-3/6"
						>
							Send otp
						</button>
					) : (
						<Alert className="w-2/6" severity="info">
							OTP sent
						</Alert>
					)}
				</div>
			</div>
			{view ? (
				<div className="flex justify-center items-center  h-screen ">
					<Form
						onSubmit={handleSubmit(onSubmitHandler)}
						className="w-2/6 flex-row justify-center shadow p-2 rounded"
					>
						<label htmlFor="otp" className="form-label">
							Enter OTP
						</label>
						<input
							type="text"
							id="otp"
							className="form-control"
							{...register("otpE")}
						/>
						<button
							type="submit"
							className="rounded-full bg-orange-400 text-white w-full mt-2"
						>
							Verify
						</button>
					</Form>
					{flagError ? (
						<Alert severity="error">Otp entered is incorrect !</Alert>
					) : null}
					{verified ? (
						<Alert severity="success">email verification successful</Alert>
					) : null}
				</div>
			) : null}
		</>
	);
}

export default VerifyEmail;
