import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "logins";

export const loginUser = (data) => (dispatch) => {
	toast
		.promise(axios.post(apiEndPoint, data), {
			pending: "Logging in...",
			error: "Username or Password is Invalid",
			success: "Logged in successfully",
		})
		.then((response) => {
			sessionStorage.setItem("token", response.data);
			dispatch({ type: actions.LOGIN_USER, payload: { token: response.data } });
		})
		.catch((err) => console.log(err.message));
};
export const loadLogin = () => ({
	type: actions.LOGIN_USER,
	payload: { token: sessionStorage.getItem("token") },
});

export const logout = () => ({
	type: actions.LOGOUT_USER,
	payload: { token: sessionStorage.setItem("token", "") },
});

