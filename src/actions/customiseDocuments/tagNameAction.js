import axios from "axios";
import * as actions from "../actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "tagNames";

//-----------------------------GET ALL Tag Names--------------------------------------
export const getAllTagNames = () => (dispatch) => {
	axios
		.get(apiEndPoint)
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_TAG_NAMES,
				payload: { tagNamesG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
//--------------------------Add Tag Name------------------------------------

export const addTagName = (data) => (dispatch) => {
	axios
		.post(apiEndPoint, { name: data.tag, createdBy: data.userId })
		.then((response) => {
			console.log("return ala");
			dispatch({
				type: actions.ADD_TAG_NAME,
				payload: { tagNameA: response.data },
			});
		})
		.catch((err) => console.log(err.message));
};
