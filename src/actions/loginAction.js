import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "logins";

export const loginUser = (data) => (dispatch) => {
	axios
		.post(apiEndPoint, data)
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
