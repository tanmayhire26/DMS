import axios from "axios";
import * as actions from "./actionTypes";
const apiEndPoint = process.env.REACT_APP_API_URL + "indexer";

//---------Get All Indexers------------
export const getAllIndexers = () => (dispatch) => {
	axios
		.get(apiEndPoint)
		.then((response) =>
			dispatch({
				type: actions.GET_ALL_INDEXERS,
				payload: { indexersG: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//-----------Add indexer-----------------

export const addIndexer = (data) => (dispatch) => {
	axios
		.post(apiEndPoint, data, {
			headers: { "Content-Type": "multipart/form-data" },
		})
		.then((response) =>
			dispatch({
				type: actions.ADD_INDEXER,
				payload: { indexerA: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};

//------------Patch buffer data to document.documentimage.data------------------
export const patchDocumentImage = (id, documentImage) => (dispatch) => {
	axios
		.patch(
			apiEndPoint + "/" + id,
			{ documentImage: documentImage },
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		)
		.then((response) =>
			dispatch({
				type: actions.PATCH_DOCUMENT_IMAGE,
				payload: { documentImageP: response.data },
			})
		)
		.catch((err) => console.log(err.message));
};
