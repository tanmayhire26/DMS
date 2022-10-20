import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";
export const registerUser = (data) => (dispatch) => {
	axios
		.post(apiEndPoint, data)
		.then((response) =>
			dispatch({
				type: actions.REGISTER_USER,
				payload: { userA: response.data },
			})
		)
		.catch((err) => err.message);
};
