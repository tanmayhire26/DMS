import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "docTypes";
export const getAllDoctypes = () => (dispatch) => {
	axios
		.get(apiEndPoint)
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_DOCTYPES,
				payload: { doctypes: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//----------------------------------------------------GET FILTERED DOCTYPES------------------------------------------------------

export const getFilteredDoctypes =
	(nameSearch, departmentFilter) => (dispatch) => {
		axios
			.post(apiEndPoint + "/filtered", {
				nameSearchQuery: nameSearch,
				departmentFilter: departmentFilter,
			})
			.then((response) =>
				dispatch({
					type: actions.GET_FILTERED_DOCTYPES,
					payload: { doctypesF: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};

//----------------------------------------------ADD DOC TYPE------------------------------------------------------------------------
export const addDoctype = (data) => (dispatch) => {
	toast
		.promise(axios.post(apiEndPoint, data), {
			success: `${data.name} added`,
			error: "could not add",
			pending: `adding ${data.name} `,
		})
		.then((response) =>
			dispatch({
				type: actions.ADD_DOCTYPE,
				payload: { doctypeA: response.data },
			})
		)
		.catch((err) => err.message);
};

//-----------------------------------------------deleteDoctype------------------------------------------------------------------
export const deleteDoctype = (del) => (dispatch) => {
	toast
		.promise(axios.delete(apiEndPoint + "/" + del._id), {
			success: `Deleted ${del.name}`,
			pending: `Deleting ${del.name}`,
			error: `could not delete ${del.name}`,
		})
		.then((response) =>
			dispatch({
				type: actions.DELETE_DOCTYPE,
				payload: { doctypeD: response.data },
			})
		)
		.catch((err) => err.message);
};

//------------------------------------------------updateDoctype-----------------------------------------------------------------
export const updateDoctype = (data) => (dispatch) => {
	toast
		.promise(
			axios.put(apiEndPoint + "/" + data._id, {
				name: data.name,
				department: data.department,
				docTypeCode: data.docTypeCode,
			}),
			{
				success: `Updated ${data.name}`,
				error: `Could not update ${data.name}`,
				pending: "pending...",
			}
		)
		.then((response) =>
			dispatch({
				type: actions.UPDATE_DOCTYPE,
				payload: { doctypeU: response.data },
			})
		)
		.catch((err) => err.message);
};
