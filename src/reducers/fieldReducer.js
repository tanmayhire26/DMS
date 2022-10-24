import * as actions from "../actions/actionTypes";

export const fieldReducer = (state = { fields: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_FIELDS:
			return { ...state, fields: action.payload.fieldsG };
		case actions.ADD_FIELD:
			return { ...state, fields: [...state.fields, action.payload.fieldA] };

		case actions.DELETE_FIELD:
			const fieldsAftDel = [...state.fields].filter(
				(f) => f._id !== action.payload.fieldD._id
			);
			return { ...state, fields: fieldsAftDel };

		case actions.UPDATE_FIELD:
			const fieldsToU = [...state.fields];

			const indexFU = fieldsToU.findIndex(
				(f) => f._id === action.payload.fieldU._id
			);

			fieldsToU[indexFU] = action.payload.fieldU;
			return { ...state, fields: fieldsToU };
		default:
			return state;
	}
};
