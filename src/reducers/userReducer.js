import * as actions from "../actions/actionTypes";

export const userReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_USERS:
			return { ...state, users: action.payload.usersG };

		case actions.UPDATE_USER:
			let newUsersArr = state.users;
			const indexUserU = newUsersArr.findIndex(
				(u) => u._id === action.payload.userU._id
			);
			newUsersArr[indexUserU] = action.payload.userU;
			return { ...state, users: newUsersArr };
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
