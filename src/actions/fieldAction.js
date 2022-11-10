import axios from "axios";
import { toast } from "react-toastify";
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
	toast
		.promise(
			axios.post(
				apiEndPoint,
				{ name: { name: data.name, label: data.label, input: data.input } },
				{
					headers: { "x-auth-token": getState().loginReducer.token },
				}
			),
			{
				success: `${data.name} added`,
				error: `could not add ${data.name}`,
				pending: `adding ${data.name}`,
			}
		)
		.then((response) =>
			dispatch({ type: actions.ADD_FIELD, payload: { fieldA: response.data } })
		)
		.catch((err) => console.log(err.message));
};

//--------------------------------------DELETE FIELD-----------------------------------------

export const deleteField = (data) => (dispatch, getState) => {
	toast
		.promise(
			axios.delete(apiEndPoint + "/" + data._id, {
				headers: { "x-auth-token": getState().loginReducer.token },
			}),
			{
				success: `${data.name.name} deleted`,
				error: `Could not delete ${data.name.name}`,
				pending: `deleting...`,
			}
		)
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
	toast
		.promise(
			axios.put(
				apiEndPoint + "/" + data._id,
				{
					name: { name: data.name, label: data.label, input: data.input },
				},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			),
			{
				success: `Updated ${data.name}`,
				pending: "updating",
				error: `Could not update ${data.name}`,
			}
		)
		.then((response) =>
			dispatch({
				type: actions.UPDATE_FIELD,
				payload: { fieldU: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
