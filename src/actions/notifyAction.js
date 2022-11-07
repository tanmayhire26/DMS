import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "notify";

export const getAllNotifications = () => (dispatch) => {
	axios
		.get(apiEndPoint)
		.then((response) =>
			dispatch({
				type: actions.GET_NOTIFICATIONS,
				payload: { notificationsG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//----------------------------------------------SEND_NOTIFICATION------------------------------------------------------------

export const sendNotification = (d, userName) => (dispatch) => {
	axios
		.post(apiEndPoint, {
			userName: userName,
			documentNo: d.dcn,
			description: `${userName} is trying to view Document - ${d.name}, a ${d.doctype}`,
		})
		.then((response) =>
			dispatch({
				type: actions.SEND_NOTIFICATION,
				payload: { notificationsA: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-------------------------------------------------CLEAR_NOTIFICATION-----------------------------------------------------------

export const clearNotification = (n) => (dispatch) => {
	axios
		.patch(apiEndPoint + "/" + n._id, {})
		.then((response) =>
			dispatch({
				type: actions.CLEAR_NOTIFICATION,
				payload: { notificationC: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
