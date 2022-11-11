import * as actions from "../../actions/actionTypes";

export const tagNameReducer = (state = { tagNames: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_TAG_NAMES:
			return { ...state, tagNames: action.payload.tagNamesG };
		case actions.ADD_TAG_NAME:
			return {
				...state,
				tagNames: [...state.tagNames, action.payload.tagNameA],
			};
		default:
			return state;
	}
};
