import { ActionTypes } from "@mui/base";
import * as actions from "../actions/actionTypes";
export const registerReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actions.REGISTER_USER:
			return { ...state, users: [...state.users, action.payload.userA] };
		default:
			return state;
	}
};
