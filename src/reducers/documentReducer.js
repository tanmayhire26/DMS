import * as actions from "../actions/actionTypes";

export const documentReducer = (state = { documents: [] }, action) => {
	switch (action.type) {
		case actions.ADD_DOCUMENT:
			return {
				...state,
				documents: [...state.documents, action.payload.documentA],
			};
		default:
			return state;
	}
};
