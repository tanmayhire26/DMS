import { combineReducers } from "redux";
import { departmentReducer } from "./departmentReducer";
import { doctypeReducer } from "./doctypeReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { fieldReducer } from "./fieldReducer";
import { doctypefieldReducer } from "./doctypefieldReducer";
import { documentReducer } from "./documentReducer";
import { notifyReducer } from "./notifyReducer";
import { commentReducer } from "./customiseDocuments/commentReducer";
import { tagReducer } from "./customiseDocuments/tagReducer";
import { tagNameReducer } from "./customiseDocuments/tagNameReducer";
export default combineReducers({
	departmentReducer,
	doctypeReducer,
	registerReducer,
	loginReducer,
	userReducer,
	fieldReducer,
	doctypefieldReducer,
	documentReducer,
	notifyReducer,
	commentReducer,
	tagReducer,
	tagNameReducer,
});
