import axios from "axios";
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

export const addDocument =
	(indexingInfo, pathToDispatch, depcodeToDispatch, name, doctypeObject) =>
	(dispatch, getState) => {
		axios
			.post(
				apiEndPoint,
				{
					name: name,
					path: pathToDispatch,
					indexingInfo: indexingInfo,
					depcode: depcodeToDispatch,
					doctype: doctypeObject.name,
					department: doctypeObject.department,
				},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			)
			.then((response) =>
				dispatch({
					type: actions.ADD_DOCUMENT,
					payload: { documentA: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};
