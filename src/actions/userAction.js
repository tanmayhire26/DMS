import axios from "axios";
import { toast } from "react-toastify";
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

//-----------------------------------------------------GET FILTERED USERS----------------------------------------------------------
export const getFilteredUsers =
	(role, username, departmentsArr) => (dispatch) => {
		axios
			.post(apiEndPoint + "/filtered", {
				role: role,
				searchQuery: username,
				departmentsArr: departmentsArr,
			})
			.then((response) =>
				dispatch({
					type: actions.GET_FILTERED_USERS,
					payload: { usersF: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};

//----------------------------------------------------UPDATE USER-----------------------------------------------------------
export const updateUser = (data) => (dispatch, getState) => {
	console.log("in updateUser before put action", data);
	toast
		.promise(
			axios.put(apiEndPoint + "/" + data._id, {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phone: data.phone,
				departments: data.departments,
				userName: data.userName,
				password: data.password,
				role: data.role,
				updatedBy: data.updatedBy,
			}),
			{
				success: `${data.firstName} updated`,
				error: "could not updated user",
				pending: "updating user",
			}
		)
		.then((response) =>
			dispatch({ type: actions.UPDATE_USER, payload: { userU: response.data } })
		)
		.catch((err) => err.messsage);
};

//--------------------------------------------CHANGE CLEARANCE of USER-------------------------------------------------------

export const changeClearance = (u) => (dispatch, getState) => {
	toast
		.promise(
			axios.patch(
				apiEndPoint + "/clear/" + u._id,
				{},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			),
			{
				success: u.clearance
					? `Removed ${u.userName}'s clearance`
					: `Clearance granted to ${u.userName}`,
				error: "could not change clearance",
				pending: "changing clearance...",
			}
		)
		.then((response) =>
			dispatch({
				type: actions.CHANGE_CLEARANCE,
				payload: { userC: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-----------------------------------------------Change Password - patch on RESET Link mailed to user-----------------------------------

export const changePassword = (password, userId) => (dispatch) => {
	toast
		.promise(
			axios.patch(apiEndPoint + "/changePassword/" + userId, {
				newPassword: password,
				userId: userId,
			}),
			{
				success: `Password Changed.
				Log in with new password`,
				pending: "changing password...",
				error: "could not change password",
			}
		)
		.then((response) =>
			dispatch({
				type: actions.CHANGE_PASSWORD,
				payload: { userP: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-----------------------------------------------Verify otp sent and path verify-true----------------------------------
export const verifyEmail = (email) => (dispatch) => {
	toast
		.promise(
			axios.patch(apiEndPoint + "/verify/636cba1f5a9c8b1e5e538f09", {
				email: email,
			}),
			{
				success: "Email verified! Log in again",
				error: "could not verify emailId",
			}
		)
		.then((response) => console.log(response.data))
		.catch((err) => console.log(err.message));
};

//------------------------------------------------Soft Delete User-------------------------------------------------------------

export const deleteUser = (data) => (dispatch, getState) => {
	toast
		.promise(
			axios.patch(
				apiEndPoint + "/" + data._id,
				{},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			),
			{
				success: data.isActive
					? `${data.userName} is de-activated `
					: `${data.userName} is now active`,
				pending: data.isActive
					? `de-activating ${data.userName} `
					: `Activating ${data.userName}`,
				error: data.isActive
					? `could not de-activate ${data.userName} `
					: `could not activate ${data.userName}`,
			}
		)
		.then((response) =>
			dispatch({ type: actions.DELETE_USER, payload: { userD: response.data } })
		)
		.catch((err) => console.log(err.message));
};
