import * as actions from "../actions/actionTypes";

export const loginReducer = (state = { token: "" }, action) => {
	switch (action.type) {
		case actions.LOGIN_USER:
			console.log("token: ", action.payload.token);
			console.log("logged in successfully");
			return { ...state, token: action.payload.token };
		case actions.LOGOUT_USER:
			console.log("token: ", action.payload.token);
			console.log("logged OUT successfully");
			return { ...state, token: action.payload.token };
		default:
			return state;
	}
};
