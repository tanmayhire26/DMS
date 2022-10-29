import { combineReducers } from "redux";
import { departmentReducer } from "./departmentReducer";
import { doctypeReducer } from "./doctypeReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { fieldReducer } from "./fieldReducer";
import { doctypefieldReducer } from "./doctypefieldReducer";
import { documentReducer } from "./documentReducer";

export default combineReducers({
	departmentReducer,
	doctypeReducer,
	registerReducer,
	loginReducer,
	userReducer,
	fieldReducer,
	doctypefieldReducer,
	documentReducer,
});
