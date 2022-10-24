import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_USERS:
			return { ...state, users: action.payload.usersG };

		default:
			return state;
	}
};
