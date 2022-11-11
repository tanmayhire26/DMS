import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "../../actions/actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "tags";

//----------------------------GET_ALL_TAGS-------------------------------------------------
export const getAllTags = () => (dispatch) => {
	axios
		.get(apiEndPoint)
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_TAGS,
				payload: { tagsG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-------------------------GET_TAG_BY_DOCUMENT---------------------------------------------------

export const getTagsByDoc = (documentId) => (dispatch) => {
	axios
		.get(apiEndPoint + "/" + documentId)
		.then((response) =>
			dispatch({
				type: actions.GET_TAGS_BY_DOC,
				payload: { tagsDG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//------------------------ADD TAG----------------------------------------
export const addTag = (data) => (dispatch) => {
	toast
		.promise(
			axios.post(apiEndPoint, {
				tag: data.tag,
				createdBy: data.userId,
				documentId: data.documentId,
			}),
			{
				success: `tagged ${data.tag} !`,
				pending: "adding...",
				error: "could not add",
			}
		)
		.then((response) =>
			dispatch({ type: actions.ADD_TAG, payload: { tagA: response.data } })
		)
		.catch((err) => console.log(err.message));
};

//--------------------------DELETE TAG------------------------------------

export const deleteTag = (tagId) => (dispatch) => {
	toast
		.promise(axios.delete(apiEndPoint + "/" + tagId), {
			success: "tag Removed",
			pending: "removing...",
			error: "could not remove tag",
		})
		.then((response) =>
			dispatch({ type: actions.DELETE_TAG, payload: { tagD: response.data } })
		)
		.catch((err) => console.log(err.message));
};
