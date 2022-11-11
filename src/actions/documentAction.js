import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "documents";

export const getAllDocuments = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_DOCUMENTS,
				payload: { documentsG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-----------------------------GET USER Filtered documents-----------------------------------------------

export const getUserDocuments =
	(data, departmentFilter, doctypeFilter, searchQuery, dtf) =>
	(dispatch, getState) => {
		axios
			.post(
				apiEndPoint + "/filteredForUser",
				{
					departments: data,
					departmentFilter: departmentFilter,
					doctypeFilter: doctypeFilter?.name,
					searchQuery: searchQuery,
					doctypefieldReq: dtf,
				},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			)
			.then((response) =>
				dispatch({
					type: actions.GET_USER_DOCUMENTS,
					payload: { userDocumentsG: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};
//--------------------------------------------ADD Document---------------------------------------------------------------------
export const addDocument =
	(
		indexingInfo,
		pathToDispatch,
		depcodeToDispatch,
		name,
		doctypeObject,
		sensitive
	) =>
	(dispatch, getState) => {
		toast
			.promise(
				axios.post(
					apiEndPoint,
					{
						name: name,
						path: pathToDispatch,
						indexingInfo: indexingInfo,
						depcode: depcodeToDispatch,
						doctype: doctypeObject.name,
						department: doctypeObject.department,
						sensitive: sensitive,
					},
					{ headers: { "x-auth-token": getState().loginReducer.token } }
				),
				{
					success: `${name} Document added!`,
					error: `could not add ${name}`,
					pending: "adding...",
				}
			)
			.then((response) =>
				dispatch({
					type: actions.ADD_DOCUMENT,
					payload: { documentA: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};

//--------------------------------------------------DELETE DOCUMENT----------------------------------------------

export const deleteDocument = (data) => (dispatch, getState) => {
	// {
	// 		headers: { "x-auth-token": getState().loginReducer.token },
	// 	}
	toast
		.promise(axios.delete(apiEndPoint + "/" + data._id), {
			success: `Deleted ${data.name}`,
			pending: "deleting...",
			error: `could not delete ${data.name}`,
		})
		.then((response) => {
			{
				console.log("in response of del deoc action", response.data);
				dispatch({
					type: actions.DELETE_DOCUMENT,
					payload: { documentD: response.data },
				});
			}
		})
		.catch((err) => console.log(err.message));
};

//------------------------------------------------UPDATE DOCUMENT---------------------------------------------------

export const updateDocument = (data, id) => (dispatch) => {
	toast
		.promise(axios.patch(apiEndPoint + "/" + id, { indexingInfo: data }), {
			success: "Document Updated",
			pending: "updating document...",
			error: "could not update document",
		})
		.then((response) =>
			dispatch({
				type: actions.UPDATE_DOCUMENT,
				payload: { documentU: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//---------------------------------------------GET_PREVIEW of image in add doc form----------------------------------

export const getPreview = (data) => (dispatch) => {
	axios
		.post(apiEndPoint + "/preview", { imageName: data })
		.then((response) =>
			dispatch({ type: actions.GET_PREVIEW, payload: response.data })
		)
		.catch((err) => console.log(err.message));
};

//-----------------------------------------GET Documents Filtered By custom TAGS--------------------------------------

export const getDocumentsByTag = (filterTag) => (dispatch) => {
	axios
		.post(apiEndPoint + "/filteredByTags", { filterTag: filterTag })
		.then((response) =>
			dispatch({
				type: actions.GET_DOCUMENTS_BY_TAG,
				payload: { documentsFT: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
