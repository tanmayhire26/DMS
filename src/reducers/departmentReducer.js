import * as actions from "../actions/actionTypes";

export const departmentReducer = (state = { departments: [] }, action) => {
	switch (action.type) {
		case actions.GET_ALL_DEPARTMENTS:
			return { ...state, departments: action.payload.departments };
		case actions.ADD_DEPARTMENT:
			return {
				...state,
				departments: [...state.departments, action.payload.departmentA],
			};
		case actions.UPDATE_DEPARTMENT:
			const newDeps = [...state.departments];
			const depIndex = newDeps.findIndex(
				(d) => d._id === action.payload.departmentU._id
			);
			newDeps[depIndex] = action.payload.departmentU;
			return { ...state, departments: newDeps };

		case actions.DELETE_DEPARTMENT:
			const delDeps = [...state.departments].filter(
				(d) => d._id !== action.payload.departmentD._id
			);
			return { ...state, departments: delDeps };

		default:
			return state;
	}
};
