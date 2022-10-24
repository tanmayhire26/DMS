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
