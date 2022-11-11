import * as actions from "../../actions/actionTypes";

export const tagReducer = (state = { tags: [] }, action) => {
	switch (action.type) {
		case actions.GET_TAGS_BY_DOC:
			return { ...state, tags: action.payload.tagsDG };

		case actions.ADD_TAG:
			return { ...state, tags: [...state.tags, action.payload.tagA] };

		case actions.GET_ALL_TAGS:
			return { ...state, tags: action.payload.tagsG };

		case actions.DELETE_TAG:
			let newArr = state.tags.filter((t) => t._id !== action.payload.tagD._id);
			return { ...state, tags: newArr };
		default:
			return state;
	}
};
