import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_USERS:
			return { ...state, users: action.payload.usersG };
		case actions.DELETE_USER:
			const userArr = [...state.users];
			const indexDel = userArr.findIndex(
				(u) => u._id === action.payload.userD._id
			);
			userArr[indexDel] = action.payload.userD;
			return { ...state, users: userArr };

		default:
			return state;
	}
};
