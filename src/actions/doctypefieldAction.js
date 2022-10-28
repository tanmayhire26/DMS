import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "docTypesFields";

export const getAllDoctypefields = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: {
				type: actions.GET_ALL_DOCTYPEFIELDS,
				payload: getState().loginReducer.token,
			},
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_DOCTYPEFIELDS,
				payload: { doctypefieldsG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//------------------------------------------------------------Add Doctypefield-------------------------------------------------------

export const addDoctypefield = (data) => (dispatch, getState) => {
	axios
		.post(
			apiEndPoint,
			{
				docType: data.docType,
				field: data.field,
				isRequired: data.isRequired,
			},
			{ headers: { "x-auth-token": getState().loginReducer.token } }
		)
		.then((response) =>
			dispatch({
				type: actions.ADD_DOCTYPEFIELD,
				payload: { doctypefieldA: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//........................................................update doctypefield--------------------------------------------------
export const updateDoctypefield = (data) => (dispatch, getState) => {
	axios
		.put(
			apiEndPoint + "/" + data._id,
			{
				docType: data.docType,
				field: data.field,
				isRequired: data.isRequired,
				_id: data.isRequired,
			},
			{ headers: { "x-auth-token": getState().loginReducer.token } }
		)
		.then((response) =>
			dispatch({
				type: actions.UPDATE_DOCTYPEFIELD,
				payload: { doctypefieldU: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//---------------------------------------------------------------Delete DoctypeField-----------------------------------------------------

export const deleteDoctypefield = (data) => (dispatch, getState) => {
	axios
		.delete(apiEndPoint + "/" + data._id, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.DELETE_DOCTYPEFIELD,
				payload: { doctypefieldD: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
