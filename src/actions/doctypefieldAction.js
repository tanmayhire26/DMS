import axios from "axios";
import { toast } from "react-toastify";
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

//-------------------------------------------------------Get Filtered Doctypefields------------------------------------------------

export const getFilteredDoctypefields =
	(department, doctype, field) => (dispatch) => {
		console.log(department, doctype, field);
		axios
			.post(apiEndPoint + "/filtered", {
				departmentFilter: department,
				doctypeFilter: doctype,
				fieldFilter: field,
			})
			.then((response) =>
				dispatch({
					type: actions.GET_FILTERED_DOCTYPEFIELDS,
					payload: { doctypefieldsF: response.data },
				})
			)
			.catch((err) => console.log(err.message));
	};

//------------------------------------------------------------Add Doctypefield-------------------------------------------------------

export const addDoctypefield = (data) => (dispatch, getState) => {
	toast
		.promise(
			axios.post(
				apiEndPoint,
				{
					docType: data.docType,
					field: data.field,
					isRequired: data.isRequired,
				},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			),
			{
				success: "doctype field added",
				error: "could not add the doctypefield",
				pending: "adding doctypefield",
			}
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
	toast
		.promise(
			axios.put(
				apiEndPoint + "/" + data._id,
				{
					docType: data.docType,
					field: data.field,
					isRequired: data.isRequired,
					_id: data.isRequired,
				},
				{ headers: { "x-auth-token": getState().loginReducer.token } }
			),
			{ success: "updated", pending: "updating", error: "could not update" }
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
	toast
		.promise(
			axios.delete(apiEndPoint + "/" + data._id, {
				headers: { "x-auth-token": getState().loginReducer.token },
			}),
			{ success: "Deleted", pending: "deleting...", error: "Could not delete " }
		)
		.then((response) =>
			dispatch({
				type: actions.DELETE_DOCTYPEFIELD,
				payload: { doctypefieldD: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
