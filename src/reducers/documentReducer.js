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
			const documentsAftDel = state.documents.filter(
				(d) => d._id !== action.payload.documentD._id
			);
			return { ...state, documents: documentsAftDel };

		case actions.UPDATE_DOCUMENT:
			let newArr = state.documents;
			let index = newArr.findIndex(
				(d) => d._id === action.payload.documentU._id
			);
			newArr[index] = action.payload.documentU;
			return { ...state, documents: newArr };

		case actions.GET_DOCUMENTS_BY_TAG:
			return { ...state, documents: action.payload.documentsFT };

		case actions.PATCH_DOCUMENT_IMAGE:
			let pDArr = state.documents;
			const indexP = pDArr.findIndex(
				(d) => d._id === action.payload.documentImageP._id
			);
			pDArr[indexP] = action.payload.documentImageP;
			return { ...state, documents: pDArr };

		case actions.EDIT_DOCUMENT_IMAGE:
			let eDIArr = state.documents;
			const indexEI = eDIArr.findIndex(
				(d) => d._id === action.payload.documentEIC._id
			);
			eDIArr[indexEI] = action.payload.documentEIC;
			return { ...state, documents: eDIArr };
		default:
			return state;
	}
};
