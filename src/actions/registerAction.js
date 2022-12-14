import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";
export const registerUser = (data) => (dispatch) => {
	toast
		.promise(axios.post(apiEndPoint, data), {
			success: `${data.firstName} registered`,
			error: "could not register",
			pending: `Registering ${data.firstName}`,
		})
		.then((response) =>
			dispatch({
				type: actions.REGISTER_USER,
				payload: { userA: response.data },
			})
		)
		.catch((err) => err.message);
};

//----------------------------------------------SEND_RESET_PASSWORD_LINK_TO _MAIL---------------------------------------------------
export const sendResetLink = (data) => (dispatch) => {
	toast
		.promise(axios.post(apiEndPoint + "/forgot", { email: data }), {
			sucess: "Reset Password Link mailed",
			pending: "sending...",
			error: "could not mail reset password link",
		})
		.then((response) =>
			dispatch({
				type: actions.SEND_RESET_MAIL,
				payload: { email: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//----------------------------------Send email Verification Link-------------------------------------------

export const sendVerifyLink = (email, otpG) => (dispatch) => {
	toast
		.promise(
			axios.post(apiEndPoint + "/sendOtp", { email: email, otpG: otpG }),
			{
				success: "OTP sent",
				pending: "sending...",
				error: "could not send otp",
			}
		)
		.then((response) =>
			dispatch({
				type: actions.SEND_VERIFICATION_LINK,
				payload: { otp: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
