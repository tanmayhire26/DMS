import * as actions from "../actions/actionTypes";

export const notifyReducer = (state = { notifications: [] }, action) => {
	switch (action.type) {
		case actions.GET_NOTIFICATIONS:
			return { ...state, notifications: action.payload.notificationsG };

		case actions.SEND_NOTIFICATION:
			return {
				...state,
				notifications: [...state.notifications, action.payload.notificationsA],
			};

		case actions.CLEAR_NOTIFICATION:
			let newArr = state.notifications;
			const indexClear = newArr.filter(
				(n) => n._id !== action.payload.notificationC._id
			);
			newArr[indexClear] = action.payload.notificationC;
			return { ...state, notifications: newArr };
		default:
			return state;
	}
};
