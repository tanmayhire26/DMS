import * as actions from "../../actions/actionTypes";

export const commentReducer = (state = { comments: [] }, action) => {
	switch (action.type) {
		case actions.GET_COMMENT_BY_DOC:
			return { ...state, comments: action.payload.commentsDG };
		case actions.ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, action.payload.commentA],
			};
		default:
			return state;
	}
};
