import axios from "axios";
import { toast } from "react-toastify";
import * as actions from "../../actions/actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "comments";

export const getCommentsByDoc = (documentId) => (dispatch) => {
	axios
		.get(apiEndPoint + "/" + documentId)
		.then((response) =>
			dispatch({
				type: actions.GET_COMMENT_BY_DOC,
				payload: { commentsDG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

export const addComment = (data) => (dispatch) => {
	toast
		.promise(
			axios.post(apiEndPoint, {
				comment: data.comment,
				userId: data.userId,
				userName: data.userName,
				documentId: data.documentId,
			}),
			{
				success: "Comment addded",
				pending: "adding...",
				error: "comment NOT added",
			}
		)
		.then((response) =>
			dispatch({
				type: actions.ADD_COMMENT,
				payload: { commentA: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
