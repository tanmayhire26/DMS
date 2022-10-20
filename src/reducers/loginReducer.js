import * as actions from "../actions/actionTypes";

export const loginReducer = (state = { token: "" }, action) => {
	console.log("in  login reducer but outside switch",state.token);
	switch (action.type) {
		case actions.LOGIN_USER:
			console.log(action.payload.token);
			console.log("logged in successfully");
			return { ...state, token: action.payload.token };
		default:
			return state;
	}
};
