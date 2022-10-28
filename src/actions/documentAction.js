import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "documents";

export const addDocument =
	(indexingInfo, pathToDispatch, depcodeToDispatch, name) =>
	(dispatch, getState) => {
		axios
			.post(
				apiEndPoint,
				{
					name: name,
					path: pathToDispatch,
					indexingInfo: indexingInfo,
					depcode: depcodeToDispatch,
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
