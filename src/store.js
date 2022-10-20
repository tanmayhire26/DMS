import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({ trace: true });
export default createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);
