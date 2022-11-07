import * as actions from "../actions/actionTypes";

export const doctypefieldReducer = (state = { doctypefields: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_DOCTYPEFIELDS:
			return { ...state, doctypefields: action.payload.doctypefieldsG };

		case actions.GET_FILTERED_DOCTYPEFIELDS:
			return { ...state, doctypefields: action.payload.doctypefieldsF };

		case actions.ADD_DOCTYPEFIELD:
			return {
				...state,
				doctypefields: [...state.doctypefields, action.payload.doctypefieldA],
			};

		case actions.UPDATE_DOCTYPEFIELD:
			const newDTF = [...state.doctypefields];
			const indexToU = newDTF.findIndex(
				(d) => d._id === action.payload.doctypefieldU._id
			);

			newDTF[indexToU] = action.payload.doctypefieldU;
			return { ...state, doctypefields: newDTF };

		case actions.DELETE_DOCTYPEFIELD:
			const doctypefieldsAftDel = [...state.doctypefields].filter(
				(f) => f._id !== action.payload.doctypefieldD._id
			);
			return { ...state, doctypefields: doctypefieldsAftDel };
		default:
			return state;
	}
};
