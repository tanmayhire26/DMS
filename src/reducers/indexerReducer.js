import * as actions from "../actions/actionTypes";

export const indexerReducer = (state = { indexers: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_INDEXERS:
			return { ...state, indexers: action.payload.indexersG };
		case actions.ADD_INDEXER:
			return {
				...state,
				indexers: [...state.indexers, action.payload.indexerA],
			};
		default:
			return state;
	}
};
