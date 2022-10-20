import { ModalActions } from "semantic-ui-react";
import * as actions from "../actions/actionTypes";
export const doctypeReducer = (state = { doctypes: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_DOCTYPES:
			return { ...state, doctypes: action.payload.doctypes };
		case actions.ADD_DOCTYPE:
			return {
				...state,
				doctypes: [...state.doctypes, action.payload.doctypeA],
			};
		case actions.DELETE_DOCTYPE:
			return {
				...state,
				doctypes: state.doctypes.filter(
					(d) => d._id !== action.payload.doctypeD._id
				),
			};

		case actions.UPDATE_DOCTYPE:
			const newDtype = [...state.doctypes];
			const dtypeIndex = newDtype.findIndex(
				(d) => d._id === action.payload.doctypeU._id
			);
			newDtype[dtypeIndex] = action.payload.doctypeU;
			return { ...state, doctypes: newDtype };
		default:
			return state;
	}
};
