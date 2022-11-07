import * as actions from "../actions/actionTypes";

export const documentReducer = (
	state = { documents: [], path: "" },
	action
) => {
	switch (action.type) {
		case actions.GET_ALL_DOCUMENTS:
			return { ...state, documents: action.payload.documentsG };

		case actions.GET_USER_DOCUMENTS:
			return { ...state, documents: action.payload.userDocumentsG };
		case actions.GET_PREVIEW:
			return { ...state, path: action.payload.path };
		case actions.ADD_DOCUMENT:
			return {
				...state,
				documents: [...state.documents, action.payload.documentA],
			};
		case actions.DELETE_DOCUMENT:
			console.log("delete department reducer : ", action.payload.documentD);
			const documentsAftDel = state.documents.filter(
				(d) => d._id !== action.payload.documentD._id
			);
			return { ...state, documents: documentsAftDel };
		default:
			return state;
	}
};
