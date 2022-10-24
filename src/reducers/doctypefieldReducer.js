import * as actions from "../actions/actionTypes";

export const doctypefieldReducer = (state = { doctypefields: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_DOCTYPEFIELDS:
			return { ...state, doctypefields: action.payload.doctypefieldsG };
		default:
			return state;
	}
};
