import axios from "axios";
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

export const getFilteredDoctypes = (nameSearch) => (dispatch) => {
	axios
		.post(apiEndPoint + "/filtered", { nameSearchQuery: nameSearch })
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
	axios
		.post(apiEndPoint, data)
		.then((response) =>
			dispatch({
				type: actions.ADD_DOCTYPE,
				payload: { doctypeA: response.data },
			})
		)
		.catch((err) => err.message);
};
export const deleteDoctype = (del) => (dispatch) => {
	axios
		.delete(apiEndPoint + "/" + del._id)
		.then((response) =>
			dispatch({
				type: actions.DELETE_DOCTYPE,
				payload: { doctypeD: response.data },
			})
		)
		.catch((err) => err.message);
};
export const updateDoctype = (data) => (dispatch) => {
	axios
		.put(apiEndPoint + "/" + data._id, {
			name: data.name,
			department: data.department,
			docTypeCode: data.docTypeCode,
		})
		.then((response) =>
			dispatch({
				type: actions.UPDATE_DOCTYPE,
				payload: { doctypeU: response.data },
			})
		)
		.catch((err) => err.message);
};
