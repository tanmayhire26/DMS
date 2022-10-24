import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "departments";
export const getAllDepartments = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_DEPARTMENTS,
				payload: { departments: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

export const addDepartment = (data) => (dispatch) => {
	axios
		.post(apiEndPoint, data)
		.then((response) =>
			dispatch({
				type: actions.ADD_DEPARTMENT,
				payload: { departmentA: response.data },
			})
		)
		.catch((err) => err.message);
};

export const updateDepartment = (data) => (dispatch) => {
	axios
		.put(apiEndPoint + "/" + data._id, {
			name: data.name,
			departmentCode: data.departmentCode,
		})
		.then((response) => {
			console.log("in resposne of update, resposne.data", response.data);
			dispatch({
				type: actions.UPDATE_DEPARTMENT,
				payload: { departmentU: response.data },
			});
		})
		.catch((err) => err.message);
};

export const deleteDepartment = (del) => (dispatch) => {
	axios
		.delete(apiEndPoint + "/" + del._id)
		.then((response) =>
			dispatch({
				type: actions.DELETE_DEPARTMENT,
				payload: { departmentD: response.data },
			})
		)
		.catch((err) => err.message);
};
