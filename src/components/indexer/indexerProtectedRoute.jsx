import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
function IndexerProtectedRouter({ children }) {
	const token = useSelector((state) => state.loginReducer.token);
	// console.log("Protected Route", token);
	if (token) {
		const decoded = jwtDecode(token);
		if (decoded.role === "Indexer" && decoded.isActive === true)
			return children;
		else if (decoded.role === "Indexer" && decoded.isActive === false)
			return (
				<>
					<img alt="Inactive user" src="/inactiveUser.jpg" />
					<div>You are an inactive user. Contact Admin.</div>
				</>
			);
		else return <Navigate to={"/login"} />;
	}
	return <Navigate to={"/login"} />;
}

export default IndexerProtectedRouter;
