import * as actions from "../actions/actionTypes";

export const documentReducer = (state = { documents: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_DOCUMENTS:
			return { ...state, documents: action.payload.documentsG };

		case actions.ADD_DOCUMENT:
			return {
				...state,
				documents: [...state.documents, action.payload.documentA],
			};
		default:
			return state;
	}
};
