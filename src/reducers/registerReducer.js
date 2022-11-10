import { ActionTypes } from "@mui/base";
import * as actions from "../actions/actionTypes";
export const registerReducer = (state = { users: [], otp: {} }, action) => {
	switch (action.type) {
		case actions.REGISTER_USER:
			return { ...state, users: [...state.users, action.payload.userA] };
		case actions.SEND_VERIFICATION_LINK:
			return { ...state, otp: action.payload.otp };
		default:
			return state;
	}
};
