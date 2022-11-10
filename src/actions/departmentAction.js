import axios from "axios";
import { toast } from "react-toastify";
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

//--------------------------------------------------GET FILTERED DEPARTMENTS----------------------------------------------------------

export const getFilteredDepartments = (departmentFilter) => (dispatch) => {
	axios
		.post(apiEndPoint + "/filtered", { searchQuery: departmentFilter })
		.then((response) =>
			dispatch({
				type: actions.GET_FILTERED_DEPARTMENTS,
				payload: { departmentsF: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
//-------------------------------------------------addDepartment-------------------------------------------------------------------------------------

export const addDepartment = (data) => (dispatch) => {
	toast
		.promise(axios.post(apiEndPoint, data), {
			error: "Could not add department",
			pending: "adding Department ...",
			success: `${data.name} department added`,
		})
		.then((response) =>
			dispatch({
				type: actions.ADD_DEPARTMENT,
				payload: { departmentA: response.data },
			})
		)
		.catch((err) => err.message);
};

//---------------------------------updateDepartment-----------------------------------------------

export const updateDepartment = (data) => (dispatch) => {
	toast
		.promise(
			axios.put(apiEndPoint + "/" + data._id, {
				name: data.name,
				departmentCode: data.departmentCode,
			}),
			{
				success: `${data.name} department updated`,
				error: "could not update the department",
				pending: "updating the department",
			}
		)
		.then((response) => {
			console.log("in resposne of update, resposne.data", response.data);
			dispatch({
				type: actions.UPDATE_DEPARTMENT,
				payload: { departmentU: response.data },
			});
		})
		.catch((err) => err.message);
};

//--------------------------------------------deleteDepartment-------------------------------------------

export const deleteDepartment = (del) => (dispatch) => {
	toast
		.promise(axios.delete(apiEndPoint + "/" + del._id), {
			success: `Deleted ${del.name} department`,
			error: "could not deletet he department",
			pending: "deleting...",
		})
		.then((response) =>
			dispatch({
				type: actions.DELETE_DEPARTMENT,
				payload: { departmentD: response.data },
			})
		)
		.catch((err) => err.message);
};
