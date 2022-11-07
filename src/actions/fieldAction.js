import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "fields";

//-----------------------------------------GET ALL FIELDS-----------------------------------------------
export const getAllFields = () => (dispatch, getState) => {
	axios
		.get(apiEndPoint, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_FIELDS,
				payload: { fieldsG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//------------------------------------------------GET FILTERED FIELDS-------------------------------------

export const getFilteredFields = (name) => (dispatch) => {
	axios
		.post(apiEndPoint + "/filtered", { nameSearchQuery: name })
		.then((response) =>
			dispatch({
				type: actions.GET_FILTERED_FIELDS,
				payload: { fieldsF: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-----------------------------------------------ADD FIELD---------------------------------------------------

export const addField = (data) => (dispatch, getState) => {
	axios
		.post(
			apiEndPoint,
			{ name: { name: data.name, label: data.label, input: data.input } },
			{
				headers: { "x-auth-token": getState().loginReducer.token },
			}
		)
		.then((response) =>
			dispatch({ type: actions.ADD_FIELD, payload: { fieldA: response.data } })
		)
		.catch((err) => console.log(err.message));
};

//--------------------------------------DELETE FIELD-----------------------------------------

export const deleteField = (data) => (dispatch, getState) => {
	axios
		.delete(apiEndPoint + "/" + data._id, {
			headers: { "x-auth-token": getState().loginReducer.token },
		})
		.then((response) =>
			dispatch({
				type: actions.DELETE_FIELD,
				payload: { fieldD: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-------------------------------------------UPDATE FIELD------------------------------------------------

export const updateField = (data) => (dispatch, getState) => {
	axios
		.put(
			apiEndPoint + "/" + data._id,
			{
				name: { name: data.name, label: data.label, input: data.input },
			},
			{ headers: { "x-auth-token": getState().loginReducer.token } }
		)
		.then((response) =>
			dispatch({
				type: actions.UPDATE_FIELD,
				payload: { fieldU: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
