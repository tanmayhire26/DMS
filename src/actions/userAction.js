import axios from "axios";
import * as actions from "./actionTypes";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

//---------------------------------------GET ALL USERS-------------------------------------------------------------------
export const getAllUsers = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_USERS,
				payload: { usersG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//----------------------------------------------------UPDATE USER-----------------------------------------------------------
export const updateUser = (data) => (dispatch, getState) => {
	console.log("in updateUser before put action", data);
	axios
		.put(apiEndPoint + "/" + data._id, {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			departments: data.departments,
			userName: data.userName,
			password: data.password,
			role: data.role,
			updatedBy: data.updatedBy,
		})
		.then((response) =>
			dispatch({ type: actions.UPDATE_USER, payload: { userU: response.data } })
		)
		.catch((err) => err.messsage);
};

//------------------------------------------------Soft Delete User-------------------------------------------------------------

export const deleteUser = (data) => (dispatch, getState) => {
	axios
		.patch(
			apiEndPoint + "/" + data._id,
			{},
			{ headers: { "x-auth-token": getState().loginReducer.token } }
		)
		.then((response) =>
			dispatch({ type: actions.DELETE_USER, payload: { userD: response.data } })
		)
		.catch((err) => console.log(err.message));
};
